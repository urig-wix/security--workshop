var express = require('express');
const path = require("path");
var app = express();
var db1 = require("./dal/database.js")

app.get("/api/users", (req, res, next) => {
    var sql = "select * from user"
    var params = []
    db1.all(sql, params, (err, rows) => {
        if (err) {
          res.status(400).json({"error":err.message});
          return;
        }
        res.json({
            "message":"success",
            "data":rows
        })
      });
});

var server = app.listen(8082, function () {
   var host = server.address().address
   var port = server.address().port
   
   console.log("Example app listening at http://%s:%s", host, port)
})
