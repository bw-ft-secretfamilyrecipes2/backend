exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('steps').insert([
        {
          id: 1,
          recipe_id: 1,
          stepNum: 1,
          stepInstruction: 'prep the shumai'
        },
        {
          id: 2,
          recipe_id: 1,
          stepNum: 2,
          stepInstruction: 'cook the shumai'
        }
      ]);
    };
