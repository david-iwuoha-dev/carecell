const Patient = require("../src/models/Patient");
const Donor = require("../src/models/Donor");
const { evaluateDonorPool } = require("../src/services/hlaMatcher");
const { evaluateRespiratoryRisk } = require("../src/services/rammEngine");
const store = require("../src/api/routes/store");

describe("CareCell Backend Tests", () => {

  beforeEach(() => {
    // Reset store before each test
    store.patients.length = 0;
    store.donors.length = 0;
  });

  test("Patient enrollment creates patient with baseline CBC", () => {
    const patient = new Patient({
      firstName: "Amina",
      lastName: "Yusuf",
      dateOfBirth: "2024-01-12",
      genotype: "SS",
      enrolledByClinicianId: "clin-001",
      baselineCBC: { hemoglobin: 7.8, wbcCount: 14000, reticulocyteCount: 6.2 }
    });
    store.patients.push(patient);

    expect(store.patients.length).toBe(1);
    expect(store.patients[0].baselineCBC.hemoglobin).toBe(7.8);
  });

  test("Donor creation is immutable", () => {
    const donor = new Donor({
      patientId: "p1",
      firstName: "Ibrahim",
      relationship: "Sibling",
      genotype: "AA",
      verifiedByClinicianId: "clin-001"
    });
    store.donors.push(donor);

    expect(() => donor.update()).toThrow("Donor records are immutable");
  });

  test("HLA matcher computes high potential correctly", () => {
    const patient = new Patient({
      firstName: "Amina",
      lastName: "Yusuf",
      dateOfBirth: "2024-01-12",
      genotype: "SS",
      enrolledByClinicianId: "clin-001",
      baselineCBC: { hemoglobin: 7.8, wbcCount: 14000, reticulocyteCount: 6.2 }
    });
    store.patients.push(patient);

    const donor = new Donor({
      patientId: patient.id,
      firstName: "Ibrahim",
      relationship: "Sibling",
      genotype: "AA",
      verifiedByClinicianId: "clin-001"
    });
    store.donors.push(donor);

    const result = evaluateDonorPool(patient.id, store.donors);
    expect(result.highPotential).toBe(true);
    expect(result.matchCount).toBe(1);
  });

  test("RAMM engine triggers alert for >20% increase", () => {
    const baselineRate = 20;
    const measuredRate = 25;
    const { alert, riskScore } = evaluateRespiratoryRisk(measuredRate, baselineRate);
    expect(alert).toBe(true);
    expect(riskScore).toBeCloseTo(0.25);
  });
});
