const express = require("express");
const router = express.Router();
const { patients } = require("./store");
const { buildFHIRBundle } = require("../../services/fhirConverter");



/**
 * Get patient trends from daily logs and wearable summaries
 */
router.get("/trends/:patientId", (req, res) => {
  const { patientId } = req.params;

  const patient = patients.find(p => p.id === patientId);
  if (!patient) {
    return res.status(404).json({ error: "Patient not found" });
  }

  // Compute respiratory trend
  const rrLogs = patient.dailyLogs.map(l => l.respiratoryRate);
  const avgRR = rrLogs.length ? rrLogs.reduce((a, b) => a + b, 0) / rrLogs.length : 0;

  // Compute risk alerts
  const alertCount = patient.dailyLogs.filter(l => l.alert).length;

  // Placeholder for wearable metrics aggregation
  const wearableSummaries = patient.wearableSummaries || [];
  const avgHeartRate = wearableSummaries.length
    ? wearableSummaries.reduce((a, b) => a + (b.heartRate || 0), 0) / wearableSummaries.length
    : 0;

  return res.status(200).json({
    patientId,
    avgRespiratoryRate: avgRR,
    alertsTriggered: alertCount,
    avgHeartRate
  });
});

router.get("/fhir/:patientId", (req, res) => {
  const { patientId } = req.params;

  const patient = patients.find(p => p.id === patientId);
  if (!patient) {
    return res.status(404).json({ error: "Patient not found" });
  }

  const bundle = buildFHIRBundle(patient);
  return res.status(200).json(bundle);
});


module.exports = router;
