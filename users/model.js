const knex = require('knex');
const knexConfig = require('../knexfile.js');

const db = knex(knexConfig.development)

module.exports = {
    add,
    findBy,
    find
} 

function find() {
    return db("users");
}

function findBy(body){
    return db('users').where(body)
}

function add(users){
return db('users')
.insert(users)
.then(ids => ({
    id:ids[0]
}))
}