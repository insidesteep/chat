const { TokenService } = require("../services");

const verifyToken = async (req, res, next) => {
  const token =
    req.headers.authorization && req.headers.authorization.split(" ")[1];

  if (!token) {
    return res.status(403).send("A token is required for authentication");
  }
  try {
    const decoded = await TokenService.validate(token);

    if (!decoded) {
      return res.status(401).send("Invalid Token");
    }

    req.profile = decoded;
  } catch (err) {
    return res.status(401).send("Invalid Token");
  }
  return next();
};

module.exports = verifyToken;
