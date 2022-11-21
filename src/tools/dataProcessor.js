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

/**
 * Error thrown when a null Person is provided.
 * */
class NullPersonError extends Error {
    /**
     * @param {string} countryName  The name of the country in which the person is.
     * */
    constructor(countryName) {
        super(`Provided country[${countryName}].people.<element> is null.`);
        this.name = "NullPersonError";
    }
}

/**
 * Error thrown when a malformatted person is provided.
 * */
class MalformattedPersonError extends Error {
    /**
     * @param {string} countryName  The name of the country in which the person is.
     * @param {string} personType   The type of the person provided.
     * */
    constructor(countryName, personType) {
        super(`Malformatted country[${countryName}].people.<element> provided, country.poeple.<element> type should be 'object' but is: ` + personType);
        this.name = "MalformattedPersonError";
    }
}

/**
 * Error thrown when a null Person name is provided.
 * */
class NullPersonNameError extends Error {
    /**
     * @param {string} countryName  The name of the country in which the person is.
     * */
    constructor(countryName) {
        super(`Provided country[${countryName}].people.name is null.`);
        this.name = "NullPersonNameError";
    }
}

/**
 * Error thrown when a malformatted person name is provided.
 * */
class MalformattedPersonNameError extends Error {
    /**
     * @param {string} countryName      The name of the country in which the person is.
     * @param {string} personNameType   The type of the person name provided.
     * */
    constructor(countryName, personNameType) {
        super(`Malformatted country[${countryName}].people.name provided, country.poeple.name type should be 'string' but is: ` + personNameType);
        this.name = "MalformattedPersonNameError";
    }
}

/**
 * Error thrown when a null Person animals is provided.
 * */
class NullPersonAnimalsError extends Error {
    /**
     * @param {string} countryName  The name of the country in which the person is.
     * */
    constructor(countryName) {
        super(`Provided country[${countryName}].people.animals is null.`);
        this.name = "NullPersonAnimalsError";
    }
}

/**
 * Error thrown when a malformatted person animals is provided.
 * */
class MalformattedPersonAnimalsError extends Error {
    /**
     * @param {string} countryName         The name of the country in which the person is.
     * @param {string} personAnimalsType   The type of the person animals provided.
     * */
    constructor(countryName, personAnimalsType) {
        super(`Malformatted country[${countryName}].people.animals provided, country.poeple.animals type should be 'object' but is: ` + personAnimalsType);
        this.name = "MalformattedPersonAnimalsError";
    }
}

/**
 * Error thrown when a null Country is provided.
 * */
class NullCountryError extends Error {
    constructor() {
        super(`Provided country.<element> is null.`);
        this.name = "NullCountryError";
    }
}

/**
 * Error thrown when a malformatted Country is provided.
 * */
class MalformattedCountryError extends Error {
    /**
     * @param {string} countryType   The type of the Country provided.
     * */
    constructor(countryType) {
        super(`Malformatted country.<element> provided, country.<element> type should be 'object' but is: ` + countryType);
        this.name = "MalformattedCountryError";
    }
}

/**
 * Error thrown when a null Country name is provided.
 * */
class NullCountryNameError extends Error {
    constructor() {
        super(`Provided country.name is null.`);
        this.name = "NullCountryNameError";
    }
}

/**
 * Error thrown when a malformatted Country name is provided.
 * */
class MalformattedCountryNameError extends Error {
    /**
     * @param {string} countryNameType   The type of the country name provided.
     * */
    constructor(countryNameType) {
        super(`Malformatted country.name provided, country.name type should be 'string' but is: ` + countryNameType);
        this.name = "MalformattedCountryNameError";
    }
}

/**
 * Error thrown when a null Country people is provided.
 * */
class NullCountryPeopleError extends Error {
    /**
     * @param {string} countryName  The name of the country.
     * */
    constructor(countryName) {
        super(`Provided country[${countryName}].people is null.`);
        this.name = "NullCountryPeopleError";
    }
}

/**
 * Error thrown when a malformatted  people is provided.
 * */
class MalformattedCountryPeopleError extends Error {
    /**
     * @param {string} countryName         The name of the country in which the person is.
     * @param {string} countryPeopleType   The type of the country people provided.
     * */
    constructor(countryName, countryPeopleType) {
        super(`Malformatted country[${countryName}].people provided, country.people type should be 'object' but is: ` + countryPeopleType);
        this.name = "MalformattedCountryPeopleError";
    }
}




///////////////
// Functions //
///////////////

/**
 * Filters the animals according to a filter that must contained in the name of the animal.
 * Throws an NullAnimalError, MalformattedAnimalError, NullAnimalNameError, MalformattedAnimalNameError.
 * @param {List<Object.<string, string>>}       animals     The animals to be filtered.
 * @param {string}                              nameFilter  The filter to be applied on the animals names to check if it is contained.
 * @param {string}                              countryName The name of the country in which the animal is. Usefull to debug.
 * @param {string}                              peopleName  The name of the person owning the animal. Usefull to debug.
 * @returns {List<Object.<string, string>>}     The animals once filtered.
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

/**
 * Filters the people and their animals according to a filter that must be contained in the name of the animal.
 * Throw NullPersonError, MalformattedPersonError, NullPersonNameError, MalformattedPersonNameError, NullPersonAnimalsError, MalformattedPersonAnimalsError.
 * @param {List<Object.<string, string | List<Object.<string, string>>>>}       people              The people to be filtered.
 * @param {string}                                                              animalNamesFilter   The filter to be applied on the animals names to check if it is contained.
 * @param {string}                                                              countryName         The name of the country in which the animal is. Usefull to debug.
 * @param {boolean}                                                             doCount             Does the number of animals filtered should be appended to the name of the poeple in the returned list.
 * @returns {List<Object.<string, string | List<Object.<string, string>>>>}     The poeple once their animals have been filtered.
 * */
