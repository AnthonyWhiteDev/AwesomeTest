let doDebug = process.env.DEBUG;

/* istanbul ignore next */
function debug(message) {
    if(doDebug) console.log(message);
}

module.exports = { doDebug, debug };