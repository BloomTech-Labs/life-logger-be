require('dotenv').config();

const server = require('./api/server.js');

const port = process.env.PORT || 4321;
server.listen(port, () => console.log(`\n** server up on port ${port} **\n`));
