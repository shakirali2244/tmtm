var usonic = require('r-pi-usonic');
var sensor1 = usonic.createSensor(19, 26);
var socket = require('socket.io-client')('http://sfuarduinoclub.privatedns.org:3000');
socket.on('connect', function(){
	setInterval(function(){
		var readings = [ sensor1() ,  sensor1() ,  sensor1() ,  sensor1() ,  sensor1() ,  sensor1() ,  sensor1() ,  sensor1() ,  sensor1() ,  sensor1()  ];
		var c = 0
		for (i=0; i< readings.length; i++){
			if(readings[i] >0 && readings[i] < 20){
				c = c+1;
				console.log(readings[i]);
				if (c > 2){
					console.log('sensor1 triggered');
					socket.emit('trig1','1');
				}
			}
		}
	},5);
});
