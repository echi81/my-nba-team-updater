const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const helper = require('../helpers/getinjurydata.js');

app.get('/myteams', function (req, res) {
  helper.getInjuryData(null, function(data) {
    res.send(data);
  })
})

app.listen(1128, function () {
  console.log('listening on port 1128')
});

