const router = require("express").Router();

const Recipes = require('./recipes-model.js');

const cloudinary = require('cloudinary').v2;
const bodyParser = require('body-parser');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

//gets all recipes
router.get('/', (req, res) => {
  Recipes.getRecipes()
  .then(recipes => {
  res.status(200).json(recipes)
})
  .catch(err => res.status(500).json({ message: 'Failed to get recipes.'}))
});

//gets recipe by recipe's id
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
});

//gets recipes' steps
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

//post a step to a recipe
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

//find particular step
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

//update particular step
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

//delete particular step
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

// get recipes' ingredients
router.get('/:id/ingredients', (req, res) => {
  const { id } = req.params;

  Recipes.getById(id)
  .then(recipe => {
    console.log(recipe)
    if(!recipe){
      res.status(400).json({ message: 'that recipe does not exist.'})
    }

    Recipes.findRecipeIngredients(id)
    .then(ingredients => {
      res.status(200).json(ingredients)
    })
    .catch(err => res.status(400).json({ message: 'no ingredients.'}))
  })
  .catch(err => res.status(500).json({ message: 'error finding recipe.'}))
})

//add ingredients to a recipe
router.post('/:id/ingredients', (req, res) => {
    const { id } = req.params;
    const ingredient = req.body;
  
    console.log(ingredient)
    
    Recipes.getById(id)
      .then(recipe => {
        console.log('*****recipe: ', recipe)
        if (!recipe) {
          res.status(400).json({ message: 'that recipe does not exist.' })
        }
        console.log(ingredient)
        
        Recipes.insertIngredient(recipe.id, ingredient)
        .then(added => {
          console.log('****added: ', added)
          res.status(201).json(added)
        })
        .catch(err => {
          console.log(err)
          res.status(400).json({ message: 'error trying to add that ingredient.', err })
        })
      })
      .catch(err => res.status(400).json({ message: 'error finding that recipe.', err }))
  })

//delete recipe ingredient
router.delete('/:id/ingredients/:ingredientId', (req, res) => {
  const { id, ingredientId } = req.params;
  
  Recipes.getById(id)
    .then(recipe => {
      if (!recipe) {
        res.status(400).json({ message: 'that recipe does not exist.' })
      }

      Recipes.deleteRecipeIngredient(ingredientId)
        .then(deleted => {
          res.status(201).json({ message: 'deleted successfully!', deleted })
        })
        .catch(err => res.status(400).json({ message: 'error deleting the ingredient.' }))
    })
    .catch(err => res.status(400).json({ message: 'error finding that recipe.', err }))
})

cloudinary.config({
  cloud_name: 'imagevideo',
  api_key: '312561633271293',
  api_secret: 'hnbjjHVnNfC0RVXUJrCvy5u9NLc',
});

// POST add recipe image
router.post("/:id/image", (req, res) => {
  const data = {
    image: req.body.image,
  };

  cloudinary.uploader.upload(data.image);
  
})

// PUT edit recipe image
router.put('/:id/image', (req, res) => {
  // const imageURL = req.body.imageURL;
  const id = req.params.id
  const changes = {
    image: req.body.image,
  };

  // console.log('file:', file, 'id:', id);
  cloudinary.uploader.upload(changes.image);
  // cloudinary.uploader.upload(file.upload.path, result => {
  // console.log('CLOUDINARY', result);
    Recipes.updateRecipePic({ changes, id })
      .then(res => {
        res.json({ success: true, changes });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({ message: 'Error uploading to Cloudinary' });
      });


});

// GET get recipe image
router.get('/:id/image', (req, res) => {
  const { id } = req.params;
  Recipes.findRecipePic(id)
    .then(picture => {
      res.status(200).json(picture);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: 'Failed to get image urls' });
    });
});

module.exports = router;
