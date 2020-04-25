
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('recipes').insert([
        {
          id: 1,
          user_id: 1,
          recipeName: 'shumai',
          description: 'tastes good',
          imageURL: 'test',
          prepTime: '30 minutes',
          cookTime: '1 hour',
          yields: '4 people'
        }
      ]);
    };
