
const EventEmitter = require('events');


class Logger extends EventEmitter{
	log (message) {
		console.log(message)
		this.emit('callEvent', {id: 1, file: __filename});
		// console.log(message);
	}	
}

module.exports = Logger;	