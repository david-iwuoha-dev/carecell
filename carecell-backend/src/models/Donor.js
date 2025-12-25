const crypto = require("crypto");

/**
 * Donor Model
 * Represents a verified family-linked potential donor.
 * All fields are immutable once created.
 */
class Donor {
  constructor({
    patientId,
    firstName,
    relationship,
    genotype,
    verifiedByClinicianId
  }) {
    // System identifiers
    this.id = crypto.randomUUID();
    this.patientId = patientId;
    this.createdAt = new Date().toISOString();

    // Donor identity
    this.firstName = firstName;
    this.relationship = relationship;

    // Immutable genotype verification
    this.genotype = {
      value: genotype,
      verifiedAt: new Date().toISOString(),
      verifiedBy: verifiedByClinicianId
    };
  }

  /**
   * Block all mutation attempts
   */
  update() {
    throw new Error("Donor records are immutable");
  }
}

module.exports = Donor;
