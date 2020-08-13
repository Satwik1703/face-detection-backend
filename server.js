const express = require('express');
const cors = require('cors');

const db = require('./db.js');

const register = require('./controllers/register');
const signIn = require('./controllers/signIn');
const image = require('./controllers/image');
const signOut = require('./controllers/signout');

const app = express();

app.use(cors({origin:'http://localhost:3000', credentials: true}));
app.use(express.json());

db();

app.get('/', (req, res) => { res.send('Server is working') });

app.post('/register', (req, res) => { register.handleRegister(req, res) });
app.post('/signin', (req, res) => { signIn.handleSignIn(req, res) });
app.get('/signin/token', (req, res) => { signIn.handleSignInToken(req, res) });
app.put('/image', (req, res) => { image.handleImage(req, res) });
app.put('/signout', (req, res) => { signOut.handleSignOut(req, res) });

var PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`App is running on PORT ${PORT}`));
