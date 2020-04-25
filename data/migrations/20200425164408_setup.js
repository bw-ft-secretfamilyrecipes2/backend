
exports.up = function(knex) {
    return(
        knex.schema
        //users
        .createTable('users', tbl => {
            tbl.integer('id', 255).primary();
            tbl.string('username', 255)
            .notNullable()
            .unique();
            tbl.string('password', 255)
            .notNullable();
        })

        //recipes
        .createTable('recipes', tbl => {
            tbl.integer('id', 255)
            .primary();
            tbl.integer('user_id', 255)
            .notNullable()
            .references('users.id')
            tbl.string('recipeName', 255)
            .notNullable()
            .unique();
            tbl.text('description');
            tbl.text('imageURL')
            tbl.string('prepTime')
            tbl.string('cookTime')
            tbl.integer('yields')
        })
        //steps
        .createTable('steps', tbl => {
            tbl.integer('id', 255)
            .primary();
            tbl.integer('recipe_id', 255)
            .references('recipes.id')
            tbl.integer('stepNum', 255)
            .unique()
            .notNullable();
            tbl.text('stepInstruction')
            .notNullable();
        })
    
        //ingredients
        .createTable('ingredients', tbl => {
            tbl.integer('id', 255)
            .primary();
            tbl.string('ingredientName', 255)
            .unique()
            .notNullable();
        })

        //foreign key
        .createTable('recipe_ingredients', tbl => {
            tbl.integer('id', 255).primary();
            //recipeId
            tbl.integer('recipe_id', 255)
            .notNullable()
            .references('recipes.id')
            .onDelete('RESTRICT')
            .onUpdate('CASCADE');
            //ingredientId
            tbl.integer('ingredient_id')
            .notNullable()
            .references('ingredients.id')
            .onDelete('RESTRICT')
            .onUpdate('CASCADE');

            tbl.string('amount', 255)
            .notNullable()
        })
    )
};

exports.down = function(knex) {
  return knex.schema
  .dropTableIfExists('recipe_ingredients')
  .dropTableIfExists('ingredients')
  .dropTableIfExists('steps')
  .dropTableIfExists('recipes')
  .dropTableIfExists('users')
};
