
import { validateToken } from "../utils/authenticate.js";

export function ensureAuthenticated(req, res, next) {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ error: "Unauthorized: No token provided" });
  }

  try {
    const user = validateToken(token); // Validate the token
    req.user = user; // Attach the decoded user payload to the request object
    next(); // Proceed to the next middleware or route handler
  } catch (err) {
    res.status(401).json({ error: "Unauthorized: Invalid token" });
  }
}

export function ensureAdmin(req, res, next) {
  if (req.user.role !== "admin") {
    return res.status(403).json({ error: "Unauthorized: Admin access required" });
  }
  next();
}