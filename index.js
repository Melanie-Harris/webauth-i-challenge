const server = require('./api/server.js');



const Port = process.env.PORT || 2020;
server.listen(Port, () => console.log(`Listening on port ${Port} `));