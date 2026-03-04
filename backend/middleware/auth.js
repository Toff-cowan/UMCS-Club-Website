// Protects admin routes - checks API key in Authorization header (no JWT)
const ADMIN_API_KEY = process.env.ADMIN_API_KEY || "admin-dev-key";

function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  const token = authHeader.slice(7);
  if (token !== ADMIN_API_KEY) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  req.admin = { sub: "admin" };
  next();
}

module.exports = { authMiddleware, ADMIN_API_KEY };
