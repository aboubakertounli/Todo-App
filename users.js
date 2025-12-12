const fs = require('fs');
const path = require('path');

// Load users from file (persistent storage)
let users = [];
const usersFile = path.join(__dirname, 'users.json');

function loadUsers() {
  try {
    if (fs.existsSync(usersFile)) {
      const data = fs.readFileSync(usersFile, 'utf-8');
      users = JSON.parse(data);
    }
  } catch (err) {
    console.error('Error loading users:', err);
  }
}

function saveUsers() {
  try {
    fs.writeFileSync(usersFile, JSON.stringify(users, null, 2));
  } catch (err) {
    console.error('Error saving users:', err);
  }
}

// Load users on startup
loadUsers();

function findUser(username) {
  return users.find(user => user.username === username || user.email === username);
}

function findOrCreateUser(profile) {
  let user = users.find(user => user.googleId === profile.id);
  
  if (user) {
    console.log('✅ User exists:', user);
    return user;
  }
  
  const newUser = {
    id: users.length + 1,
    username: profile.displayName || profile.email.split('@')[0],
    email: profile.email,
    googleId: profile.id,
    displayName: profile.displayName,
    password: null
  };
  
  users.push(newUser);
  saveUsers();
  console.log('✅ New user created:', newUser);
  return newUser;
}

function updateUserPassword(userId, password) {
  const user = users.find(u => u.id === userId);
  if (user) {
    user.password = password;
    saveUsers();
    console.log('✅ Password set for user:', user.username);
  }
}

module.exports = { findUser, findOrCreateUser, updateUserPassword, users, loadUsers };
