const router = require("express").Router();

router.get("/:id/recipes", (req, res) => {
    //should return list of recipes that user (from req.params
    // has created and saved to database

//   console.log("token", req.decodedToken);
    res.status(200).json({ message: `usersRouter GET endpoint`})
});

module.exports = router;