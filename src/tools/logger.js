'use strict';

/**
 * Is true only if an environment variable called DEBUG is set and equal to 1.
 * Used to define if debug(message) function should be active.
 * */
const doDebug = process.env.DEBUG && (process.env.DEBUG == 1);

/* istanbul ignore next */
/**
 * Logs a message to standard output only if doDebug is true.
 * @param {*} message The thing to log.
 * */
function debug(message) {
    if(doDebug) console.log(message);
}

module.exports = { doDebug, debug };