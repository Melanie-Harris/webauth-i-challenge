const express = require('express');
const db = require('./model.js');

const bcrypt = require('bcryptjs')
const router = express.Router();


router.get('/users', restricted, (req, res) => {
    db.find()
        .then(users => {
            res.status(200).json(users)
        })
        .catch(err => {
            res.status(400).json({ message: 'sorry could not retrieve users' })
        })
})


router.post('/reg', (req, res)=>{
    const creds = req.body
    const hash = bcrypt.hashSync(creds.password, 14) 
    creds.password = hash
    return db.add(creds)
    .then(user=>{
        res.status(201).json(user)
    }).catch(error=>{
        res.status(500).json({message: 'failed to add user'})
    })
})

router.post('/login', (req, res)=>{
    let { password, username} = req.body

    db.findBy({username})
    .first()//takes first item out of object
    //passing it the password guess in plain text and the password hash obtained from the database to validate credentials.
    //If the password guess is valid, the method returns true, otherwise it returns false.The library will hash the password guess first and then compare the hashes
    .then(user =>{
        if (user && bcrypt.compareSync(password, user.password)){
            res.status(200).json({message: `Hello ${user.username}`})
        } else{
            res.status(401).json({message: 'invalid login info'})
        }
    }).catch(error=>{
        res.status(500).json({message: 'you messed up, login failed'})
    })
})

//protection
function restricted(req, res, next) {
    // we'll read the username and password from headers
    // the client is responsible for setting those headers
    const { username, password } = req.headers;

    // no point on querying the database if the headers are not present
    if (username && password) {
        Users.findBy({ username })
            .first()
            .then(user => {
                if (user && bcrypt.compareSync(password, user.password)) {
                    next();
                } else {
                    res.status(401).json({ message: 'Invalid Credentials' });
                }
            })
            .catch(error => {
                res.status(500).json({ message: 'Unexpected error' });
            });
    } else {
        res.status(400).json({ message: 'No credentials provided' });
    }
}

module.exports= router;