var express = require('express')
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);


var votes = [];

app.use(express.static('public'));
server.listen(process.env.PORT || 3000);

app.get('/', function (req, res) {
  res.sendfile(__dirname + '/index.html');
});

io.on('connection', function (socket) {
  socket.emit('news', { hello: 'world' });

  socket.on('vote', function (data){
    votes.push(data)
    if (votes.length == 0) {
      return
    }
    var total = 0;
    for(var i = 0; i < votes.length; i++) {
      total += votes[i];
      }
    var avg = total / votes.length
    console.log(avg)
    io.emit('result', {average: avg, votes: votes.length})
  });
  socket.on('my other event', function (data) {
    console.log(data);
  });
});


module.exports = app
