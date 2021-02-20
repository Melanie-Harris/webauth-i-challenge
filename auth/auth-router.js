const router = require('express').Router();
const bcrypt = require('bcryptjs')

const users = require('../users/user-model.js');

// for endpoints beginning with /api/auth
// the register, login, logout


router.post('/reg', (req, res) => {
    const user = req.body
    const hash = bcrypt.hashSync(user.password, 14)
    user.password = hash
    return users.add(user)
        .then(created => {
            res.status(201).json(created)
        }).catch(error => {
            res.status(500).json({ message: 'failed to add user' })
        })
})

router.post('/login', (req, res) => {
    let { password, username } = req.body
    users.findBy({ username })
        .first()//takes first item out of object
        //passing it the password guess in plain text and the password hash obtained from the database to validate credentials.
        //If the password guess is valid, the method returns true, otherwise it returns false.The library will hash the password guess first and then compare the hashes
        .then(user => {
            if (user && bcrypt.compareSync(password, user.password)) {
                req.session.user=user; //saving info about user in session, save it then send cookies with that user
                req.session.user = true; // makes if statement in middleware true
                res.status(200).json({ message: `Hello ${user.username}, You've successfully logged in` })
            } else {
                res.status(401).json({ message: 'invalid login info, try again.' })
            }
        }).catch(error => {
            res.status(500).json({ message: 'Hey backend, you messed up, login failed' })
        })
})

// Added logout functionality for completeness of project

router.get('/logout', (req, res) => {
    if (req.session) {
        req.session.destroy(err => {
            if (err) {
                res.send('error logging out');
            } else {
                res.send('Good bye! You are now logged out');
            }
        });
    } else{
        res.status(200).json({message: 'this was all a dream to begin with'})
    }
});


module.exports = router;

// router.get('/', (req, res) => {
//     req.session.name = 'Melanie';
//     res.send('got it, thanks');
// });

// router.get('/greet', (req, res) => {
//     const name = req.session.name;
//     res.send(`hello ${req.session.name}`);
// });

