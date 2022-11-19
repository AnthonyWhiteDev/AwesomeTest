'use strict';

/* istanbul ignore file */

const Logger = require('../src/tools/logger');
const ArgsChecker = require('../src/tools/argsChecker');




/////////////////////////////
// Fetch program arguments //
/////////////////////////////

/**
 * List of rw strings of arguments passed to the program (without the two first).
 * */
let args;
try {
    args = ArgsChecker.getProgramArguments(new ArgsChecker.ActualProgramArgumentsProvider(), 1, 2);
}
catch (Error) {
    console.error(Error);
    process.exit(1);
}
Logger.debug(args);

/**
 * Object containing the arguments once parsed into pairs of key/value.
 * */
let parsedArgs;
try {
    parsedArgs = ArgsChecker.parseProgramArguments(args);
}
catch (Error) {
    console.error(Error);
    process.exit(1);
}
Logger.debug(parsedArgs);

/**
 * Filter used to pick only the animals whose names contain this string (if not null, otherwise every animal is picked).
 * */
let animalNamesFilter = parsedArgs['filter'];
const animalNamesFilterType = typeof(animalNamesFilter);
if ((animalNamesFilterType !== 'undefined') && (animalNamesFilterType !== 'string')) {
    console.error(`Error: "filter" option must be a proper string option. Please use "--filter=<value>" or nothing.`);
    process.exit(1);
}
Logger.debug(`filter = "${animalNamesFilter}"`);

/**
 * Does the number of picked animals should be appended to the name of their owner.
 * */
let doCount = parsedArgs['count'];
const doCountType = typeof (doCount);
if ((doCountType !== 'undefined') && (doCountType != 'boolean')) {
    console.error(`Error: "count" option must be a proper boolean option. Please use "--count" or nothing.`);
    process.exit(1);
}
Logger.debug(`count = ${doCount ? true : false}`);




////////////////
// Fetch data //
////////////////

/**
 * JSON containg data = Cities { name, people { name, animals { name } } }.
 * */
let data;
try {
    data = require('../data.js.txt').data;
}
catch (Error) {
    console.error(Error);
    process.exit(1);
}




//////////////////
// Process data //
//////////////////

