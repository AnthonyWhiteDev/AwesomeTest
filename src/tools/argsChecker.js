'use strict';

const logger = require('./logger');

/**
 * Filter used to pick only the animals whose names contain this string (if not null, otherwise every animal is picked).
 * */
let animalNamesFilter = null;

/**
 * Does the number of picked animals should be appended to the name of their owner.
 * */
let doCount = false;

/**
 * Error thrown when an invalid number of arguments is passed to checker of program arguments.
 * */
class InvalidNumberOfArgumentsError extends Error {
    /**
     * @param {number} expectedMin The minimum number of program arguments expected.
     * @param {number} expectedMax The maximum number of program arguments expected.
     * @param {number} actual      The actual number of program arguments provided.
     * */
    constructor(expectedMin, expectedMax, actual) {
        super(`Invalid number of arguments provided: expected between ${expectedMin} and ${expectedMax} but provided ${actual}`);
        this.name = "InvalidNumberOfArgumentsError";
    }
}

/**
 * Objects providing the program arguments.
 * */
class ProgramArgumentsProvider {
    /* istanbul ignore next */
    /**
     * Provides the program arguments.
     * @returns {list<string>} The program arguments.
     * */
    provideProgramArguments() {
        throw new Error('Unimplemented method "provideProgramArguments" in abstract class "ProgramArgumentsProvider"');
    }
}

class ActualProgramArgumentsProvider extends ProgramArgumentsProvider {
    /* istanbul ignore next */
    /**
     * Provides the program arguments.
     * @returns {list<string>} The program arguments.
     * */
    provideProgramArguments() {
        return process.argv;
    }
}

/**
 * Check the number of program arguments used.
 * Does not take in count the unnecessary two first.
 * Throws an InvalidNumberOfArgumentsError if nMinimumArgs is not null and the number of arguments provided is lesser, or if nMaximumArgs is not null and the number of arguments provided is greater.
 * @param {list<string>} programArgumentsProvider The program arguments provider. Must implement a 'provideProgramArguments()' method returning a list of strings.
 * @param {number} nMininmumArgs The minimum number of arguments expected. Can be null if no mininmum.
 * @param {number} nMininmumArgs The minimum number of arguments expected. Can be null if no maximum.
 * @returns {list<string>} The program arguments minus the two first.
 * */
function getProgramArguments(programArgumentsProvider, nMininmumArgs=null, nMaximumArgs=null) {
    let argv = programArgumentsProvider.provideProgramArguments()
    let argvLength = argv.length;
    argv = argv.splice(2, argvLength);
    argvLength -= 2;
    if (((nMininmumArgs !== null) && (argvLength < nMininmumArgs)) || (((nMaximumArgs !== null) && (argvLength > nMaximumArgs))))
        throw new InvalidNumberOfArgumentsError(nMaximumArgs, nMaximumArgs, argvLength);
    return argv;
}

/**
 * Check if expected arguments are present in the given list, and extract their values.
 * @param argumentsList
 * */
function setProgramArguments(argumentsList, expectedArgumentsDescription) { }

module.exports = { getProgramArguments, ProgramArgumentsProvider, ActualProgramArgumentsProvider, InvalidNumberOfArgumentsError };