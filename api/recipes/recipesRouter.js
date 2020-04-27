const router = require("express").Router();

const Recipes = require('./recipes-model.js');

router.get("/", (req, res) => {
    // should return a list of all created recipes from all users
    // console.log("token", req.decodedToken);
    Recipes.findRecipes()
      .then(recipes => {
        res.json(recipes);
      })
      .catch(err => {
        res.status(500).json({ message: 'Failed to get recipes' });
      });
});

router.get('/:id', (req, res) => {
  const { id } = req.params;

  Recipes.findById(id)
    .then(recipe => {
      if (recipe) {
        res.json(recipe);
      } else {
        res.status(404).json({ message: 'Could not find recipe with given id.' })
      }
    })
    .catch(err => {
      res.status(500).json({ message: 'Failed to get recipes.' })
    })
})

router.post('/', (req, res) => {
  const recipeData = req.body;

  Recipes.addRecipes(recipeData)
    .then(recipe => {
      res.status(201).json(recipe);
    })
    .catch(err => {
      res.status(500).json({ message: 'Failed to create new recipe' })
    })
})

// router.get('/:id./steps', (req, res) => {
//   const { id } = req.params;

//   Recipes.findSteps(id)
//     .then(steps => {
//       if 
//     })
// })

module.exports = router;
