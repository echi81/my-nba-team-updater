const request = require('request');
const config = require('../config.js');

let getInjuryData = (teams, callback) => {
   let options = {
    url: "https://api.mysportsfeeds.com/v1.2/pull/nba/2017-playoff/player_injuries.json",
    headers: {
      Authorization: `Basic ${config.credentials}`
    },
    //temporary team fillers
    qs :  {team: 'houston-rockets', team: 'cleveland-cavaliers'}

  }

  request(options, function(err, res, body) {
    if (err) {
      console.error(err);
    }
    callback(body);
  })

}

module.exports.getInjuryData = getInjuryData;