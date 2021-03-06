const db = require('../../data/db-config');

module.exports = {
    add,
    findBy,
    findById,
    findRecipes,
    findRecipeById,
    addRecipe,
    updateRecipe,
    removeRecipe
}

async function add(user) {
    const [id] = await db("users")
    .insert(user, "id");
    return findById(id)
}

function findBy(filter) {
    return db("users")
    .where(filter);
}

function findById(id) {
    return db("users")
    .where({ id })
    .first();
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
        .orderBy('recipes.id', 'asc')
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

function addRecipe(newRecipe){
    const {recipeName,
            description,
            imageURL,
            prepTime,
            cookTime,
            yields,
            user_id} = newRecipe
    return db('recipes')
            .insert({recipeName,
                description,
                imageURL,
                prepTime,
                cookTime,
                yields,
                user_id}, 'id')
            .then((id) => {
                console.log(id)
                return db('recipes')
                        .where('id', id[0])
                        .first()
            })
}

// async function addStep(step, recipe_id) {
//     const newStep = {...step, recipe_id};
//     const [id] = await db('steps')
        //.insert(newStep, 'id');
//     return db('steps').where('id', id)
// }

function updateRecipe(changes, recipeUpdate, recipeId){
    const { recipeName = recipeUpdate.recipeName,
            description = recipeUpdate.description,
            imageURL = recipeUpdate.imageURL,
            prepTime = recipeUpdate.prepTime,
            cookTime = recipeUpdate.cookTime,
            yields = recipeUpdate.yields} =changes

    return db('recipes')
            .where('recipes.id', recipeId)
            .update({recipeName,
                    description,
                    imageURL,
                    prepTime,
                    cookTime,
                    yields})
            .then(() => {
                return findRecipeById(recipeId)
            })
            .catch(err => console.log('catch: ', err))
}

function removeRecipe(recipeId) {
    return db('recipes')
        .where('recipes.id', recipeId)
        .del()
}
