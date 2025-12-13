const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const { findUser, findOrCreateUser } = require('./users');

function initializePassport(passport) {
  // Gmail/Google OAuth 2.0 Strategy - Always register
  if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET) {
    passport.use(new GoogleStrategy({
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:3000/auth/google/callback"
    },
    (accessToken, refreshToken, profile, done) => {
      const user = findOrCreateUser({
        id: profile.id,
        email: profile.emails[0].value,
        displayName: profile.displayName,
        googleId: profile.id
      });
      return done(null, user);
    }));
  } else {
    console.error('❌ ERROR: Google OAuth credentials missing in .env file!');
    process.exit(1);
  }

  // Keep Local Strategy as fallback
  passport.use(new LocalStrategy((username, password, done) => {
    const user = findUser(username);
    if (!user) {
      return done(null, false, { message: 'Incorrect username.' });
    }
    if (user.password !== password) {
      return done(null, false, { message: 'Incorrect password.' });
    }
    return done(null, user);
  }));

  // Serialize/Deserialize user
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });
  
  passport.deserializeUser((id, done) => {
    const user = findUserById(id);
    done(null, user);
  });
}

function findUserById(id) {
  const { users } = require('./users');
  return users.find(user => user.id === id);
}

function isAuthorizedUser(login) {
  const authorizedUsers = ["sud", "smart", "sesnum", "data", "aseds", "amoa"];
  if (authorizedUsers.includes(login))
    return true;
  return false;
}

module.exports = { isAuthorizedUser, initializePassport };