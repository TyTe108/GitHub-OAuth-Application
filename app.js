/* 
 * Package Imports
*/
const passport = require('passport');
const GitHubStrategy = require('passport-github2').Strategy;
const session = require("express-session");


const path = require("path");
require("dotenv").config();
const express = require('express');
const partials = require('express-partials');


const app = express();


/*
 * Variable Declarations
*/

const PORT = 3000;
const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID;
const GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET;


/*
 * Passport Configurations
*/
passport.use(
  new GitHubStrategy(
    {
      clientID: '76b22421e5f6438d625f',
      clientSecret: '78f0e3c5c3839f40e8596a4a60d036d4879f66da',
      callbackURL: 'http://localhost:3000/auth/github/callback'
    },
    (accessToken, refreshToken, profile, done)=>{
      return done(null, profile);
    }
  )
);

passport.serializeUser((user, done)=>{
  done(null, user);
});


passport.deserializeUser((user, done) => {
  done(null, user);
});

/*
 *  Express Project Setup
*/

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(partials());
app.use(express.json());
app.use(express.static(__dirname + '/public'));
app.use(
  session({ secret: "codecademy", resave: false, saveUninitialized: false })
);
app.use(passport.initialize());
app.use(passport.session());



/*
 * Routes
*/
app.get('/', (req, res) => {
  res.render('index', { user: req.user });
})

app.get('/account', ensureAuthenticated,  (req, res) => {
  res.render('account', { user: req.user });
});

app.get('/login', (req, res) => {
  res.render('login', { user: req.user });
})

app.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

app.get('/auth/github', passport.authenticate('github', {scope: ['user']}));

app.get('/auth/github/callback', 
passport.authenticate('github', 
  {failureRedirect: '/login',
  successRedirect: '/'})
);

/*
 * Listener
*/

app.listen(PORT, () => console.log(`Listening on ${PORT}`));

/*
 * ensureAuthenticated Callback Function
*/
function ensureAuthenticated(req, res, next) {
  // Check if the request is authenticated
  if (req.isAuthenticated()) {
    return next(); // User is authenticated, continue to the next middleware
  } else {
    // User is not authenticated, redirect to the login page
    res.redirect('/login');
  }
}