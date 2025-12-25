/**
 * HLA Matcher Service
 * Determines if a patient has a high probability of a family donor match.
 * This is deterministic and based on simple rules:
 * - Sibling AA or AS is considered a potential match
 * - Returns probability score and match candidates
 */

function evaluateDonorPool(patientId, donorPool) {
  const patientDonors = donorPool.filter(d => d.patientId === patientId);

  const matches = patientDonors.filter(d => {
    // Only AA or AS donors count
    return d.genotype.value === "AA" || d.genotype.value === "AS";
  });

  // Probability calculation: simple ratio
  const probability = patientDonors.length
    ? matches.length / patientDonors.length
    : 0;

  return {
    patientId,
    matchCount: matches.length,
    totalDonors: patientDonors.length,
    probability,
    highPotential: probability >= 0.5, // Threshold for “high potential”
    matches: matches.map(d => ({
      id: d.id,
      firstName: d.firstName,
      relationship: d.relationship,
      genotype: d.genotype.value
    }))
  };
}

module.exports = { evaluateDonorPool };
