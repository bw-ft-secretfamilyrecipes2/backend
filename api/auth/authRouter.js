const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const secrets = require("../../secrets");

//endpoint to register
router.post('/register', (req, res) => {
//should take username and password from req.body
//before saving password to database, bcrypt should hash it
//then add username and hashed password to database
});

//endpoint to login
router.post('/login', (req, res) => {
//should take username and password from req.body
//then look in database for matching username and
//matching password using bcrypt.compareSync on password
//if found, return a generated token for
//user to save and access protected endpoints
});

function generateToken(user) {
  const payload = {
    userId: user.id,
    username: user.username,
  };
  const secret = secrets.jwtSecret;
  const options = {
    expiresIn: 1000 * 5,
  };

  return jwt.sign(payload, secret, options);
}


module.exports = router;
