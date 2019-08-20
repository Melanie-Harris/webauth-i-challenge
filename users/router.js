const express = require('express');
const db = require('./model.js');

const bcrypt = require('bcryptjs')
const router = express.Router();

router.post('/registration', (req, res)=>{
    const creds = req.body
    const hash = bcrypt.hashSync(creds.password, 20) 
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