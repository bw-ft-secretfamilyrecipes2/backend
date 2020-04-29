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
});

//adds recipe
router.post('/:id/recipes', (req, res) => {
    const { id } = req.params;
    const newRecipe = req.body;
    console.log(newRecipe);
    newRecipe.user_id = id;

    Users.addRecipe(newRecipe, id)
    .then(recipes => {
        res.status(200).json(recipes)
    })
    .catch(err => res.status(401).json({ message: 'error adding recipe.', err}))
});

//updates recipe
router.put('/:id/recipes/:recipeId', (req, res) => {
    const { id, recipeId } = req.params;
    const changes = req.body;

    Users.findRecipeById(recipeId)
    .then(recipe => {
        console.log('res: ', recipe)
        if(!recipe[0]){
            res.status(400).json({ message: 'that recipe does not exist.' })
        }
        Users.updateRecipe(changes, recipeId)
        .then(update => {
            console.log(update)
            res.status(201).json({ message: 'update success!', update})
        })
        .catch(err => res.status(400).json({ message: 'error updating that recipe.' }))
    })
    .catch(err => res.status(400).json({ message: 'error finding that recipe.', err}))
})

// delete recipe
router.delete('/:id/recipes/:recipeId', (req, res) => {
    const { id, recipeId } = req.params;
  
    Users.findRecipeById(recipeId)
      .then(recipe => {
        if (!recipe.length) {
          res.status(400).json({ message: 'that recipe does not exist.' })
        }
        Users.removeRecipe(recipeId)
          .then(deleted => {
            res.status(201).json({ message: 'deleted successfully!', deleted })
          })
          .catch(err => res.status(400).json({ message: 'error deleting the recipe.' }))
      })
      .catch(err => res.status(400).json({ message: 'error finding that recipe.', err }))
  })

module.exports = router;