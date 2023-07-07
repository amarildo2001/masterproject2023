const jwt = require('jsonwebtoken');

const jwtMiddleware = (req, res, next) => {
    const token = req.headers.authorization;
  
    if (!token) {
      return res.status(401).json({ message: 'No token provided.' });
    }
  
    jwt.verify(token, YOUR_JWT_SECRET_KEY, (err, decoded) => {
      if (err) {
        return res.status(403).json({ message: 'Failed to authenticate token.' });
      }
  
      // Attach the decoded user information to the request object for later use
      req.user = decoded;
  
      next();
    });
  };
  
  module.exports = jwtMiddleware;
  