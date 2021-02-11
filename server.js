const express = require("express");
const bodyParser = require("body-parser");

var app = express();

const PORT = 3000;

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

app.get("/api/timestamp/:date", (req, res) => {
  const { date } = req.params;

  const newDateValue = new Date(Number(date));
  res.send(
    String(newDateValue) !== "Invalid Date"
      ? { unix: Number(date), utc: String(newDateValue) }
      : { utc: String(newDateValue) }
  );
});

app.listen(process.env.PORT || 3000, () => {
  console.log(`Example app listening at http://localhost:${PORT}`);
});
