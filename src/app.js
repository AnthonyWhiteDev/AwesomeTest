'use strict';

/* istanbul ignore file */

const Logger = require('../src/tools/logger');
const ArgsChecker = require('../src/tools/argsChecker');

const args = ArgsChecker.getProgramArguments(1, 1, new ArgsChecker.ActualProgramArgumentsProvider());
Logger.debug(args);