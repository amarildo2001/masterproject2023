const jwt = require('jsonwebtoken');

// Admin middleware function
exports.adminMiddleware = (req, res, next) => {
  // Get the JWT token from the request headers
  const token = req.headers.authorization;

  // Check if the token exists
  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    // Verify the token
    const decodedToken = jwt.verify(token, 'your-secret-key');
    
    // Check if the decoded token has the admin role
    if (decodedToken.role !== 'admin') {
      return res.status(403).json({ error: 'Forbidden' });
    }

    // Set the user ID from the token to the request object
    req.userId = decodedToken.userId;

    // Call the next middleware or route handler
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Invalid token' });
  }
};
