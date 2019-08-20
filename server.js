const express = require('express');
const helmet = require('helmet')

const server = express();

server.use(helmet());
server.use(express.json());
server.use(cors());


const port = process.env.PORT || 2000;
server.listen(port, () => console.log(`Listening on port ${port} `));