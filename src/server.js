require('dotenv').config();
const app = require('./app');
const { db } = require('./database/config');

// database conf.

db.authenticate()
  .then(() => console.log('Database authenticated...♾️ 🟢'))
  .catch((err) => console.log('Error connecting to the Database:🔴 ', err));

db.sync()
  .then(() => console.log('Database synchronized...♾️ 🟢'))
  .catch((err) => console.log('Error synchronizing to the Database:🔴 ', err));

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}... 🤖👍🏼`);
});
