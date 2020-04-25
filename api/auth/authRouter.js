const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const secrets = require("../../secrets");

const Users = require("../users/users-model.js")

//endpoint to register
router.post('/register', (req, res) => {
//should take username and password from req.body
  let user = req.body;
//before saving password to database, bcrypt should hash it
  const rounds = process.env.HASH_ROUNDS || 14;
  const hash = bcrypt.hashSync(user.password, rounds);
  user.password = hash;
//then add username and hashed password to database
  Users.add(users)
    .then(saved => {
      res.status(201).json(saved);
    })
    .catch(error => {
      console,log(error);
      res.status(500).json({ errorMessage: error.message });
    });
});

//endpoint to login
router.post('/login', (req, res) => {
//should take username and password from req.body
  let { username, password } = req.body;
//then look in database for matching username and
//matching password using bcrypt.compareSync on password
//if found, return a generated token for
//user to save and access protected endpoints
  Users.findBy({ username })
    .then(([user]) => {
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = generateToken(user);
        res.status(200).json({ message: "Welcome!", token })
      } else {
        res.status(401).json({ message: "You shall not pass!" })
      }
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({ errorMessage: error.message });
    });
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
