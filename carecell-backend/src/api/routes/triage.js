const express = require("express");
const { evaluateRespiratoryRisk } = require("../../services/rammEngine");
const { patients } = require("./store"); // <-- use same patients array
const clinicianAuth = require("../middlewares/auth");
  
const router = express.Router();

/**
 * Submit daily health log / RAMM output
 */
router.post("/daily-log/:patientId", (req, res) => {
  const { patientId } = req.params;
  const { respiratoryRate } = req.body;

  // Find patient
  const patient = patients.find(p => p.id === patientId);
  if (!patient) {
    return res.status(404).json({ error: "Patient not found" });
  }

  // Use baseline from patient (demo placeholder)
  const baselineRate = patient.baselineCBC.hemoglobin; 

  // Evaluate risk
  const { riskScore, alert } = evaluateRespiratoryRisk(respiratoryRate, baselineRate);

  // Append daily log
  patient.dailyLogs.push({
    respiratoryRate,
    riskScore,
    alert,
    timestamp: new Date().toISOString()
  });

  return res.status(200).json({
    message: "Daily log processed",
    riskScore,
    alert
  });
});

module.exports = router;
