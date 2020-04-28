const router = require("express").Router();

const Recipes = require('./recipes-model.js');

router.get("/", (req, res) => {
    // should return a list of all created recipes from all users
    // console.log("token", req.decodedToken);
    Recipes.getRecipes()
      .then(recipes => {
        res.staus(200).json(recipes);
      })
      .catch(err => {
        res.status(500).json({ message: 'Failed to get recipes' });
      });
});

router.get('/:id', (req, res) => {
  const { id } = req.params;

  Recipes.getById(id)
    .then(recipe => {
      if (recipe) {
        res.status(200).json(recipe);
      } else {
        res.status(404).json({ message: 'Could not find recipe with given id.' })
      }
    })
    .catch(err => {
      res.status(500).json({ message: 'Failed to get recipes.' })
    })
})

// router.post('/', (req, res) => {
//   const recipeData = req.body;

//   Recipes.createRecipe(recipeData)
//     .then(recipe => {
//       res.status(201).json(recipe);
//     })
//     .catch(err => {
//       res.status(500).json({ message: 'Failed to create new recipe' })
//     })
// })

router.get('/:id/steps', (req, res) => {
  const { id } = req.params;

  Recipes.findSteps(id)
    .then(steps => {
      if (steps.length) {
        res.status(200).json(steps);
      } else {
        res.status(404).json({ message: 'Could not find steps for given recipe' })
      }
    })
    .catch(err => {
      res.status(500).json({ message: 'Failed to get steps'})
    })
})

router.post('/:id/steps', (req, res) => {
  const stepData = req.body;
  const { id } = req.params;

  Recipes.getById(id)
    .then(recipe => {
      if (recipe) {
        Recipes.addStep(stepData, id)
          .then(step => {
            res.status(201).json(step);
          })
      } else {
        res.status(404).json({ message: 'Could not find recipe with given id.' })
      }
    })
    .catch( err => {
      res.status(500).json({ message: 'Failed to create new step' })
    })
})

router.get('/:id/steps/:stepId', (req, res) => {
  const { id, stepId } = req.params;

  Recipes.findSteps(id)
    .then(steps => {
      !steps[0]
      ? res.status(400).json({ messasge: 'no steps have been created for this recipe.' })
      : Recipes.findStepById(stepId)
        .then(step => {
          !step[0]
          ? res.status(400).json({ message: 'that stepId does not exist for this user.' })
          : res.status(200).json(step)
        })
        .catch(err => res.status(400).json({ message: 'could not find that step.' }))
    })
    .catch(err => res.status(500).json({ messasge: 'error getting step.' }))
})

router.put('/:id/steps/:stepId', (req, res) => {
  const { id, stepId } = req.params;
  const changes = req.body;

  Recipes.findStepById(stepId)
    .then(step => {
      if (!step.length) {
        res.status(400).json({ message: 'that step does not exist.' })
      }
      Recipes.updateStep(changes, stepId)
        .then(update => {
          res.status(201).json({ message: 'updated successfully!', update })
        })
        .catch(err => res.status(400).json({ message: 'error updating the step.' }))
    })
    .catch(err => res.status(400).json({ message: 'error finding that step.', err }))
})

router.delete('/:id/steps/:stepId', (req, res) => {
  const { id, stepId } = req.params;

  Recipes.findStepById(stepId)
    .then(step => {
      if (!step.length) {
        res.status(400).json({ message: 'that step does not exist.' })
      }
      Recipes.removeStep(stepId)
        .then(deleted => {
          res.status(201).json({ message: 'deleted successfully!', deleted })
        })
        .catch(err => res.status(400).json({ message: 'error deleting the step.' }))
    })
    .catch(err => res.status(400).json({ message: 'error finding that step.', err }))
})

module.exports = router;
