const express          = require("express");
const path             = require("path");
const bodyParser       = require("body-parser");
const session          = require('express-session');
const passport         = require('passport');
const guiManager       = require('./guiManager');
const securityManager  = require('./securityManager');
const { updateUserPassword } = require('./users');

require('dotenv').config();

var app    = express();

app.listen(3000,function(){
  console.log("Server is running http://localhost:3000");
});

securityManager.initializePassport(passport);
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname,'./')));
app.use(session({ secret: 'mySecret', resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname,guiManager.renderHtmlHomePage()));
});

app.get('/userLogin', (req, res) => {
  res.sendFile(path.join(__dirname,guiManager.renderHtmlAuthenticationPage()));
});

app.post('/userLogin',
  passport.authenticate('local', { failureRedirect: '/userLogin', successRedirect: '/loginSuccess', failureFlash: false }),
);

// Gmail/Google OAuth 2.0 Routes
app.get('/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

app.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/userLogin' }),
  (req, res) => {
    // If user has no password, ask them to set one
    if (!req.user.password) {
      res.redirect('/setPassword');
    } else {
      res.redirect('/loginSuccess');
    }
  }
);

app.get('/setPassword', (req, res) => {
  if (!req.user) return res.redirect('/userLogin');
  res.sendFile(path.join(__dirname, 'setPasswordPage.html'));
});

app.post('/setPassword', (req, res) => {
  if (!req.user) return res.redirect('/userLogin');
  
  const { password, confirmPassword } = req.body;
  
  if (password !== confirmPassword) {
    return res.send('Passwords do not match!');
  }
  
  updateUserPassword(req.user.id, password);
  res.redirect('/loginSuccess');
});

app.get('/loginSuccess', (req, res) => {
  res.sendFile(path.join(__dirname, guiManager.renderHtmlMainPage()));
});

// TODO Routes
app.post('/addTodoRequest', (req, res) => {
  if (!req.user) return res.redirect('/userLogin');
  // Render add todo form
  const responseHtml = `<!DOCTYPE html>
    <style>
      body {background-color: silver;}
      .button {
        background-color: green;
        border: none;
        color: beige;
        padding: 8px 38px;
        cursor: pointer;
      }
    </style>
    <h2>Add New Todo</h2>
    <form method="post" action="/saveTodoRequest">
      <input type="text" name="todo" placeholder="Enter your todo" required>
      <button class="button" type="submit">Add Todo</button>
      <button class="button" type="submit" formaction="/todoListRequest">Cancel</button>
    </form>`;
  res.send(responseHtml);
});

app.get('/todoListRequest', (req, res) => {
  if (!req.user) return res.redirect('/userLogin');
  const todos = req.session.todos || [];
  const htmlContent = guiManager.renderHtmlTodoListPage(todos);
  res.send(htmlContent);
});

app.post('/todoListRequest', (req, res) => {
  if (!req.user) return res.redirect('/userLogin');
  const todos = req.session.todos || [];
  const htmlContent = guiManager.renderHtmlTodoListPage(todos);
  res.send(htmlContent);
});

app.post('/saveTodoRequest', (req, res) => {
  if (!req.user) return res.redirect('/userLogin');
  if (!req.session.todos) req.session.todos = [];
  req.session.todos.push(req.body.todo);
  res.redirect('/todoListRequest');
});

app.post('/cancelRequest', (req, res) => {
  res.redirect('/loginSuccess');
});

app.post('/userLogout', (req, res) => {
  req.logout((err) => {
    if (err) return next(err);
    res.redirect('/');
  });
});

app.post('/userAbout', (req, res) => {
  res.send(guiManager.renderHtmlAboutPage());
});

app.post('/userRegister', (req, res) => {
  res.send(guiManager.renderHtmlRegistrationPage());
});

app.get('/userCancel', (req, res) => {
  res.redirect('/');
});

app.post('/userCancel', function(req,res){
  res.sendFile(path.join(__dirname,guiManager.renderHtmlHomePage()));
});





