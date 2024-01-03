const express = require('express');
const app = express();
const path = require('path');
const port = 3000;

// Set EJS as the template engine
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname,"/public")))

// Define routes
app.get('/', (req, res) => {
  // Render home.ejs for the home page
  res.render('home');
});

app.get('/register', (req, res) => {
  // Render registration.ejs for the registration page
  res.render('registration');
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
