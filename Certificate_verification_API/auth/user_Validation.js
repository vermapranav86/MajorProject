const { verify } = require("jsonwebtoken");
const validate = async (req, res, next) => {
  let token = req.get("authorization");
  if (token) {
    token = token.slice(7);
    verify(token, "qwert1234", (err, decode) => {
      if (err) {
        res.status(200).send({ status: false, msg: "Invalid token" });
      } else {
        next();
      }
    });
  } else {
    res
      .status(200)
      .send({ status: false, msg: "Access denied! Unauthorize User" });
  }
};

module.exports = {
  validate,
};
