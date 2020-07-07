exports.seed = function (knex) {
  return knex('task_names').insert([
    {
      name: 'Change AC air filter',
      user_id: 1,
    },
    {
      name: 'Change fire alarm batteries',
      user_id: 1,
    },
    {
      name: 'Change fire alarm batteries',
      user_id: 2,
    },
  ]);
};
