var express = require('express');
const path = require("path");
var app = express();
var fs = require('fs');

app.get('/thank-you-page', function (req, res) {

    // read the thank you page html template from file
   fs.readFile(path.resolve(__dirname, '../client/client.html'), 'utf8' , (err, data) => {
    if (err) {
      console.error(err)
      return
    }

    // get user name, decode it, and set it at the template
    const userName = req.query.name
    let name = new Buffer.from(userName, 'base64').toString('utf-8');
    data = data.replace("NAME", name)

    // return the response to the happy user
    res.send(data)
  })  
})

var server = app.listen(8081, function () {
   var host = server.address().address
   var port = server.address().port
   
   console.log("Thank you page service runs at http://%s:%s", host, port)
})
