var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var usonic = require('r-pi-usonic');
var sensor1 = usonic.createSensor(19, 26);
var moment = require('moment');
moment().format();


server.listen(80);
var child_process = require('child_process');

app.get('/', function (req, res) {
  res.sendFile(__dirname+'/index.html')
})

app.get('/boot.css', function (req, res) {
  res.sendFile(__dirname+'/boot.css')
});
var start = moment.unix(Number);
console.log(start);
io.on('connection', function(socket){
  console.log('a user connected');
  socket.emit('time',console.time('son1'))
  socket.on('req',function(data){
  	var dist1 = sensor1();

  	if(dist1 >0 && dist1 < 50){
  		console.log(moment.unix(Number));
  		console.log('TRIGGERED');
  		socket.emit('dist',dist1);
  	}
	
  	});
});


