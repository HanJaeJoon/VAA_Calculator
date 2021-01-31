var express = require('express');
var app = express();

app.set('port', (process.env.PORT || 80));
app.use(express.static(__dirname + '/static'));
app.use(express.static(__dirname + '/pages'));

app.get('/', function(request, response) {
  response.render('pages/index');
});

app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'));
});