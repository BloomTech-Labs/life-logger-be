const server = require('./api/server.js');

<<<<<<< HEAD
const PORT = process.env.PORT || 8000;
server.listen(PORT, () => console.log(`\n*** Server running on PORT ${PORT} ***\n`));
=======
const PORT = process.env.PORT || 5000;
server.listen(PORT, () =>
  console.log(`\n*** Server running on PORT ${PORT} ***\n`)
);
>>>>>>> 7195c588e860c56c99e89f47c9a915cd9ed7dc48
