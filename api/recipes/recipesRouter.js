const router = require("express").Router();

router.get("/", (req, res) => {
    //should return a list of all created recipes from all users

//   console.log("token", req.decodedToken);
    res.status(200).json({ message: `recipesRouter GET endpoint`})
});

module.exports = router;