const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const fs = require('fs');
const path = require('path');
const app = express();
app.use(express.static('.'));

// Set up EJS for templating
app.set('view engine', 'ejs');

// Set up body-parser to parse form data
app.use(bodyParser.urlencoded({ extended: true }));

// Set up sessions
app.use(session({
  secret: 'secret-key',
  resave: false,
  saveUninitialized: true
}));

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

// GET request for the home page
app.get('/', (req, res) => {
  res.render('index');
});

// POST request for the form data
app.post('/submit-form', (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  // Do something with the username and password
  // For now, just log them
  console.log(`Username: ${username}, Password: ${password}`);
  res.redirect('/');
});

// AJAX request for JSON data
app.get('/data', (req, res) => {
  fs.readFile('data.json', 'utf8', (err, data) => {
    if (err) {
      res.status(500).send('Error reading data');
    } else {
      res.json(JSON.parse(data));
    }
  });
});

// Login endpoint
app.post('/login', (req, res) => {
  // In a real app, you'd validate the input and check it against a database
  req.session.user = req.body.username;
  res.redirect('/');
});

// Logout endpoint
app.get('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/');
});

// 404 page
app.use((req, res) => {
  res.status(404).render('404');
});

app.listen(3000, () => console.log('Server is running on port 3000'));
