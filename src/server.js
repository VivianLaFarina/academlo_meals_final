require('dotenv').config();
const app = require('./app');
const { db } = require('./database/config');
const initModel = require('./models/initModel');

// Connect to the database
db.authenticate()
  .then(() => console.log('Database authenticated...♾️ 🟢')) // Connection successful
  .catch((err) => console.log('Error connecting to the Database:🔴 ', err)); // Connection failed

// Initialize the database models and relationships
initModel();

// Synchronize the database
db.sync()
  .then(() => console.log('Database synchronized...♾️ 🟢')) // Synchronization successful
  .catch((err) => console.log('Error synchronizing to the Database:🔴 ', err)); // Synchronization failed

// Start the server and listen on the specified port
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}... 🤖👍🏼`);
});
