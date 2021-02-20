const knex = require('knex');
const knexConfig = require('../knexfile.js');

const db = knex(knexConfig.development)

module.exports = {
    find,
    findBy,
    add
} 

function find() {
    return db("users").select('id', 'username')
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