const express = require('express');
const cors = require('cors');

const db = require('./db.js');

const register = require('./controllers/register');
const signIn = require('./controllers/signIn');
const image = require('./controllers/image');
const signOut = require('./controllers/signout');

const app = express();
// app.use(cors({origin:'https://satwik-face-detection.herokuapp.com', credentials: true}));
// app.use(cors({origin:'http://localhost:3000', credentials: true}));
app.use(express.json());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "https://satwik-face-detection.herokuapp.com");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Credentials", "true");
  next();
});

db();

app.post('/', (req, res, next) => {
  console.log('ne bareee '+ req.body.password);
  res.status(500).json('Server is working') });

app.post('/register', (req, res, next) => { register.handleRegister(req, res) });
app.post('/signin', (req, res, next) => { signIn.handleSignIn(req, res) });
app.get('/signin/token', (req, res, next) => { signIn.handleSignInToken(req, res) });
app.post('/image', (req, res, next) => { image.handleImage(req, res) });
app.post('/signout', (req, res, next) => { signOut.handleSignOut(req, res) });

var PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`App is running on PORT ${PORT}`));
