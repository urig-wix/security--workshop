var express = require("express");
const path = require("path");
var app = express();
var fs = require("fs");
var db = require("./dal/database.js");

var bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post("/signup", (req, res, next) => {
  // extract user email and password from the request body
  const email = req.body.email;
  const password = req.body.password;

  // save the data in the database
  var sql = `INSERT INTO user (email, password) VALUES ('${email}','${password}')`;
  console.log(sql);
  db.exec(sql, (err, rows) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }

    res.redirect("https://urig55.wixsite.com/website-2/shop");
  });
});

app.post("/login-page", (req, res, next) => {
  // extract user email and password from the request body

  const email = req.body.email;
  const password = req.body.password;

  // get saved email and password from the db
  var sql = `select password from user where email = '${email}'`;
  db.all(sql, [], (err, rows) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }

    const isValid = rows.length && password === rows[0].password;

    if (isValid) {
      res.redirect("https://urig55.wixsite.com/website-2/shop");
    } else {
      fs.readFile(
        path.resolve(__dirname, "../client/client.html"),
        "utf8",
        (err, data) => {
          if (err) {
            console.error(err);
            return;
          }

          // not valid, return login page and expose wrong credentails message
          data = data.replace("<!--", "").replace("-->", "");
          res.send(data);
        }
      );
    }
  });
});

app.get("/login-page", function (req, res) {
  fs.readFile(
    path.resolve(__dirname, "../client/client.html"),
    "utf8",
    (err, data) => {
      if (err) {
        console.error(err);
        return;
      }

      res.send(data);
    }
  );
});

var server = app.listen(8082, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log("Example app listening at http://%s:%s", host, port);
});
