const express = require("express");
const bcrypt = require("bcryptjs");
const { ADMIN_API_KEY } = require("../../middleware/auth");

const router = express.Router();

// Default admin credentials (override with env). Hash for "admin123"
const DEFAULT_HASH = "$2b$10$kznsFnodOF5oAQ/pwF3iDOh0vznHeXoKp3cfK99.R.UxVwQGLsUrW";

const getAdminHash = () => {
  const hash = process.env.ADMIN_PASSWORD_HASH?.trim();
  if (hash) return hash;
  return DEFAULT_HASH;
};

// POST /api/admin/login
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body || {};
    const expectedUser = process.env.ADMIN_USERNAME || "admin";
    const expectedHash = getAdminHash();

    if (!username || !password) {
      return res.status(400).json({ message: "Username and password required" });
    }
    if (username !== expectedUser) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    const valid = await bcrypt.compare(password, expectedHash);
    if (!valid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    res.json({ token: ADMIN_API_KEY, username });
  } catch (err) {
    console.error("Admin login error:", err.message);
    res.status(500).json({ message: "Login failed", detail: err.message });
  }
});

module.exports = router;
