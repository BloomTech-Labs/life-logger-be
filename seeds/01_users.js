
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {id: 1, username: 'test1', password: 'test', email: 'test1@test.net' },
        {id: 2, username: 'test2', password: 'test', email: 'test2@test.net' },
        {id: 3, username: 'test3', password: 'test', email: 'test3@test.net' }
      ]);
    });
};
