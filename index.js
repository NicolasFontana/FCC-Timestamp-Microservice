// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();
require('dotenv').config()

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204
const PORT = process.env.PORT || 8000

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint...
app.get("/api", function (req, res) {
  const dateNow = new Date()
  res.json({unix: dateNow.getTime(), utc: dateNow.toGMTString()})
});

app.get("/api/:date", (req, res) => {
  const timestamp = req.params.date
  if (/\d{5,}/.test(timestamp)) {
    const date = new Date(Number(timestamp))
    if(date == "Invalid Date") {
      res.json({ error: "Invalid Date" })
    }
    res.json({unix: Number(timestamp), utc: date.toGMTString()})
  } else {
    const date = new Date(timestamp)
    if(date == "Invalid Date") {
      res.json({ error: "Invalid Date" })
    }
    res.json({unix: date.getTime(), utc: date.toGMTString()})
  }
})

// listen for requests :)
var listener = app.listen(PORT, function () {
  console.log('Your app is listening on port ' + PORT);
});
