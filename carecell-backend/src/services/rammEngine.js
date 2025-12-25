/**
 * RAMM Engine
 * Simulated Respiratory Acoustic Monitoring
 * Inputs:
 * - respiratoryRate: measured breaths per minute
 * - baselineRate: patient-specific baseline
 * Returns:
 * - riskScore (0-1)
 * - alert (true/false)
 */

function evaluateRespiratoryRisk(respiratoryRate, baselineRate) {
  if (!respiratoryRate || !baselineRate) {
    throw new Error("Missing respiratory rate data");
  }

  // Simple proportional increase
  const increase = (respiratoryRate - baselineRate) / baselineRate;

  // Risk score capped between 0 and 1
  const riskScore = Math.min(Math.max(increase, 0), 1);

  // Alert if increase exceeds 20%
  const alert = riskScore >= 0.2;

  return { riskScore, alert };
}

module.exports = { evaluateRespiratoryRisk };
