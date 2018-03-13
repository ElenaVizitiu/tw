var http = require("http");
var querystring = require('querystring');

var admin = require("firebase-admin");

var serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://tw-team.firebaseio.com"
});

defaultAuth = admin.auth();
defaultDatabase = admin.database();

var server = http.createServer(function(request, response) {

  response.writeHead(200, {"Content-Type": "text/html"});

  if (request.method == 'POST' && request.url == "/signup") {
    var jsonString = '';

    request.on('data', function (data) {
        jsonString += data;
    });

    request.on('end', function () {
      var emailUser = JSON.parse(jsonString);

      admin.auth().getUserByEmail(emailUser['email'])
      .then(userRecord => {
        // console.log('gasit');
        
        response.end('exista');
      })
      .catch(error => {
        // console.log("Error fetching user data:", error);
        response.end('nu-exista');
      });
    });
  } else {
    response.end();
  }
  

}).listen(5000);

console.log("Server is listening");