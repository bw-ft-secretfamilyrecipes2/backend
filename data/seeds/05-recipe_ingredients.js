exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('recipe_ingredients').insert([
        {
          id: 1,
          recipe_id: 1,
          ingredient_id: 1,
          amount: '2 lbs.'
        },
        {
          id: 2,
          recipe_id: 1,
          ingredient_id: 2,
          amount: '1 lbs.'
        },
        {
          id: 3,
          recipe_id: 1,
          ingredient_id: 3,
          amount: '20 gallons'
        },
        {
          id: 4,
          recipe_id: 2,
          ingredient_id: 4,
          amount: '1/2 lbs.'
        },
        {
          id: 5,
          recipe_id: 3,
          ingredient_id: 5,
          amount: '20'
        }

      ]);
    };
