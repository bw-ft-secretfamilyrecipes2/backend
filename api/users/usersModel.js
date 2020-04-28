const db = require('../../data/db-config');

module.exports = {
    add,
    findBy,
    findRecipes,
    findRecipeById,
    addRecipe,
    updateRecipe,
    removeRecipe
}

async function add(user) {
    const [id] = await db("users")
    .insert(user, "id");
    return findBy(id)
}

function findBy(filter) {
    return db("users")
    .where(filter);
}

function findRecipes(id) {
    return db("users")
        .join('recipes', 'users.id', 'recipes.user_id')
        .select('users.username',
                'recipes.id',
                'recipes.user_id',
                'recipes.recipeName',
                'recipes.description',
                'recipes.imageURL',
                'recipes.prepTime',
                'recipes.cookTime',
                'recipes.yields')
        .where('users.id', id)
}

function findRecipeById(recipeId){
    return db("users")
    .join('recipes', 'users.id', 'recipes.id')
    .select('recipes.id',
            'recipes.user_id',
            'recipes.recipeName',
            'recipes.description',
            'recipes.imageURL',
            'recipes.prepTime',
            'recipes.cookTime',
            'recipes.yields')
    .where('recipes.id', recipeId)
}

function addRecipe(newRecipe, id){
    return db('recipes')
            .insert(newRecipe, 'id')
            .then(() => {
                return findRecipes(id)
            })
}

function updateRecipe(changes, recipeId){
    return db('recipes')
            .where('recipes.id', recipeId)
            .update(changes)
            .then(() => {
                return findRecipeById(recipeId)
            })
}

function removeRecipe(recipeId) {
    return db('recipes')
        .where('recipes.id', recipeId)
        .del()
}
