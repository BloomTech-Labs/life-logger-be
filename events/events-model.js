const db = require('../data/dbConfig.js');

module.exports = {
    find,
    findBy,
    findById,
    add,
    update,
    remove
}


function find() {
    return db('events');
}

function findBy(filter) {
    return db('events').where(filter)
}

function findById(event_id) {
    return db('events').where({event_id}).first();
    }

    function add(event) {
        return db('events').insert(event)
        .then(ids => {
             return findById(ids[0])
        })
    }

    function update(event_id, changes) {
        return db('events').where({event_id}).update(changes)
        .then(count => {
            return findById(event_id)
        })
    }
    
    function remove(event_id) {
        return db('events').where({event_id}).del()
    }