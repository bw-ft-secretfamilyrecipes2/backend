exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('ingredients').insert([
        {
          id: 1,
          ingredientName: 'pork'
        },
        {
          id: 2,
          ingredientName: 'mushrooms'
        },
        {
          id: 3,
          ingredientName: 'corn starch'
        },
        {
          id: 4,
          ingredientName: 'dough'
        },
        {
          id: 5,
          ingredientName: 'bok choy plant'
        }
      ]);
    };
