'use strict';




////////////
// Errors //
////////////

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
 * Error thrown when an invalid (null?) ProgramArgumentsProvider is fed to getProgramArguments.
 * */
class InvalidProgramArgumentsProviderError extends Error {
    constructor() {
        super(`Invalid ProgramArgumentsProvider`);
        this.name = "InvalidProgramArgumentsProvider";
    }
}

/**
 * Error thrown when a ProgramArgumentsProvider fails to use provideProgramArguments.
 * */
class ProgramArgumentsProvisionError extends Error {
    constructor() {
        super(`provideProgramArguments() method in ProgramArgumentsProvider failed.`);
        this.name = "ProgramArgumentsProvisionError";
    }
}

/**
 * Error thrown when a ProgramArgument provided is malformatted.
 * */
class MalformattedProgramArgumentProvidedError extends Error {
    constructor(malformattedArgument) {
        super(`Malformatted program argument provided: ${malformattedArgument}\nArguments must respond to the format '--value' or '--key=value'.`);
        this.name = "MalformattedProgramArgumentProvidedError";
    }
}




/////////////
// Classes //
/////////////

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




///////////////
// Functions //
///////////////

/**
 * Check the number of program arguments used.
 * Does not take in count the unnecessary two first.
 * Throws an InvalidNumberOfArgumentsError if nMinimumArgs is not null and the number of arguments provided is lesser, or if nMaximumArgs is not null and the number of arguments provided is greater.
 * Throws an InvalidArgumentsListError if programArgumentsProvider is null or fails to produce arguments.
 * @param {list<string>} programArgumentsProvider The program arguments provider. Must implement a 'provideProgramArguments()' method returning a list of strings.
 * @param {number} nMininmumArgs The minimum number of arguments expected. Can be null if no mininmum.
 * @param {number} nMininmumArgs The minimum number of arguments expected. Can be null if no maximum.
 * @returns {list<string>} The program arguments minus the two first.
 * */
function getProgramArguments(programArgumentsProvider, nMinimumArgs = null, nMaximumArgs = null) {
    let argv;
    if (programArgumentsProvider === null)
        throw new InvalidProgramArgumentsProviderError();
    try {
        argv = programArgumentsProvider.provideProgramArguments();
    }
    catch (Error) {
        throw new ProgramArgumentsProvisionError();
    }
    let argvLength = argv.length;
    argv = argv.splice(2, argvLength);
    argvLength -= 2;
    if (((nMinimumArgs !== null) && (argvLength < nMinimumArgs)) || (((nMaximumArgs !== null) && (argvLength > nMaximumArgs))))
        throw new InvalidNumberOfArgumentsError(nMinimumArgs, nMaximumArgs, argvLength);
    return argv;
}

/**
 * Extract pairs of arguments key/value from a list of arguments.
 * Arguments have to be '--value' or '--key=value'.
 * Throws MalformattedProgramArgumentProvidedError if at least one malformatted argument is provided.
 * @param  {list<string>}                        argumentsList   List of strings representing the raw program arguments, without any parsing. If null an empty list will be returned.
 * @return {Object.<string, string | boolean>}                   Object containing the pairs of key/value found in the argumentsList. Empty if argumentsList parameter is null.
 * */
function parseProgramArguments(argumentsList) {
    if (argumentsList === null) return [];

    const result = {};
    argumentsList.forEach(rawArgument => {
        let key;
        const index = rawArgument.indexOf('=');
        const equalSignUsed = index != -1;

        if (equalSignUsed) key = rawArgument.substring(0, index);
        else key = rawArgument;

        if ((key.length > 2) && key.startsWith('--')) {
            if (equalSignUsed) {
                if (rawArgument.length > index + 1) result[key.substring(2, index)] = rawArgument.substring(index + 1, rawArgument.length);
                else throw new MalformattedProgramArgumentProvidedError(rawArgument);
            }
            else result[key.substring(2, key.length)] = true;
        }
        else throw new MalformattedProgramArgumentProvidedError(rawArgument);
    });

    return result;
}

module.exports = { getProgramArguments, ProgramArgumentsProvider, ActualProgramArgumentsProvider, InvalidNumberOfArgumentsError, InvalidProgramArgumentsProviderError, ProgramArgumentsProvisionError, parseProgramArguments, MalformattedProgramArgumentProvidedError };