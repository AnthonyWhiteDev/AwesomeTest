'use strict';

/* istanbul ignore file */

/**
 * Is true only if an environment variable called DEBUG is set and equal to 1.
 * Used to define if debug(message) function should be active.
 * */
const doDebug = process.env.DEBUG && (process.env.DEBUG == 1);

/* istanbul ignore next */
/**
 * Logs messages to standard output only if doDebug is true.
 * @param {...*} message The things to log.
 * */
function debug(...messages) {
    if(doDebug) console.log(...messages);
}

module.exports = { doDebug, debug };