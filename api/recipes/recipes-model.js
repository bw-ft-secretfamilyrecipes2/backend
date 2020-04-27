const db = require('../../data/db-config');

module.exports = {
    getRecipes,
    getById,
    // createRecipe,
    findSteps,
    addStep,
    findStepById,
    updateStep,
    removeStep,
    assignIngredient,
}

function getRecipes(){
    return db('recipes')
    // .join('steps', 'recipes.id', '=',
    // 'steps.recipe_id');
}

function getById(id){
    return db('recipes')
    .where({id})
    .first()
};

// function createRecipe(recipe){
//     return db("recipes")
//     .insert(recipe, "id")
//     .then(([id]) => {
//       return findById(id);
//     });
// };

function findSteps(id) {
    // select * from Recipes joins steps on recipes.id = steps.recipe_id;
    return db.select('*').from('recipes')
        .join('steps', 'recipes.id', 'steps.recipe_id')
        .where('recipes.id', id)
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
        }else {
            return null
        }
    })
    .catch(err => console.log('dberr: ', err))
}