exports.seed = function(knex) {
  return knex('events').insert([
    {
      user_id: 1,
      title: 'Event 1',
      event_text: 'Testing the test.',
      location: 'Home',
      category: 1,
      event_ct_tm: '2020-02-29 19:10:25-07',
      event_st_tm: '2020-02-29 19:10:25-07',
      event_et_tm: '2020-02-29 19:10:25-07',
      all_day: true,
      event_resource: 'test',
      iscomplete: false
    },
    {
      user_id: 2,
      title: 'Event 2',
      event_text: 'Testing the test.',
      location: 'Work',
      category: 2,
      event_ct_tm: '2020-03-22 01:10:25-07',
      event_st_tm: '2020-02-29 19:10:25-07',
      event_et_tm: '2020-02-29 19:10:25-07',
      all_day: true,
      event_resource: 'test',
      iscomplete: false
    },
    {
      user_id: 3,
      title: 'Event 3',
      event_text: 'Testing the test.',
      location: 'School',
      category: 3,
      event_ct_tm: '2020-04-22 15:10:25-07',
      event_st_tm: '2020-02-29 19:10:25-07',
      event_et_tm: '2020-02-29 19:10:25-07',
      all_day: false,
      event_resource: 'test',
      iscomplete: false
    }
  ]);
};
