const path = require('path');
const express = require('express');
const session = require('express-session');
const escapeHtml = require('escape-html');
const expressLayouts = require('express-ejs-layouts');

const app = express();
const PORT = 4000;

//session middleware
app.use(session({
    secret: "8H2SAZ3jMw8GIN3kVgDx4V7boRXx1XIpbaJ7HnDmxU",
    saveUninitialized: false,
    cookie: { secure: 'auto' },
    resave: false
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(expressLayouts);
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.set('layout', path.join(__dirname, 'views', 'layouts', 'layout'));

//username and password
const myusername = 'user1'
const mypassword = 'mypassword'

// middleware to test if authenticated
function isAuthenticated (req, res, next) {
  if (req.session.user) {
    next();
  }
  else {
    next('route');
  }
}

app.get('/', isAuthenticated, function (req, res) {
  console.log('Start authenticated route');
  console.log(req.session);
  console.log("End authenticated route\n------------------------\n\n");

  res.render('index-authenticated', {
    title: 'Authenticated', username: req.session.user.username,
    loggedIn: true
  });
});

app.get('/', function (req, res) {
  console.log('Start public route');
  console.log(req.session);
  console.log("End public route\n------------------------\n\n");

  res.render('index', { title: 'Login', loggedIn: false });
})

app.post('/login', express.urlencoded({ extended: false }), function (req, res) {
  console.log('Start login route');
  console.log('Session before login:');
  console.log(req.session);

  if(req.body.username == myusername && req.body.password == mypassword) {
      req.session.user = {
        username: req.body.username
      };

      console.log('Session after login:');
      console.log(req.session);
      req.session.save(function (err) {
        console.log("End login route\n------------------------\n\n");
        if (err) return next(err)
        res.redirect('/')
      })
  }
  else{
      res.send('Invalid username or password');
  }
});

app.get('/logout', function (req, res, next) {
  req.session.user = null
  req.session.destroy();
  console.log("Logging out...redirecting to /");

  res.redirect('/');
});

app.listen(PORT, () => console.log(`Server Running at port ${PORT}`));
