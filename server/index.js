const express = require('express');
const bodyParser = require('body-parser');
const helper = require('../helpers/getinjurydata.js');
const User = require('./models/User.js');
const session = require('express-session');
const mongoose = require('mongoose');
const MongoStore = require('connect-mongo')(session);
const app = express();

mongoose.connect('mongodb://localhost/test');

//CORS handling
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(express.static(__dirname + '/../client/dist'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(session({
  secret: 'nbateam',
  cookie: {maxAge: 60000},
  resave: false,
  saveUninitialized: false,
  store: new MongoStore({ mongooseConnection: mongoose.connection })
}));

app.post('/signup', function (req, res) {

  const { body } = req;
  let {
    email,
    password,
  } = body;



  if (!email) {
    return res.send('Error: email cannot be blank')
  }

  if (!password) {
    return res.send('Error: password cannot be blank')
  }

  email = email.toLowerCase();

  User.find({
    email: email
  }, (err, previousUsers) => {
    if (err) {
      console.error('user search error', err)
    }
    else if (previousUsers.length > 0) {

      res.send('user already exists');

    } else if (previousUsers.length === 0) {

        const newUser = new User();
        console.log(newUser);
        newUser.email = email;
        newUser.password = newUser.generateHash(password);
        newUser.save((err, user) => {
          if (err) {
            console.error('save error', err)
            }

          //have client redirect to /login upon successful post request
          res.redirect('/myteams');


        })
    }
  })
});

app.post('/login', function (req, res) {

  let {body} = req;
  let {password, email} = body;

   if (!email) {
    return res.send('Error: email cannot be blank')
  }

  if (!password) {
    return res.send('Error: password cannot be blank')
  }


   User.find( {email: email}, (err, user) => {

    if (err) {
      console.error('user search error', err)
    }

    else if ( !user ) {
      res.send('email does not exist');
    }

    else {
      console.log(user);
      if (user[0].validatePassword(password)) {
        req.session.authenticated = true;
        res.redirect('/myteams')
      } else {
        res.send('invalid password');
      }
    }
   });
});

app.post('/logout', function (req, res) {
  req.session.destroy(function(err) {
    if (err) {
      console.error(err);
    } else {
      res.redirect('/');
    }
  })
});

app.get('/', function (req, res) {
  res.redirect('/myteams');
});

app.get('/myteams', function (req, res) {
  res.end();
})
app.post('/myteams', function (req, res) {

      const {body} = req;
      let {team} = body;
      helper.getInjuryData(team, function(data) {
      res.send(data);
      })

});

app.listen(1128, function () {
  console.log('listening on port 1128')
});
