const Logger = require('../src/tools/logger');

/**
 * Defines the number of times every test will be run.
 * Put this a high value to ensure randomized data are usefull, or low to run tests faster.
 * Default is 100.
 * */
let TEST_POWER = process.env.TESTPOWER ? process.env.TESTPOWER : 100;

if (isNaN(TEST_POWER)) {
    console.error(`Error: "TESTPOWER" environment variable must be a proper number.`);
    process.exit(1);
}

TEST_POWER = parseInt(TEST_POWER);

Logger.debug('TEST_POWER', TEST_POWER);

module.exports = { TEST_POWER };