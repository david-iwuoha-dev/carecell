const express = require("express");
const Patient = require("../../models/Patient");
const Donor = require("../../models/Donor");
const { patients, donors } = require("./store");
const clinicianAuth = require("../middlewares/auth");



const router = express.Router();


 
/**
 * Enroll patient into NSCDIR
 * Clinician-verified only
 */
router.post("/enroll", clinicianAuth, (req, res) => {
const {
    patient,
    baselineCBC,
    familyDonors,
  } = req.body;

const clinicianId = req.clinicianId;

  // Basic validation
  if (!patient || !baselineCBC || !clinicianId) {
    return res.status(400).json({
      error: "Missing required enrollment data"
    });
  }

  if (!patient.genotype) {
    return res.status(400).json({
      error: "Patient genotype must be lab verified"
    });
  }

  // Create patient record
  const newPatient = new Patient({
    firstName: patient.firstName,
    lastName: patient.lastName,
    dateOfBirth: patient.dateOfBirth,
    genotype: patient.genotype,
    enrolledByClinicianId: clinicianId,
    baselineCBC
  });

  patients.push(newPatient);

  // Create donor pool
  if (Array.isArray(familyDonors)) {
    familyDonors.forEach(donor => {
      if (!donor.genotype || !donor.relationship) {
        return;
      }

      const newDonor = new Donor({
        patientId: newPatient.id,
        firstName: donor.firstName,
        relationship: donor.relationship,
        genotype: donor.genotype,
        verifiedByClinicianId: clinicianId
      });

      donors.push(newDonor);
    });
  }

  return res.status(201).json({
    message: "Patient enrolled successfully",
    patientId: newPatient.id,
    donorCount: donors.filter(d => d.patientId === newPatient.id).length
  });
});

/**
 * Read-only patient lookup
 */
router.get("/:id", (req, res) => {
  const patient = patients.find(p => p.id === req.params.id);

  if (!patient) {
    return res.status(404).json({
      error: "Patient not found"
    });
  }

  return res.status(200).json(patient);
});

module.exports = router; 
