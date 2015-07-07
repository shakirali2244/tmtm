var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var usonic = require('r-pi-usonic');
var sensor1 = usonic.createSensor(19, 26);


server.listen(80);
var child_process = require('child_process');

app.get('/', function (req, res) {
  res.sendFile(__dirname+'/index.html')
})

app.get('/boot.css', function (req, res) {
  res.sendFile(__dirname+'/boot.css')
});
var start = new Date().getTime();
console.log(start - start);
io.on('connection', function(socket){
  console.log('a user connected');
  socket.emit('time',new Date().getTime()-start);
  socket.on('req',function(data){
  	var dist1 = sensor1();
  	if(dist1 >0 && dist1 < 50){
  		var dt = new Date();
  		socket.emit('time',new Date().getTime()-start);
  		console.log(new Date().getTime()-start);
  		console.log('TRIGGERED');
  		socket.emit('dist',dist1);
  		start = new Date().getTime();
  	}
	
  	});
});


