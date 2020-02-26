const db = require('../data/dbConfig.js');

module.exports = {
    find,
    findById,
    add,
    update,
    remove
}


function find() {
    return db('users');
}

function findById(id) {
    return db('users').where({id}).first();
    }

    function add(user) {
        return db('users').insert(user)
        .then(ids => {
             return findById(ids[0])
        })
    }

    function update(changes,id) {
        return db('users').where({id}).update(changes)
        .then(count => {
            return findById(id)
        })
    }
    
    function remove(id) {
        return db('users').where({id}).del()
    }