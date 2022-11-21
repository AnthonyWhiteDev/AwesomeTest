'use strict';

/* istanbul ignore file */

const Logger = require('../src/tools/logger');
const ArgsChecker = require('../src/tools/argsChecker');
const DataProcessor = require('./tools/dataProcessor');




/////////////////////////////
// Fetch program arguments //
/////////////////////////////

/**
 * List of rw strings of arguments passed to the program (without the two first).
 * @type {list<string>}
 * */
let args;
try {
    args = ArgsChecker.getProgramArguments(new ArgsChecker.ActualProgramArgumentsProvider(), 1, 2);
}
catch (Error) {
    console.error(Error);
    console.error('Use option "--help" to get more information.');
    process.exit(1);
}
Logger.debug(args);

/**
 * Object containing the arguments once parsed into pairs of key/value.
 * @type {Object.<string, string | boolean>}
 * */
let parsedArgs;
try {
    parsedArgs = ArgsChecker.parseProgramArguments(args);
}
catch (Error) {
    console.error(Error);
    console.error('Use option "--help" to get more information.');
    process.exit(1);
}
Logger.debug(parsedArgs);

/**
 * Does the user requested to display the help message.
 * @type {boolean}
 * */
let help = parsedArgs['help'];
const helpType = typeof (help);
if ((helpType !== 'undefined') && (helpType !== 'boolean')) {
    console.error(`Error: "help" option must be a proper boolean option. Please use "--help" without any value appended to it.`);
    process.exit(1);
}
Logger.debug(`help = ${help}`);
if (help) {
    console.log(`This application processes the data found in the file './ data.js.txt'. This data must be formatted as this example:

'''javascript
const data = [{
    name: 'Dillauti',
    people:
        [{
            name: 'Winifred Graham',
            animals:
                [{ name: 'Anoa' },
                { name: 'Duck' },
                { name: 'Narwhal' },
                { name: 'Badger' },
                { name: 'Cobra' },
                { name: 'Crow' }]
        },
        {
            name: 'Blanche Viciani',
            animals:
                [{ name: 'Barbet' },
                { name: 'Rhea' },
                { name: 'Snakes' }]
        }
        ]
},
{
    name: 'Tohabdal',
    people:
        [{
            name: 'Effie Houghton',
            animals:
                [{ name: 'Zebra' },
                { name: 'Ring-tailed Lemur' },
                { name: 'Fly' },
                { name: 'Blue Iguana' },
                { name: 'Emu' },
                { name: 'African Wild Ass' },
                { name: 'Numbat' }]
        },
        {
            name: 'Essie Bennett',
            animals:
                [{ name: 'Aldabra Tortoise' },
                { name: 'Patagonian Toothfish' },
                { name: 'Giant Panda' },
                { name: 'Goat' },
                { name: 'Quahog' },
                { name: 'Collared Lemur' },
                { name: 'Aldabra Tortoise' }]
        }
        ]
}
];

module.exports = {
    data
}
'''

The processing can have two roles:  
* Filtering the elements according to the '--filter' option, if used;
* Counting the elements if the option '--count' is used.


# Usage
node src/app.js [--filter=<value>] [--count] [--help]

Options:

* --filter=<value>      Filter the animals to be considering by this <value>. Only the animals whose names contain this string will be considered. The '<value>' of the '--filter' option must be a string.

* --count               Displays the count of elements under a parent element (animals for a person, people for a country) by appending it to the name of the parent.The '--count' option does not take any additionnal value.

* --help                Displays this message and ends the program.

Please provide at least one of those options and maximum 2.
--filter and --count can be combined in any order. 

Example:
node src/app.js --filter=ry --count


# Lint
npx eslint src/ __tests__/


# Test
npm test


# Environment variables

- 'DEBUG'       Set this to 1 in order to activate some debug logs. Any other value will deactivate them.

- 'TESTPOWER'   Set this number to represent the number of times that randomzed tests will be run. Default is 100.`);
    process.exit(0);
}

/**
 * Filter used to pick only the animals whose names contain this string (if not null, otherwise every animal is picked).
 * @type {string}
 * */
let animalNamesFilter = parsedArgs['filter'];
const animalNamesFilterType = typeof(animalNamesFilter);
if ((animalNamesFilterType !== 'undefined') && (animalNamesFilterType !== 'string')) {
    console.error(`Error: "filter" option must be a proper string option. Please use "--filter=<value>" or nothing.`);
    console.error('Use option "--help" to get more information.');
    process.exit(1);
}
Logger.debug(`filter = "${animalNamesFilter}"`);

