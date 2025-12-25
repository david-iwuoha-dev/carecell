/**
 * FHIR Converter
 * Transforms internal Patient records into FHIR-compatible JSON
 * Read-only. No business logic.
 */

function toFHIRPatient(patient) {
  return {
    resourceType: "Patient",
    id: patient.id,
    name: [
      {
        family: patient.lastName,
        given: [patient.firstName]
      }
    ],
    birthDate: patient.dateOfBirth,
    extension: [
      {
        url: "http://carecell.org/fhir/genotype",
        valueString: patient.genotype.value
      }
    ]
  };
}

function toFHIRObservations(patient) {
  const observations = [];

  // Baseline CBC
  observations.push({
    resourceType: "Observation",
    status: "final",
    category: [
      {
        coding: [{ system: "http://terminology.hl7.org/CodeSystem/observation-category", code: "laboratory" }]
      }
    ],
    code: {
      text: "Baseline Complete Blood Count"
    },
    subject: { reference: `Patient/${patient.id}` },
    effectiveDateTime: patient.baselineCBC.recordedAt,
    component: [
      { code: { text: "Hemoglobin" }, valueQuantity: { value: patient.baselineCBC.hemoglobin, unit: "g/dL" } },
      { code: { text: "WBC Count" }, valueQuantity: { value: patient.baselineCBC.wbcCount, unit: "cells/uL" } },
      { code: { text: "Reticulocyte Count" }, valueQuantity: { value: patient.baselineCBC.reticulocyteCount, unit: "%" } }
    ]
  });

  // Longitudinal lab history
  patient.labHistory.forEach(entry => {
    observations.push({
      resourceType: "Observation",
      status: "final",
      code: { text: "CBC Follow-up" },
      subject: { reference: `Patient/${patient.id}` },
      effectiveDateTime: entry.recordedAt,
      component: [
        { code: { text: "Hemoglobin" }, valueQuantity: { value: entry.hemoglobin, unit: "g/dL" } },
        { code: { text: "WBC Count" }, valueQuantity: { value: entry.wbcCount, unit: "cells/uL" } },
        { code: { text: "Reticulocyte Count" }, valueQuantity: { value: entry.reticulocyteCount, unit: "%" } }
      ]
    });
  });

  return observations;
}

function buildFHIRBundle(patient) {
  const entries = [];

  entries.push({ resource: toFHIRPatient(patient) });

  toFHIRObservations(patient).forEach(obs => {
    entries.push({ resource: obs });
  });

  return {
    resourceType: "Bundle",
    type: "collection",
    timestamp: new Date().toISOString(),
    entry: entries
  };
}

module.exports = { buildFHIRBundle };
