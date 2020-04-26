const db = require('../../data/db-config');

module.exports = {
    add,
    findBy,
    findRecipes,
}

async function add(user) {
    const [id] = await db("users").insert(user, "id");
}

function findBy(filter) {
    return db("users").where(filter);
}

function findRecipes(id) {
    // select * from users joins recipes on users.id = recipes.user_id;
    return db.select("*").from('users')
        .join('recipes', 'users.id', 'recipes.user_id')
        .where('users.id', id)
}
