'use strict';

const Logger = require('./logger');




////////////
// Errors //
////////////

/**
 * Error thrown when a null animal is provided.
 * */
class NullAnimalError extends Error {
    /**
     * @param {string} countryName  The name of the country in which the animal is.
     * @param {string} personName   The name of the person owning the animal.
     * */
    constructor(countryName, peopleName) {
        super(`Provided country[${countryName}].people[${peopleName}].animals.<element> is null.`);
        this.name = "NullAnimalError";
    }
}

/**
 * Error thrown when a malformatted animal is provided.
 * */
class MalformattedAnimalError extends Error {
    /**
     * @param {string} countryName  The name of the country in which the animal is.
     * @param {string} personName   The name of the person owning the animal.
     * @param {string} animalType   The type of the animal provided.
     * */
    constructor(countryName, peopleName, animalType) {
        super(`Malformatted country[${countryName}].people[${peopleName}].animals.<element> provided, country.people.animals.<element> type should be 'object' but is: ` + animalType);
        this.name = "MalformattedAnimalError";
    }
}

/**
 * Error thrown when a null animal name is provided.
 * */
class NullAnimalNameError extends Error {
    /**
     * @param {string} countryName  The name of the country in which the animal is.
     * @param {string} personName   The name of the person owning the animal.
     * */
    constructor(countryName, peopleName) {
        super(`Provided country[${countryName}].people[${peopleName}].animals.name is null.`);
        this.name = "NullAnimalNameError";
    }
}

/**
 * Error thrown when a malformatted animal name is provided.
 * */
class MalformattedAnimalNameError extends Error {
    /**
     * @param {string} countryName  The name of the country in which the animal is.
     * @param {string} personName   The name of the person owning the animal.
     * @param {string} animalNameType   The type of the animal provided.
     * */
    constructor(countryName, peopleName, animalNameType) {
        super(`Malformatted country[${countryName}].people[${peopleName}].animals.name provided, country.people.animals.name type should be 'string' but is: ` + animalNameType);
        this.name = "MalformattedAnimalNameError";
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
function filterAnimals(animals, nameFilter, countryName, peopleName) {

    return animals.filter(animal => {
        if (animal === null) {
            throw new NullAnimalError(countryName, peopleName);
            /* istanbul ignore next */
            process.exit(1);
        }
        const animalType = typeof (animal);
        if (animalType != 'object') {
            throw new MalformattedAnimalError(countryName, peopleName, animalType);
            /* istanbul ignore next */
            process.exit(1);
        }

        if (animal.name === null) {
            throw new NullAnimalNameError(countryName, peopleName);
            /* istanbul ignore next */
            process.exit(1);
        }
        const animalNameType = typeof (animal.name);
        if (animalNameType != 'string') {
            throw new MalformattedAnimalNameError(countryName, peopleName, animalType);
            /* istanbul ignore next */
            process.exit(1);
        }

        return animal.name.includes(nameFilter)
    });
}

module.exports = { filterAnimals, NullAnimalError, MalformattedAnimalError, NullAnimalNameError, MalformattedAnimalNameError };