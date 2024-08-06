import verifyToken from "../utils/verifyToken.js";

const validateUser = 
  (req, res, next) => {
    try {
      const userToken = req.cookies?.token;
      if (!userToken) {
        return res.status(401).json({
          message: "Unauthorized User! No token provided",
          success: false,
        });
      }
      const decoded = verifyToken(userToken);
      if (!decoded) {
        return res.status(401).json({
          message: "Invalid token",
          success: false,
        });
      }
      req.user = decoded;
      next();
    } catch (error) {
      return res.status(500).json({
        message: "Internal Server Error",
        success: false,
        error: error.message,
      });
    }
};

export { validateUser };
