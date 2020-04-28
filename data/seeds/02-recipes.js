
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('recipes').insert([
        {
          id: 1,
          user_id: 1,
          recipeName: 'Shumai',
          description: 'Tastes good',
          imageURL: 'https://tasteasianfood.com/wp-content/uploads/2017/01/sm8-feature-480x270.jpg',
          prepTime: '20 minutes',
          cookTime: '1 hour',
          yields: '4 people'
        },
        {
          id: 2,
          user_id: 1,
          recipeName: 'Gai Mei Bao',
          description: 'Sweet',
          imageURL: 'https://i.pinimg.com/originals/92/29/d4/9229d49e5e660de9b9da3a1b362e2859.jpg',
          prepTime: '30 minutes',
          cookTime: '1 hour',
          yields: '5 people'
        },
        {
          id: 3,
          user_id: 1,
          recipeName: 'Bok Choy',
          description: 'Plant dish',
          imageURL: 'https://theforkedspoon.com/wp-content/uploads/2019/01/bok-choy-4-500x500.jpg',
          prepTime: '10 minutes',
          cookTime: '1 hour',
          yields: '10 people'
        }
      ]);
    };