function filterPeople(people, animalNamesFilter, countryName, doCount) {

    /** The result list of poeple once the their animals have been processed.
     * @type {List<Object.<string, string | List<Object.<string, string>>>>}
     * */
    const resultPeople = [];

    people.forEach(person => {

        if (person === null) {
            throw new NullPersonError(countryName);
            /* istanbul ignore next */
            process.exit(1);
        }
        const peopleType = typeof (person);
        if (peopleType != 'object') {
            throw new MalformattedPersonError(countryName, peopleType);
            /* istanbul ignore next */
            process.exit(1);
        }

        if (person.name === null) {
            throw new NullPersonNameError(countryName);
            /* istanbul ignore next */
            process.exit(1);
        }
        const peopleNameType = typeof (person.name);
        if (peopleNameType != 'string') {
            throw new MalformattedPersonNameError(countryName, peopleNameType);
            /* istanbul ignore next */
            process.exit(1);
        }

        if (person.animals === null) {
            throw new NullPersonAnimalsError(countryName);
            /* istanbul ignore next */
            process.exit(1);
        }
        const peopleAnimalsType = typeof (person.animals);
        if (peopleAnimalsType != 'object') {
            throw new MalformattedPersonAnimalsError(countryName, peopleAnimalsType);
            /* istanbul ignore next */
            process.exit(1);
        }

        /** The result list of animals of that person of this country once the data has been processed.
         * @type {List<Object.<string, string>>}
         * */
        const resultAnimals = animalNamesFilter ? filterAnimals(person.animals, animalNamesFilter, countryName, person.name) : person.animals;
        const nAnimals = resultAnimals.length;
        if (nAnimals != 0) resultPeople.push({ name: doCount ? person.name + ' [' + nAnimals + ']' : person.name, animals: resultAnimals });
    });

    return resultPeople;
}

/* istanbul ignore next */
/**
 * Filters the countries and their people and their animals according to a filter that must be contained in the name of the animal.
 * @param {List<Object.<string, string | List<Object.<string, string | List<Object.<string, string>>>>>>}       countries The countries to be filtered.
 * @param {string}                                                                                              animalNamesFilter   The filter to be applied on the animals names to check if it is contained.
 * @param {boolean}                                                                                             doCount             Does the number of animals filtered should be appended to the name of the poeple in the returned list.
 * @returns {List<Object.<string, string | List<Object.<string, string | List<Object.<string, string>>>>>>}     The countries once their people and their animals have been filtered.
 * */
function filterCountries(countries, animalNamesFilter, doCount) {
    /** The result list of countries once the data has been processed.
     * @type {List<Object.<string, string | List<Object.<string, string | List<Object.<string, string>>>>>>}
     * */
    const resultCountries = [];

    countries.forEach(country => {

        if (country === null) {
            throw new NullCountryError();
            /* istanbul ignore next */
            process.exit(1);
        }
        const countryType = typeof (country);
        if (countryType != 'object') {
            throw new MalformattedCountryError(countryType);
            /* istanbul ignore next */
            process.exit(1);
        }

        if (country.name === null) {
            throw new NullCountryNameError();
            /* istanbul ignore next */
            process.exit(1);
        }
        const countryNameType = typeof (country.name);
        if (countryNameType != 'string') {
            throw new MalformattedCountryNameError(countryNameType);
            /* istanbul ignore next */
            process.exit(1);
        }

        if (country.people === null) {
            throw new NullCountryPeopleError(country.name);
            /* istanbul ignore next */
            process.exit(1);
        }
        const countryPeopleType = typeof (country.people);
        if (countryPeopleType != 'object') {
            throw new MalformattedCountryPeopleError(country.name, countryPeopleType);
            /* istanbul ignore next */
            process.exit(1);
        }

        /** The result list of poeple of this country once the data has been processed.
         * @type {List<Object.<string, string | List<Object.<string, string>>>>}
         * */
        const resultPeople = filterPeople(country.people, animalNamesFilter, country.name, doCount)

        const nPeople = resultPeople.length;
        if (nPeople != 0) resultCountries.push({ name: doCount ? country.name + ' [' + nPeople + ']' : country.name, people: resultPeople });
    });

    return resultCountries;
}

module.exports = {
    filterAnimals,
    NullAnimalError,
    MalformattedAnimalError,
    NullAnimalNameError,
    MalformattedAnimalNameError,
    filterPeople,
    NullPersonError,
    MalformattedPersonError,
    NullAnimalNameError,
    MalformattedPersonNameError,
    NullPersonAnimalsError,
    MalformattedPersonAnimalsError,
    filterCountries,
    NullCountryError,
    MalformattedCountryError,
    NullCountryNameError,
    MalformattedCountryNameError,
    NullCountryPeopleError,
    MalformattedCountryPeopleError
};