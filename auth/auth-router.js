const router = require('express').Router();
const Users = require('./user-model.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

function generateToken(user) {
  const payload = {
    username: user.username,
    id: user.id,
  };
  const options = {
    expiresIn: '1d',
  };
  return jwt.sign(payload, process.env.JWT_SECRET, options);
}

router.post('/register', (req, res) => {
  const { username, password, email } = req.body;
  Users.insert({
    username,
    password: bcrypt.hashSync(password, 8),
    email,
  })
    .then((id) => {
      const token = generateToken({
        id,
        username,
        password,
        email,
      });

      res.status(201).json({
        message: 'User registration complete',
        token,
        user_id: id,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: 'Failed to register user!' });
    });
});

router.post('/login', (req, res) => {
  const { username, password } = req.body;
  Users.findByUsername(username)
    .then((user) => {
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = generateToken(user);
        res.status(200).json({
          message: 'Login successful!',
          token,
          user_id: user.id,
          username: user.username,
        });
      } else {
        res.status(401).json({ message: 'Password Incorrect!' });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: 'Error during login attempt!' });
    });
});

router.post('/validate-token', (req, res) => {
  const token = req.headers.authorization;
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
      if (err) {
        res.status(401).json({
          you: 'Access Denied!',
          isAuthenticated: false,
        });
      } else {
        req.user = decodedToken;
        res.status(200).send({ isAuthenticated: true });
      }
    });
  } else {
    res.status(400).json({
      message: 'Token Missing!',
      isAuthenticated: false,
    });
  }
});

module.exports = router;
