'use strict';

/* istanbul ignore file */

const Logger = require('../src/tools/logger');
const ArgsChecker = require('../src/tools/argsChecker');

const args = ArgsChecker.getProgramArguments(new ArgsChecker.ActualProgramArgumentsProvider(), 1, 1);
Logger.debug(args);

const data = require('../data.js.txt').data;
Logger.debug(data);
