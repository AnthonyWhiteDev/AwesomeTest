const Logger = require('../src/tools/logger');

/**
 * Defines the number of times every test will be run. Put this a high value to ensure randomized data are usefull, or low to run tests faster.
 * */
const TEST_POWER = process.env.TESTPOWER ? process.env.TESTPOWER : 1000;

Logger.debug(`Test Power: ${TEST_POWER}`);

module.exports = { TEST_POWER };