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
    addRecipePic,
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
    return db('ingredients')         
    .where({ingredientName: ingredient.ingredientName})    
    .then(ids => {     
          if(ids[0]){  
              console.log('line 110: ', ids[0])
          return db('recipe_ingredients') 
          .insert({ recipe_id: recipeId, 
                    ingredient_id: ids[0].id, 
                    amount: ingredient.amount 
                })  
          .then( () => {
              return db( 'ingredients' )          
              .where( { id: ids[0].id } )          
              .first();        
              });    
          }
          else{
              console.log('line 123: ')
          return db('ingredients')
          .insert({ingredientName: ingredient.ingredientName}, 'id')
          .then( ids => { 
              return db( 'recipe_ingredients' )
              .insert({ recipe_id: recipeId, 
                        ingredient_id: ids[0],
                        amount: ingredient.amount
                     })        
              .then( () => {
                console.log('line 131: ', ids[0])
                  return db('ingredients')          
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

function addRecipePic(image) {
    return db('recipes')
        .insert(image, 'id');
}
