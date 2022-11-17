/* istanbul ignore file */

const Logger = require('../src/tools/logger');
const ArgsChecker = require('../src/tools/argsChecker');

const args = ArgsChecker.getProgramArguments(3, 3, new ArgsChecker.ActualProgramArgumentsProvider());
Logger.debug(args);