exports.seed = function (knex) {
  return knex('tasks').insert([
    {
      user_id: 1,
      task_id: 1,
      task_notes: 'Testing the test.',
      category_id: 1,
      due_date: '2020-02-29 19:10:25-07',
      all_day: true,
      is_complete: false,
    },
    {
      user_id: 2,
      task_id: 2,
      task_notes: 'Testing the test.',
      category_id: 2,
      due_date: '2020-03-22 01:10:25-07',
      all_day: true,
      is_complete: false,
    },
    {
      user_id: 2,
      task_id: 3,
      task_notes: 'Testing the test.',
      category_id: 3,
      due_date: '2020-04-22 15:10:25-07',
      all_day: false,
      is_complete: false,
    },
  ]);
};
