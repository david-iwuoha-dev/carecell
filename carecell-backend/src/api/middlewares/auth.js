/**
 * Clinician Authentication Middleware (Stub)
 * Expects x-clinician-id header
 * Blocks requests without verification
 */

function clinicianAuth(req, res, next) {
  const clinicianId = req.headers["x-clinician-id"];

  if (!clinicianId) {
    return res.status(401).json({
      error: "Clinician verification required"
    });
  }

  // Attach clinician identity to request
  req.clinicianId = clinicianId;
  next();
}

module.exports = clinicianAuth;
 