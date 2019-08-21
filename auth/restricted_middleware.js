const bcrypt = require('bcryptjs');

const users = require('../users/user-model.js');

//protection
module.exports= (req, res, next) => {
    // we'll read the username and password from headers
    // the client is responsible for setting those headers
  
    // no point on querying the database if the headers are not present
    if (req.session && req.session.user) {
        next();
    } else {
        res.status(401).json({ message: 'Access denied! Valid login must be provided first.' });
    }
}

