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
    // assignIngredient,
    updateRecipePic,
    findRecipePic,
    addRecipePic,
}

function getRecipes(){
    return db("recipes")
    .orderBy('recipes.id', 'asc')
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

// function assignIngredient( recipe_id, ingredient_id){
//     return db('recipe_ingredients')
//     .select('recipe_ingredients.ingredient_id')
//     .where({'recipe_ingredients.recipe_id': 
//         recipe_id, 'recipe_ingredients.ingredient_id':
//         ingredient_id})
//     .then(res => {
//         const found = res.find(function(ingredient){
//             return ingredient.ingredient_id === parseInt(ingredient_id)
//         });
//         if(!found){
//             return db('recipe_ingredients')
//             .insert({recipe_id, ingredient_id})
//         } else {
//             return null
//         }
//     })
//     .catch(err => console.log('dberr: ', err))
// }

function updateRecipePic(changes, id) {
    return db('recipes')
        .where({ id })
        .update(changes)
        .then(count => getById(id));
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

  function insertIngredient( recipeId, ingredient){     //takes a recipeID and an ingredient object
    return db('ingredients')                           //access the ingredients table FIRST
    .where({ingredientName: ingredient.ingredientName})    //check if ingredientName (from ingredients table) matches
                                                            //the ingredientName from the ingredient object
    .then(ids => {    
        //IF INGREDIENT ALREADY EXISTS IN INGREDIENTS TABLE
                                        // ONLY IF found...
          if(ids[0]){                                 //take that found ingredient from ingredients table
              console.log('line 110: ', ids[0])
          return db('recipe_ingredients')             //access middle table (recipe_ingredients)
          //add (insert) according to each key 
          .insert({ recipe_id: recipeId,              //recipe_id will be recipeId from arguments   
                    ingredient_id: ids[0].id,         //ingredient_id will be from found ingredient[0].id
                    amount: ingredient.amount         //amount will be from ingredient object's amount value
                })  
          .then( () => {                              
              return db( 'ingredients' )       //then access ingredients again...
              .where( { id: ids[0].id } )     //where id matches id[0].id (id from initial fournd ingredient)
              .first();                      //since we get back an array we just want the first index
              });    
          }
          //IF INGREDIENT DOES NOT EXIST IN INGREDIENTS TABLE
          else{                            //IF ingredient DOES NOT exist...
              console.log('line 123: ')
          return db('ingredients')        //access ingredients table
          .insert({ingredientName: ingredient.ingredientName}, 'id')    //insert into ingredientName,
          // ingredient.ingredientName (from the ingredient object that we pass in arguments)
          .then( ids => { 
              return db( 'recipe_ingredients' )
              .insert({ recipe_id: recipeId,           //recipe_id will be recipeId from arguments  
                        ingredient_id: ids[0],        //ingredient_id will be from found ingredient[0].id
                        amount: ingredient.amount    //amount will be from ingredient object's amount value
                     })        
              .then( () => {
                console.log('line 131: ', ids[0])
                  return db('ingredients')      //then access ingredients again..
                  .where( { id: ids[0] } )    //where id matches id[0].id (id from initial fournd ingredient)      
                  .first();                  //since we get back an array we just want the first index
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
