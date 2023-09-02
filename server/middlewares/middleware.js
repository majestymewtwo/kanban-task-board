const jwt = require("jsonwebtoken");

const authMiddleware = async (req, res, next) => {
  const token = req.headers.authorization;
  if (!token || token.substring(0, 7) !== "Bearer ")
    res.status(403).send({
      error: "Invalid or no token received",
    });
  else {
    req.cookies.token = token.substring(7);
    try{
        jwt.verify(token.substring(7), process.env.SECRET);
        next();
    } catch (err) {
        res.status(403).send({
          error: "Invalid or expired token received",
        });
    }
  }
};
module.exports = authMiddleware;
