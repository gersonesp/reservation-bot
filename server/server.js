const http = require('http');
const express = require('express');
const MessagingResponse = require('twilio').twiml.MessagingResponse;
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));


let reservations = [];

let opentime = 10.0;
let closetime = 20.0;

function checktime(time) {
	return time >= opentime && (time+1) <=closetime;
}

function checkday(day) {
	return day >= 1 && day <= 31;
}
function checkmonth(month) {
	return month >= 1 && month <= 12;
}
function checkyear(year) {
	return year >= 2019;
}

app.get("/reservations", function(req, res){
	res.json(reservations);
});

app.post('/', (req, res) => {
	const twiml = new MessagingResponse();

	let input = req.body.Body.split(" ");

	if (input.length !== 7 && checktime(input[3]) && checkday(input[4]) && checkday(input[5]) && checkday(input[6])) {
		console.log("error");
		twiml.message('error');
	} else {
		let reservation = {
			firstname: input[0],
			lastname: input[1], 
			partysize: input[2],
			time: input[3],
			day: input[4],
			month: input[5],
			year: input[6]
		}

		twiml.message('success');

		reservations.push(reservation);

		console.log(reservations);

	}

	res.writeHead(200, {'Content-Type': 'text/xml'});
	res.end(twiml.toString());
})

http.createServer(app).listen(1337, () => {
	console.log('express server listening on port 1337')
});

