'use strict';

/* istanbul ignore file */

const Logger = require('../src/tools/logger');
const ArgsChecker = require('../src/tools/argsChecker');

let args;
try {
    args = ArgsChecker.getProgramArguments(new ArgsChecker.ActualProgramArgumentsProvider(), 1, 2);
}
catch (Error) {
    console.error(Error);
    process.exit(1);
}
Logger.debug(args);

let parsedArgs;
try {
    parsedArgs = ArgsChecker.parseProgramArguments(args);
}
catch (Error) {
    console.error(Error);
    process.exit(1);
}
Logger.debug(parsedArgs);

let data;
try {
    data = require('../data.js.txt').data;
}
catch (Error) {
    console.error(Error);
    process.exit(1);
}
Logger.debug(data);

/**
 * Filter used to pick only the animals whose names contain this string (if not null, otherwise every animal is picked).
 * */
let animalNamesFilter = parsedArgs['filter'];
Logger.debug(animalNamesFilter);
const animalNamesFilterType = typeof(animalNamesFilter);
if ((animalNamesFilterType !== 'undefined') && (animalNamesFilterType !== 'string')) {
    console.error(`Error: "filter" option must be a proper string option. Please use "--filter=<value>" or nothing.`);
    process.exit(1);
}

/**
 * Does the number of picked animals should be appended to the name of their owner.
 * */
let doCount = parsedArgs['count'];
Logger.debug(doCount);
const doCountType = typeof (doCount);
if ((doCountType !== 'undefined') && (doCountType != 'boolean')) {
    console.error(`Error: "count" option must be a proper boolean option. Please use "--count" or nothing.`);
    process.exit(1);
}