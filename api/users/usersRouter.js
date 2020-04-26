const router = require("express").Router();

const Users = require('./usersModel.js');

router.get("/:id/recipes", (req, res) => {
    // should return list of recipes that user (from req.params
    // has created and saved to database

    console.log("token", req.decodedToken);
    const { id } = req.params;

    Users.findRecipes(id)
        .then(recipes => {
            if (recipes.length) {
            res.json(recipes);
            } else {
            res.status(404).json({ message: 'Could not find recipes for given user' })
            }
        })
        .catch(err => {
            res.status(500).json({ message: 'Failed to get recipes' });
        });
});

module.exports = router;