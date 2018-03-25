const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const helper = require('../helpers/getinjurydata.js');

app.use(express.static(__dirname + '/../client/dist'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


app.get('/myteams', function (req, res) {
  helper.getInjuryData(null, function(data) {
    res.send(data);
  })
})

app.listen(1128, function () {
  console.log('listening on port 1128')
});

