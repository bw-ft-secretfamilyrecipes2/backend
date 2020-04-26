const db = require('../../data/db-config');

module.exports = {
    add,
    findBy,
    findRecipes,
    findRecipeById,
}

async function add(user) {
    const [id] = await db("users")
    .insert(user, "id");
}

function findBy(filter) {
    return db("users")
    .where(filter);
}

function findRecipes(id) {
    // select * from users joins recipes on users.id = recipes.user_id;
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
    .join('recipes', 'users.id', 'recipes.user_id')
    .select('recipes.id',
            'recipes.user_id',
            'recipes.recipeName',
            'recipes.description',
            'recipes.imageURL',
            'recipes.prepTime',
            'recipes.cookTime',
            'recipes.yields')
    .where('users.id', recipeId)
}

// function addRecipe(recipe){
//     return db('recipes')
//             .insert(recipe, 'id')
//             .then(([id]) => {
//                 return 
//             })
// }
