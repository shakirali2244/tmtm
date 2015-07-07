var usonic = require('r-pi-usonic');
var sensor1 = usonic.createSensor(19, 26, 450);
while(1){
	var dist1 = sensor1();
	if (dist1 != -1) console.log(dist1);
}
