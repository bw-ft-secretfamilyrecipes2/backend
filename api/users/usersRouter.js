const router = require("express").Router();

const Users = require('./usersModel.js');

//gets users recipes
router.get("/:id/recipes", (req, res) => {
    console.log("token", req.decodedToken);
    const { id } = req.params;

    Users.findRecipes(id)
        .then(recipes => {
            if (recipes.length) {
            res.json(recipes);
            } else {
            res.status(404).json({ 
                message: 'Could not find recipes for given user'
             })
            }
        })
        .catch(err => {
            res.status(500).json({ message: 'Failed to get recipes' });
        });
});

//finds specific recipe
router.get('/:id/recipes/:recipeId', (req, res) => {
    const { id, recipeId } = req.params;

    Users.findRecipes(id)
    .then(recipes => {
        !recipes[0]
        ?res.status(400).json({ message: 'no recipes have been created for this user.'})
        :Users.findRecipeById(recipeId)
        .then(recipe =>{
            !recipe[0]
            ?res.status(400).json({ message: 'that recipeId does not exist for this user.'})
            :res.status(200).json(recipe)
        })
        .catch(err => res.status(400).json({ message: 'could not find that recipe.'}))
    })
    .catch(err => res.status(500).json({ message: 'error getting recipe.'}))
})

module.exports = router;