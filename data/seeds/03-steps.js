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
        },
        {
          id: 3,
          recipe_id: 2,
          stepNum: 1,
          stepInstruction: 'bake it'
        },
        {
          id: 4,
          recipe_id: 2,
          stepNum: 2,
          stepInstruction: 'eat it'
        },
        {
          id: 5,
          recipe_id: 3,
          stepNum: 1,
          stepInstruction: 'steam the plants'
        }
      ]);
    };
