
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        { username: 'test1', password: 'test', email: 'test1@test.net' },
        { username: 'test2', password: 'test', email: 'test2@test.net' },
        { username: 'test3', password: 'test', email: 'test3@test.net' }
      ]);
    });
};
