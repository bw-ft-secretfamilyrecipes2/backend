const db = require('../../data/db-config');

module.exports = {
    findRecipes,
    findById,
    addRecipes,
    findSteps,
    assignIngredient,
}

function findRecipes(){
    return db('recipes')
    // .join('steps', 'recipes.id', '=',
    // 'steps.recipe_id');
}

function findById(id){
    return db('recipes')
    .where({id})
    .first()
};

function addRecipes(recipe){
    return db("recipes")
    .insert(recipe, "id")
    .then(([id]) => {
      return findById(id);
    });
};

function findSteps(id) {
    // select * from Recipes joins steps on recipes.id = steps.recipe_id;
    return db.select('*').from('recipes')
        .join('steps', 'recipes.id', 'steps.recipe_id')
        .where('recipes.id', id)
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