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
app.use(express.static(path.join(__dirname, 'views')));

// GET request for the home page
app.get('/', (req, res) => {
  res.render('index');
});

// GET request for the form data
app.get('/submit-form', (req, res) => {
  res.send('This is an example of GET request.');
});

// POST request for the form data
app.post('/submit-form', (req, res) => {
  const email = req.body.email;
  console.log(`Email: ${email}`); 
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
app.get('/login', (req, res) => {
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
