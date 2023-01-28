//including the libraries required
const express = require("express");
var bodyParser = require("body-parser");
require("dotenv").config();
const mysql = require("mysql2");
const path = require("path");
const app = express();

//creating connection with mysql
const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  database: "carfuelconsump",
  user: "root",
  password: process.env.SQLPASS,
});


app.use(bodyParser.json());
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({ extended: true }));


app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/index.html"));
});
app.get("/home", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/index.html"));
});
app.get("/showCarDetail", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/showCar.html"));
});


var make;
//requesting the values to be filled in the dropdown from database
app.post("/fetch-model", function (req, res) {
  connection.connect();
  make = Object.keys(req.body)[0];
  connection.query(
    `select Models from fuelconsumptionratings where Make='${Object.keys(req.body)[0]
    }' `,
    (err, rows, fields) => {
      res.json({
        model: rows,
      });
    }
  );
});

//get information about a particular model of a car
app.post("/getInfo", (req, res) => {
  connection.connect();
  connection.query(
    `select * from fuelconsumptionratings where Make='${make}' and Models='${Object.keys(req.body)[0]
    }'`,
    (err, rows, fields) => {
      res.json({
        model: rows,
      });
    }
  );
});

//requesting three best possible models for a make or company of the car
app.post("/getbest", (req, res) => {
  connection.connect();
  connection.query(
    `Select Models from fuelconsumptionratings where Make='${make}' order by Smog DESC,CO2 DESC LIMIT 3 `,
    (err, rows, fields) => {
      res.json({
        model: rows,
      });
    }
  );
});


app.listen(80, () => {
  console.log("listening on port 80");
});
