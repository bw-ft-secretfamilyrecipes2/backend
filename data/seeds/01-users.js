exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').insert([
        {
          // id: 1,
          username: 'test',
          password: 'test'
        }
      ]);
    };
