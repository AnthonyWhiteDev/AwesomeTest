/**
 * Defines the number of times every test will be run.
 * Put this a high value to ensure randomized data are usefull, or low to run tests faster.
 * Default is 10.
 * */
const TEST_POWER = process.env.TESTPOWER ? process.env.TESTPOWER : 10;

console.log(`Test Power: ${TEST_POWER}`);

module.exports = { TEST_POWER };