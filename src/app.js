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

const data = require('../data.js.txt').data;
Logger.debug(data);

/**
 * Filter used to pick only the animals whose names contain this string (if not null, otherwise every animal is picked).
 * */
let animalNamesFilter = parsedArgs['filter'];
Logger.debug(animalNamesFilter);

/**
 * Does the number of picked animals should be appended to the name of their owner.
 * */
let doCount = parsedArgs['count'];
Logger.debug(doCount);
// TODO test if count is a boolean or not