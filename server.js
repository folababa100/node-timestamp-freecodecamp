const express = require("express");
const bodyParser = require("body-parser");
const moment = require("moment");

var app = express();

const PORT = 3000;

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

app.get("/api/timestamp", (req, res) => {
  res.json({ unix: Date.now(), utc: Date() })
});

app.get("/api/timestamp/:date", (req, res) => {
  const { date } = req.params;
  if (/\d{5,}/.test(date)) {
    const dateInt = parseInt(date);
    res.json({ unix: dateInt, utc: new Date(dateInt).toUTCString() })
  } else {
    const newDateValue = new Date(date);
    if (newDateValue.toString() === "Invalid Date") {
      res.json({ error: "Invalid Date" });
    } else {
      res.json({ unix: newDateValue.valueOf(), utc: newDateValue.toUTCString() });
    }
  }
});

app.listen(process.env.PORT || 3000, () => {
  console.log(`Example app listening at http://localhost:${PORT}`);
});
