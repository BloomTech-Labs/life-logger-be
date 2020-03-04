const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const token = req.headers.authorization;
  if (token) {
    jwt.verify(token,'aeaeiouAndSometimesY', (err, decodedToken) => {
      if (err) {
        res.status(401).json({ you: 'Access Denied!' }); 
      } else {
        req.user = decodedToken;
        next();
      }
    });
  } else {
    res.status(400).json({ message: "Token Missing!" });
  }
  
};