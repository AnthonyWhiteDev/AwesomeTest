const logger = require('./logger');

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
 * Check the number of program arguments used. Does not take in count the first two unnecessary ones.
 * */
function getProgramArguments(nMininmumArgs, nMaximumArgs, programArgumentsProvider) {
    let argv = programArgumentsProvider.provideProgramArguments()
    let argvLength = argv.length;
    argv = argv.splice(2, argvLength);
    argvLength -= 2;
    if ((argvLength < nMininmumArgs) || (argvLength > nMaximumArgs))
        throw new InvalidNumberOfArgumentsError(nMaximumArgs, nMaximumArgs, argvLength);
    return argv;
}

module.exports = { getProgramArguments, ProgramArgumentsProvider, ActualProgramArgumentsProvider, InvalidNumberOfArgumentsError };