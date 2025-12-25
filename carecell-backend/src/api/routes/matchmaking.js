const express = require("express");                                                             
const { evaluateDonorPool } = require("../../services/hlaMatcher");
const { patients } = require("./store");
const { donors } = require("./store")
const clinicianAuth = require("../middlewares/auth");

const router = express.Router();



/**
 * Check BMT eligibility for a patient
 */
router.get("/:patientId/check", clinicianAuth, (req, res) => {
  const { patientId } = req.params;

  // Validate patient exists
  const patientExists = patients.find(p => p.id === patientId);
  if (!patientExists) {
    return res.status(404).json({ error: "Patient not found" });
  }

  // Evaluate donor pool
  const result = evaluateDonorPool(patientId, donors);

  return res.status(200).json({
    message: "BMT Match Evaluation Complete",
    result
  });
});

module.exports = router;
