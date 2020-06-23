
const Logger = require('./logger');
	
var logger = new Logger();

logger.on('callEvent', (arg) => {
	console.log('Evento', arg);
})


logger.log('parametro "message"');