let doDebug = process.env.DEBUG && (process.env.DEBUG==1);

/* istanbul ignore next */
function debug(message) {
    if(doDebug) console.log(message);
}

module.exports = { doDebug, debug };