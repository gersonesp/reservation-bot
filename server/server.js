const http = require('http');
const express = require('express');
const MessagingResponse = require('twilio').twiml.MessagingResponse;
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));


let reservations = [];

app.post('/', (req, res) => {
	const twiml = new MessagingResponse();

	let input = req.body.Body.split(" ");

	let reservation = {
		firstname: input[0],
		lastname: input[1],
		partysize: input[2],
		time: input[3]
	}

	twiml.message('success');

	reservations.push(reservation);
	console.log(reservations);
	

	res.writeHead(200, {'Content-Type': 'text/xml'});
	res.end(twiml.toString());
})

http.createServer(app).listen(1337, () => {
	console.log('express server listening on port 1337')
});

