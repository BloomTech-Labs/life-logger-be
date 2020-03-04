const db = require('../data/dbConfig.js');


module.exports= {
    insert, 
    findBy, 
    findByUsername,
    find
}



function findBy(where){
    return db('users')
    .where(where)
}

function insert(user){
    return db('users')
    .insert(user, 'id')
    .then(([id])=> id);
};

function findByUsername(username){
    return findBy({ username })
    .first()

};

function find(){
    return db('users');
}
