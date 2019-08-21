
const router = require('express').Router();
const users = require('./user-model.js');


const restricted = require('../auth/restricted_middleware.js')


router.get('/', restricted, (req, res) => {
    users.find()
        .then(users => {
            res.status(200).json(users)
        })
        .catch(err => {
            res.status(400).json({ message: 'sorry could not retrieve users' })
        })
})



module.exports = router;
