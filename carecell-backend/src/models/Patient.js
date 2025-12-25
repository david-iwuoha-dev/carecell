const crypto = require("crypto");

/**
 * Patient Model
 * This model represents a verifiable clinical subject.
 * Certain fields are immutable once set.
 * Clinical history is append-only.
 */
class Patient {
  constructor({
    firstName,
    lastName,
    dateOfBirth,
    genotype,
    enrolledByClinicianId,
    baselineCBC
  }) {
    // System generated
    this.id = crypto.randomUUID();
    this.createdAt = new Date().toISOString();

    // Identity
    this.firstName = firstName;
    this.lastName = lastName;
    this.dateOfBirth = dateOfBirth;

    // Immutable clinical facts
    this.genotype = {
      value: genotype,
      verifiedAt: new Date().toISOString(),
      verifiedBy: enrolledByClinicianId
    };

    // Baseline hematology snapshot
    this.baselineCBC = {
      hemoglobin: baselineCBC.hemoglobin,
      wbcCount: baselineCBC.wbcCount,
      reticulocyteCount: baselineCBC.reticulocyteCount,
      recordedAt: new Date().toISOString(),
      recordedBy: enrolledByClinicianId
    };

    // Longitudinal Care Log
    this.labHistory = [];

    // Daily and device data references
    this.dailyLogs = [];
    this.wearableSummaries = [];
  }

  /**
   * Append-only lab result
   * Never overwrites baseline or previous records
   */
  addLabResult({ hemoglobin, wbcCount, reticulocyteCount, clinicianId }) {
    const entry = {
      hemoglobin,
      wbcCount,
      reticulocyteCount,
      recordedAt: new Date().toISOString(),
      recordedBy: clinicianId
    };

    this.labHistory.push(entry);
  }

  /**
   * Prevent genotype mutation
   */
  updateGenotype() {
    throw new Error("Genotype is immutable once verified");
  }

  /**
   * Derived severity profile
   * Read-only computation
   */
  getSeverityProfile() {
    return {
      genotype: this.genotype.value,
      baselineHemoglobin: this.baselineCBC.hemoglobin,
      baselineWBC: this.baselineCBC.wbcCount,
      baselineRetic: this.baselineCBC.reticulocyteCount
    };
  }
}

module.exports = Patient;
