var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var usonic = require('r-pi-usonic');
var sensor1 = usonic.createSensor(19, 26);

server.listen(3000);


app.get('/', function (req, res) {
  res.sendFile(__dirname+'/index.html')
})

app.get('/boot.css', function (req, res) {
  res.sendFile(__dirname+'/boot.css')
});

var start = new Date().getTime();
console.log(start - start);


io.sockets.on('connection', function(socket){
  setInterval(function(){
    io.sockets.emit('time',new Date().getTime()-start);
  },100)
  
  console.log('a user connected');
  socket.on('trig1',function(data){
  console.log(data);
  io.sockets.emit('time',new Date().getTime()-start);
  console.log(new Date().getTime()-start)
  start = new Date().getTime();
});

  /*
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
	
  	});*/

});



