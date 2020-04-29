const db = require('../../data/db-config');

module.exports = {
    getRecipes,
    getById,
    findSteps,
    addStep,
    findStepById,
    updateStep,
    removeStep,
    findRecipeIngredients,
    insertIngredient,
    deleteRecipeIngredient,
    assignIngredient,
    updateRecipePic,
    findRecipePic,
}

function getRecipes(){
    return db("recipes");
}

function getById(id){
    return db('recipes')
    .where({id})
    .first()
};

function findSteps(id) {
    return db.select('*').from('steps')
        .where('steps.recipe_id', id)
}

async function addStep(step, recipe_id) {
    const newStep = {...step, recipe_id};
    const [id] = await db('steps').insert(newStep, 'id');
    return db('steps').where('id', id)
}

function findStepById(stepId) {
    return db.select('*').from('recipes')
        .join('steps', 'recipes.id', 'steps.id')
        .where('steps.id', stepId)
}

function updateStep(changes, stepId) {
    return db('steps')
        .where('steps.id', stepId)
        .update(changes)
        .then(() => {
            return findSteps(stepId)
        })
}

function removeStep(stepId) {
    return db('steps')
     .where('steps.id', stepId)
     .del()
}

function assignIngredient( recipe_id, ingredient_id){
    return db('recipe_ingredients')
    .select('recipe_ingredients.ingredient_id')
    .where({'recipe_ingredients.recipe_id': 
        recipe_id, 'recipe_ingredients.ingredient_id':
        ingredient_id})
    .then(res => {
        const found = res.find(function(ingredient){
            return ingredient.ingredient_id === parseInt(ingredient_id)
        });
        if(!found){
            return db('recipe_ingredients')
            .insert({recipe_id, ingredient_id})
        } else {
            return null
        }
    })
    .catch(err => console.log('dberr: ', err))
}

function updateRecipePic(changes, id) {
    return db('recipes')
        .where({ id })
        .update(changes)
        .then(count => findById(id));
}

function findRecipePic(id) {
    return db('recipes')
        .select('id', 'imageURL')
        .where({ id });
}

function findRecipeIngredients(recipeId){
    return db('recipe_ingredients')
    .select('ingredientName',
            'amount')
    .where('recipe_id', recipeId)
    .join('ingredients', 
    'recipe_ingredients.ingredient_id',
    'ingredients.id')
    .catch(err => console.log('******helper: ', err))
  };

  function insertIngredient( recipeId, ingredient){ 
    db('ingredients')         //Access ingredients database
    .where({ingredientName: ingredient.ingredientName})    //checks condition where ingredientNames match up
    .then(ids => {     //returns array with  it's id from resources database IF found
          if(ids[0]){   //if found in resources database then...
          return db('recipe_ingredients') //access middle table (projects_resources)
          //inserts project_id (from args)
          // and resource_id (from the id inside array from previous step)
          .insert({ recipe_id: recipeId, 
                    ingredient_id: ids, 
                    amount: ingredient.amount 
                })  
          .then( () => { //returns that resource but now it's assigned to a  project
              return db( 'ingredients' )          
              .where( { id: ids[0] } )          
              .first();        
              });    
          }
          else{ //if not found in resources database then...
          return db('ingredients') //access resource database
          .insert(ingredient.name)  //insert the resource object from the function args
          .then( ids => { 
              return db( 'recipe_ingredients' ) //access middle table (projects_resources)
              //inserts project_id (from args)
              // and resource_id (from the id inside array from previous step)
              .insert({ recipe_id: recipeId, 
                        ingredient_id: ids[0]
                     })        
              .then( () => {  //returns that resource but now it's assigned to a  project       
                  return db( 'ingredients' )          
                  .where( { id: ids[0] } )          
                  .first();        
                  })
              } 
          )
      } 
  })
}

  function deleteRecipeIngredient(ingredientId) {
      return db('recipe_ingredients')
      .where('recipe_ingredients.id', ingredientId)
      .del()
  }