const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const request = require('request');
const config = require('../config.js');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
//
app.get('/myteams', function (req, res) {

  let options = {
    url: "https://api.mysportsfeeds.com/v1.2/pull/nba/2017-playoff/player_injuries.json",
    headers: {
      Authorization: `Basic ${config.credentials}`
    },
    //temporary team fillers
    qs : {team: 'houston-rockets', team: 'cleveland-cavaliers'}
  }

  //https://api.mysportsfeeds.com/v1.2/pull/nba/current/player_injuries.json
  //parameters team=teams?

  request(options, function(err, res, body) {
    if (err) {
      console.error(err);
    }

  })


})

app.listen(8000, function () {
  console.log('listening on port 8000')
});

