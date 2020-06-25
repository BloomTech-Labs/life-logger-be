exports.seed = function (knex) {
  return knex('categories').insert([
    {
      name: 'Work',
      user_id: 1,
    },
    {
      name: 'Home',
      user_id: 1,
    },
    {
      name: 'Home',
      user_id: 2,
    },
  ]);
};
