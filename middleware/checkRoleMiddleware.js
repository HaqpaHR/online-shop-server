const jwt = require("jsonwebtoken");

module.exports = function (role) {
  return function (req, res, next) {
    if (req.method === "OPTION") {
      next();
    }

    try {
      const token = req.headers.authorization.split(" ")[1]; //Bearer ;lakd;laksdl;asdlk
      if (!token) {
        res.status(401).json({ message: "Авторизуйтесь" });
      }
      const decoded = jwt.verify(token, process.env.SECRET_KEY_JWT);
      if (decoded.role !== role) {
        return res.status(401).json({ message: "Нет доступа" });
      }
      req.user = decoded;
      next();
    } catch (e) {
      res.status(401).json({ message: "Авторизуйтесь" });
    }
  };
};