/**
 * Does the number of picked animals should be appended to the name of their owner.
 * @type {boolean}
 * */
let doCount = parsedArgs['count'];
const doCountType = typeof (doCount);
if ((doCountType !== 'undefined') && (doCountType != 'boolean')) {
    console.error(`Error: "count" option must be a proper boolean option. Please use "--count" or nothing.`);
    console.error('Use option "--help" to get more information.');
    process.exit(1);
}
Logger.debug(`count = ${doCount ? true : false}`);




////////////////
// Fetch data //
////////////////

/**
 * JSON containg data = Cities { name, people { name, animals { name } } }.
 * @type {List<Object.<string, {Object.<string, {Object.<string, string>}>}>>}
 * */
let data;
try {
    data = require('../data.js.txt').data;
}
catch (Error) {
    console.error(Error);
    console.error('Use option "--help" to get more information.');
    process.exit(1);
}
if (data === null) {
    console.error("Provided data is null.");
    process.exit(1);
}
const dataType = typeof (data);
if (dataType != 'object') {
    console.error("Malformatted data provided, data type should be 'list' but is: " + dataType);
//    process.exit(1);
}



//////////////////
// Process data //
//////////////////

/** The result list of countries once the data has been processed.
 * @type {List<Object.<string, string | List<Object.<string, string | List<Object.<string, string>>>>>>}
 * */
const resultCountries = [];
data.forEach(country => {

    if (country === null) {
        console.error("Provided country is null.");
        process.exit(1);
    }
    const countryType = typeof (country);
    if (countryType != 'object') {
        console.error("Malformatted country provided, country type should be 'object' but is: " + countryType);
        process.exit(1);
    }

    if (country.name === null) {
        console.error("Provided country.name is null.");
        process.exit(1);
    }
    const countryNameType = typeof (country.name);
    if (countryNameType != 'string') {
        console.error(`Malformatted country.name provided, country.name type should be 'string' but is: ` + countryNameType);
        process.exit(1);
    }

    if (country.people === null) {
        console.error("country.people is null.");
        process.exit(1);
    }
    const countryPeopleType = typeof (country.people);
    if (countryPeopleType != 'object') {
        console.error(`Malformatted country[${country.name}].people provided, country.people type should be 'object' but is: ` + countryPeopleType);
        process.exit(1);
    }

    /** The result list of poeple of this country once the data has been processed.
     * @type {List<Object.<string, string | List<Object.<string, string>>>>}
     * */
    const resultPeople = [];
    country.people.forEach(people => {

        if (people === null) {
            console.error(`Provided country[${country.name}].people.<element> is null.`);
            process.exit(1);
        }
        const peopleType = typeof (people);
        if (peopleType != 'object') {
            console.error(`Malformatted country[${country.name}].people.<element> provided, country.poeple.<element> type should be 'object' but is: ` + peopleType);
            process.exit(1);
        }

        if (people.name === null) {
            console.error(`Provided country[${country.name}].people.name is null.`);
            process.exit(1);
        }
        const peopleNameType = typeof (people.name);
        if (peopleNameType != 'string') {
            console.error(`Malformatted country[${country.name}].people.name provided, country.poeple.name type should be 'string' but is: ` + peopleNameType);
            process.exit(1);
        }

        if (people.animals === null) {
            console.error(`Provided country[${country.name}].people[${people.name}].animals is null.`);
            process.exit(1);
        }
        const peopleAnimalsType = typeof (people.animals);
        if (peopleAnimalsType != 'object') {
            console.error(`Malformatted country[${country.name}].people[${people.name}].animals provided, country.people.animals type should be 'object' but is: ` + peopleAnimalsType);
            process.exit(1);
        }

        /** The result list of animals of that person of this country once the data has been processed.
         * @type {List<Object.<string, string>>}
         * */
        const resultAnimals = animalNamesFilter ? DataProcessor.filterAnimals(people.animals, animalNamesFilter) : people.animals;
        const nAnimals = resultAnimals.length;
        if (nAnimals != 0) resultPeople.push({ name: doCount ? people.name + ' [' + nAnimals + ']' : people.name, animals: resultAnimals });
    });
    const nPeople = resultPeople.length;
    if (nPeople != 0) resultCountries.push({ name: doCount ? country.name + ' [' + nPeople + ']' : country.name, poeple: resultPeople });
});

if (resultCountries.length == 0) {
    console.warn('No data to display after filtering');
    process.exit(1);
}

console.log(JSON.stringify(resultCountries, null, 2));