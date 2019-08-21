const bcrypt = require('bcryptjs');

const users = require('../users/user-model.js');

//protection
module.exports= (req, res, next) => {
    // we'll read the username and password from headers
    // the client is responsible for setting those headers
    const { username, password } = req.headers;

    // no point on querying the database if the headers are not present
    if (username && password) {
        users.findBy({ username })
            .first()
            .then(user => {
                if (user && bcrypt.compareSync(password, user.password)) {
                    next();
                } else {
                    res.status(401).json({ message: 'Invalid  credentials, please try again' });
                }
            })
            .catch(error => {
                res.status(500).json({ message: 'Unexpected error' });
            });
    } else {
        res.status(400).json({ message: 'Access denied! Valid login must be provided first.' });
    }
}

