const express = require("express");
const bodyParser = require("body-parser");
const moment = require("moment");

var app = express();

const PORT = 3000;

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

app.get("/api/timestamp/:date", (req, res) => {
  const { date } = req.params;
  const newDateValue = date
    ? moment(Number(date))
        .utcOffset(0)
        // .format("ddd, D MMM YYYY, hh:mm:ss ZZ")
        .toString()
    : moment().utcOffset(0).toString();
  console.log("newDateValue", newDateValue);
  res.send(
    newDateValue !== "Invalid date"
      ? {
          unix: Number(date),
          utc: newDateValue.slice(0, newDateValue.length - 5),
        }
      : { utc: "Invalid date" }
  );
});

app.listen(process.env.PORT || 3000, () => {
  console.log(`Example app listening at http://localhost:${PORT}`);
});
