const request = require('request');
const config = require('../config.js');

let getInjuryData = (team, callback) => {
   let options = {
    url: "https://api.mysportsfeeds.com/v1.2/pull/nba/2017-playoff/player_injuries.json",
    headers: {
      Authorization: `Basic ${config.credentials}`
    },
    //temporary team fillers
    qs :  {team: team}

  }

  request(options, function(err, res, body) {
    if (err) {
      console.error(err);
    }
    callback(body);
  })

}

module.exports.getInjuryData = getInjuryData;