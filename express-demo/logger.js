module.exports.log = log;
module.exports.aut = aut;



function log (req, res, next) {
    console.log('Logging...');
    next();
}

function aut (req, res, next) {
    console.log('Authenticating...');
    next();
}