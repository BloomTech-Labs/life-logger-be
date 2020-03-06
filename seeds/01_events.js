


exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('events').del()
    .then(function () {
      // Inserts seed entries
      return knex('events').insert([
        {id: 1, User_ID: 1,Title:'Event 1',Event_Text: 'Testing the test.', location: 'Home', Category: 1, Event_Ct_Tm: '2020-02-29 19:10:25-07',Event_St_Tm: '2020-02-29 19:10:25-07',Event_Et_Tm:'2020-02-29 19:10:25-07'},
        {id: 2, User_ID: 2,Title:'Event 2',Event_Text: 'Testing the test.', location: 'Work', Category: 2, Event_Ct_Tm: '2020-03-22 01:10:25-07',Event_St_Tm: '2020-02-29 19:10:25-07',Event_Et_Tm:'2020-02-29 19:10:25-07'},
        {id: 3, User_ID: 3,Title:'Event 3',Event_Text: 'Testing the test.', location: 'School', Category: 3, Event_Ct_Tm: '2020-04-22 15:10:25-07',Event_St_Tm: '2020-02-29 19:10:25-07',Event_Et_Tm:'2020-02-29 19:10:25-07'}
        
      ]);
    });
};