const jwt = require("jsonwebtoken");

function verifyToken(req, res, next) {
  const token = req.headers.authorization;
  if (token == null) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  const tokenWithoutBearer = token.split(" ")[1];
  try {
    const decoded = jwt.verify(tokenWithoutBearer, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(403).json({ message: "Forbidden" });
  }
}
module.exports = verifyToken;
