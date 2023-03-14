// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

function parseDate(date) {
  let dateObj = null;

  try {
    if (date == null) {
      dateObj = new Date();
    } else if (isNaN(date)) {
      dateObj = new Date(date);
    } else {
      dateObj = new Date(parseInt(date));
    }
    
    return {
      unix: dateObj.getTime(),
      utc: dateObj.toUTCString(),
    };
  } catch (e) {
    console.error(e);
    return { error : "Invalid Date" };
  }
}

// your first API endpoint... 
app.get("/api/:date", function (req, res) {
  let date = req.params.date;
  let result = parseDate(date);
  
  res.json(result);
});

app.get("/api", (req, res) => {
  let result = parseDate(null);
  
  res.json(result);
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
