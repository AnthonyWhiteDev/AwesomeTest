'use strict';

const DataProcessor = require('../../src/tools/dataProcessor');
const TEST_POWER = require('../test_config').TEST_POWER;

test('filterAnimals throws when a null animal', () => {
    for (let i = 0; i < TEST_POWER; i++) {
        const size = Math.floor(Math.random() * 1001);
        const animals = Array(size + 2).fill({ name: 'MockAnimal' });
        animals[Math.floor(Math.random() * size)] = null;
        expect(() => DataProcessor.filterAnimals(animals, "mockFilter", "MockCountry", "MockPeople")).toThrow(DataProcessor.NullAnimalError);
    }
});

test('filterAnimals throws when an animal is a number', () => {
    for (let i = 0; i < TEST_POWER; i++) {
        const size = Math.floor(Math.random() * 1001);
        const animals = Array(size + 2).fill({ name: 'MockAnimal' });
        animals[Math.floor(Math.random() * size)] = 3;
        expect(() => DataProcessor.filterAnimals(animals, "mockFilter", "MockCountry", "MockPeople")).toThrow(DataProcessor.MalformattedAnimalError);
    }
});

test('filterAnimals throws when an animal is a string', () => {
    for (let i = 0; i < TEST_POWER; i++) {
        const size = Math.floor(Math.random() * 1001);
        const animals = Array(size + 2).fill({ name: 'MockAnimal' });
        animals[Math.floor(Math.random() * size)] = '3';
        expect(() => DataProcessor.filterAnimals(animals, "mockFilter", "MockCountry", "MockPeople")).toThrow(DataProcessor.MalformattedAnimalError);
    }
});

test('filterAnimals does NOT throw when an animal is an object', () => {
    for (let i = 0; i < TEST_POWER; i++) {
        const size = Math.floor(Math.random() * 1001);
        const animals = Array(size + 2).fill({ name: 'MockAnimal' });
        expect(() => DataProcessor.filterAnimals(animals, "mockFilter", "MockCountry", "MockPeople")).not.toThrow();
    }
});

test('filterAnimals throws when a null animal name', () => {
    for (let i = 0; i < TEST_POWER; i++) {
        const size = Math.floor(Math.random() * 1001);
        const animals = Array(size + 2).fill({ name: 'MockAnimal' });
        animals[Math.floor(Math.random() * size)] = { name: null };
        expect(() => DataProcessor.filterAnimals([{ name: 'MockAnimal' }, { name: null }, { name: 'MockAnimal' }], "mockFilter", "MockCountry", "MockPeople")).toThrow(DataProcessor.NullAnimalNameError);
    }
});

test('filterAnimals throws when an animal name is a number', () => {
    for (let i = 0; i < TEST_POWER; i++) {
        const size = Math.floor(Math.random() * 1001);
        const animals = Array(size + 2).fill({ name: 'MockAnimal' });
        animals[Math.floor(Math.random() * size)] = { name: 3 };
        expect(() => DataProcessor.filterAnimals(animals, "mockFilter", "MockCountry", "MockPeople")).toThrow(DataProcessor.MalformattedAnimalNameError);
    }
});

test('filterAnimals throws when an animal name is an object', () => {
    for (let i = 0; i < TEST_POWER; i++) {
        const size = Math.floor(Math.random() * 1001);
        const animals = Array(size + 2).fill({ name: 'MockAnimal' });
        animals[Math.floor(Math.random() * size)] = { name: {} };
        expect(() => DataProcessor.filterAnimals(animals, "mockFilter", "MockCountry", "MockPeople")).toThrow(DataProcessor.MalformattedAnimalNameError);
    }
});

test('filterAnimals does NOT throw when an animal name is a string', () => {
    for (let i = 0; i < TEST_POWER; i++)
        expect(() => DataProcessor.filterAnimals(Array(Math.floor(Math.random() * 1001)).fill({ name: 'MockAnimal' }), "mockFilter", "MockCountry", "MockPeople")).not.toThrow();
});

test('filterAnimals does filter', () => {
    for (let i = 0; i < TEST_POWER; i++) {
        const size = Math.floor(Math.random() * 1001);
        const animals = Array(size + 2).fill({ name: 'MockAnimal' });
        const filter = Math.floor(Math.random() * 1001).toString();
        const nFiltered = Math.floor(Math.random() * size);
        for (let i = 0; i < nFiltered; i++)
            animals[i] = { name: filter };
        expect(DataProcessor.filterAnimals(animals, filter, "MockCountry", "MockPeople").length).toEqual(nFiltered);
    }
});








test('filterPeople throws when a null person', () => {
    for (let i = 0; i < TEST_POWER; i++) {
        const size = Math.floor(Math.random() * 1001);
        const people = Array(size + 2).fill({ name: 'MockPerson', animals: [] });
        people[Math.floor(Math.random() * size)] = null;
        expect(() => DataProcessor.filterPeople(people, "mockFilter", "MockCountry", false)).toThrow(DataProcessor.NullPersonError);
    }
});

test('filterPeople throws when a person is number', () => {
    for (let i = 0; i < TEST_POWER; i++) {
        const size = Math.floor(Math.random() * 1001);
        const people = Array(size + 2).fill({ name: 'MockPerson', animals: [] });
        people[Math.floor(Math.random() * size)] = 3;
        expect(() => DataProcessor.filterPeople(people, "mockFilter", "MockCountry", false)).toThrow(DataProcessor.MalformattedPersonError);
    }
});

test('filterPeople throws when a person is string', () => {
    for (let i = 0; i < TEST_POWER; i++) {
        const size = Math.floor(Math.random() * 1001);
        const people = Array(size + 2).fill({ name: 'MockPerson', animals: [] });
        people[Math.floor(Math.random() * size)] = '3';
        expect(() => DataProcessor.filterPeople(people, "mockFilter", "MockCountry", false)).toThrow(DataProcessor.MalformattedPersonError);
    }
});

test('filterPeople does NOT throw when a person is valid', () => {
    for (let i = 0; i < TEST_POWER; i++)
        expect(() => DataProcessor.filterPeople(Array(Math.floor(Math.random() * 1001)).fill({ name: 'MockPerson', animals: [] }), "mockFilter", "MockCountry", false)).not.toThrow();
});

test('filterPeople throws when a null person name', () => {
    for (let i = 0; i < TEST_POWER; i++) {
        const size = Math.floor(Math.random() * 1001);
        const people = Array(size + 2).fill({ name: 'MockPerson', animals: [] });
        people[Math.floor(Math.random() * size)] = { name: null, animals: []};
        expect(() => DataProcessor.filterPeople(people, "mockFilter", "MockCountry", false)).toThrow(DataProcessor.NullPersonNameError);
    }
});

test('filterPeople throws when a person name is number', () => {
    for (let i = 0; i < TEST_POWER; i++) {
        const size = Math.floor(Math.random() * 1001);
        const people = Array(size + 2).fill({ name: 'MockPerson', animals: [] });
        people[Math.floor(Math.random() * size)] = { name: 3, animals: [] };
        expect(() => DataProcessor.filterPeople(people, "mockFilter", "MockCountry", false)).toThrow(DataProcessor.MalformattedPersonNameError);
    }
});

test('filterPeople throws when a person name is object', () => {
    for (let i = 0; i < TEST_POWER; i++) {
        const size = Math.floor(Math.random() * 1001);
        const people = Array(size + 2).fill({ name: 'MockPerson', animals: [] });
        people[Math.floor(Math.random() * size)] = { name: {}, animals: [] };
        expect(() => DataProcessor.filterPeople(people, "mockFilter", "MockCountry", false)).toThrow(DataProcessor.MalformattedPersonNameError);
    }
});

test('filterPeople throws when a null person animals', () => {
    for (let i = 0; i < TEST_POWER; i++) {
        const size = Math.floor(Math.random() * 1001);
        const people = Array(size + 2).fill({ name: 'MockPerson', animals: [] });
        people[Math.floor(Math.random() * size)] = { name: 'MockPerson', animals: null };
        expect(() => DataProcessor.filterPeople(people, "mockFilter", "MockCountry", false)).toThrow(DataProcessor.NullPersonAnimalsError);
    }
});

test('filterPeople throws when a person animals is number', () => {
    for (let i = 0; i < TEST_POWER; i++) {
        const size = Math.floor(Math.random() * 1001);
        const people = Array(size + 2).fill({ name: 'MockPerson', animals: [] });
        people[Math.floor(Math.random() * size)] = { name: 'MockPerson', animals: 3 };
        expect(() => DataProcessor.filterPeople(people, "mockFilter", "MockCountry", false)).toThrow(DataProcessor.MalformattedPersonAnimalsError);
    }
});

test('filterPeople throws when a person name is string', () => {
    for (let i = 0; i < TEST_POWER; i++) {
        const size = Math.floor(Math.random() * 1001);
        const people = Array(size + 2).fill({ name: 'MockPerson', animals: [] });
        people[Math.floor(Math.random() * size)] = { name: 'MockPerson', animals: '3' };
        expect(() => DataProcessor.filterPeople(people, "mockFilter", "MockCountry", false)).toThrow(DataProcessor.MalformattedPersonAnimalsError);
    }
});

test('filterPeople does filter', () => {
    for (let i = 0; i < TEST_POWER; i++) {
        const size = Math.floor(Math.random() * 10);
        const filter = Math.floor(Math.random() * 1001).toString();
        const people = Array(size + 2).fill({ name: 'MockPerson', animals: [{ name: 'MockAnimal' }] });
        const nFiltered = Math.floor(Math.random() * size);
        for (let i = 0; i < nFiltered; i++)
            people[i] = { name: 'MockPerson', animals: [{ name: filter }] };
        expect(DataProcessor.filterPeople(people, filter, "MockCountry", false).length).toEqual(nFiltered);
    }
});

test('filterPeople does not filter animals when animalsNameFilter is null', () => {
    for (let i = 0; i < TEST_POWER; i++) {
        const size = Math.floor(Math.random() * 10);
        const filter = Math.floor(Math.random() * 1001).toString();
        const people = Array(size + 2).fill({ name: 'MockPerson', animals: [{ name: 'MockAnimal' }] });
        const nFiltered = Math.floor(Math.random() * size);
        for (let i = 0; i < nFiltered; i++)
            people[i] = { name: 'MockPerson', animals: [{ name: filter }] };
        expect(DataProcessor.filterPeople(people, null, "MockCountry", false).length).toEqual(people.length);
    }
});

test('filterPeople does append count when doCount is true', () => {
    for (let i = 0; i < TEST_POWER; i++) {
        const size = Math.floor(Math.random() * 10);
        const people = Array(size).fill({ name: 'MockPerson', animals: Array(Math.floor(Math.random() * 10)).fill({name: 'MockAnimal'})});
        DataProcessor.filterPeople(people, null, "MockCountry", true).forEach(person => {
            expect(person.name).toEqual('MockPerson [' + person.animals.length + ']');
        })
    }
});

test('filterPeople does NOT append count when doCount is false', () => {
    for (let i = 0; i < TEST_POWER; i++) {
        const size = Math.floor(Math.random() * 10);
        const people = Array(size).fill({ name: 'MockPerson', animals: Array(Math.floor(Math.random() * 10)).fill({ name: 'MockAnimal' }) });
        DataProcessor.filterPeople(people, null, "MockCountry", false).forEach(person => {
            expect(person.name).toEqual('MockPerson');
        })
    }
});








test('filterCountries throws when a null country', () => {
    for (let i = 0; i < TEST_POWER; i++) {
        const size = Math.floor(Math.random() * 1001);
        const countries = Array(size + 2).fill({ name: 'MockCountry', people: [{ name: 'MockPerson', animals: [] }] });
        countries[Math.floor(Math.random() * size)] = null;
        expect(() => DataProcessor.filterCountries(countries, "mockFilter", false)).toThrow(DataProcessor.NullCountryError);
    }
});

test('filterCountries throws when a country is number', () => {
    for (let i = 0; i < TEST_POWER; i++) {
        const size = Math.floor(Math.random() * 1001);
        const countries = Array(size + 2).fill({ name: 'MockCountry', people: [{ name: 'MockPerson', animals: [] }] });
        countries[Math.floor(Math.random() * size)] = 3;
        expect(() => DataProcessor.filterCountries(countries, "mockFilter", false)).toThrow(DataProcessor.MalformattedCountryError);
    }
});

test('filterCountries throws when a country is string', () => {
    for (let i = 0; i < TEST_POWER; i++) {
        const size = Math.floor(Math.random() * 1001);
        const countries = Array(size + 2).fill({ name: 'MockCountry', people: [{ name: 'MockPerson', animals: [] }] });
        countries[Math.floor(Math.random() * size)] = '3';
        expect(() => DataProcessor.filterCountries(countries, "mockFilter", false)).toThrow(DataProcessor.MalformattedCountryError);
    }
});

test('filterCountries throws when a country is string', () => {
    for (let i = 0; i < TEST_POWER; i++) {
        expect(() => DataProcessor.filterCountries(Array(Math.floor(Math.random() * 1001)).fill({ name: 'MockCountry', people: [{ name: 'MockPerson', animals: [] }] }), "mockFilter", false)).not.toThrow();
    }
});

test('filterCountries throws when a null country name', () => {
    for (let i = 0; i < TEST_POWER; i++) {
        const size = Math.floor(Math.random() * 1001);
        const countries = Array(size + 2).fill({ name: 'MockCountry', people: [{ name: 'MockPerson', animals: [] }] });
        countries[Math.floor(Math.random() * size)] = { name: null, people: [{ name: 'MockPerson', animals: [] }] };
        expect(() => DataProcessor.filterCountries(countries, "mockFilter", false)).toThrow(DataProcessor.NullCountryNameError);
    }
});

test('filterCountries throws when a country name is number', () => {
    for (let i = 0; i < TEST_POWER; i++) {
        const size = Math.floor(Math.random() * 1001);
        const countries = Array(size + 2).fill({ name: 'MockCountry', people: [{ name: 'MockPerson', animals: [] }] });
        countries[Math.floor(Math.random() * size)] = { name: 3, people: [{ name: 'MockPerson', animals: [] }] };
        expect(() => DataProcessor.filterCountries(countries, "mockFilter", false)).toThrow(DataProcessor.MalformattedCountryNameError);
    }
});

test('filterCountries throws when a country name is object', () => {
    for (let i = 0; i < TEST_POWER; i++) {
        const size = Math.floor(Math.random() * 1001);
        const countries = Array(size + 2).fill({ name: 'MockCountry', people: [{ name: 'MockPerson', animals: [] }] });
        countries[Math.floor(Math.random() * size)] = { name: {}, people: [{ name: 'MockPerson', animals: [] }] };
        expect(() => DataProcessor.filterCountries(countries, "mockFilter", false)).toThrow(DataProcessor.MalformattedCountryNameError);
    }
});

test('filterCountries throws when a country people is null', () => {
    for (let i = 0; i < TEST_POWER; i++) {
        const size = Math.floor(Math.random() * 1001);
        const countries = Array(size + 2).fill({ name: 'MockCountry', people: [{ name: 'MockPerson', animals: [] }] });
        countries[Math.floor(Math.random() * size)] = { name: 'MockCountry', people: null };
        expect(() => DataProcessor.filterCountries(countries, "mockFilter", false)).toThrow(DataProcessor.NullCountryPeopleError);
    }
});

test('filterCountries throws when a country people is number', () => {
    for (let i = 0; i < TEST_POWER; i++) {
        const size = Math.floor(Math.random() * 1001);
        const countries = Array(size + 2).fill({ name: 'MockCountry', people: [{ name: 'MockPerson', animals: [] }] });
        countries[Math.floor(Math.random() * size)] = { name: 'MockCountry', people: 3 };
        expect(() => DataProcessor.filterCountries(countries, "mockFilter", false)).toThrow(DataProcessor.MalformattedCountryPeopleError);
    }
});

test('filterCountries throws when a country people is string', () => {
    for (let i = 0; i < TEST_POWER; i++) {
        const size = Math.floor(Math.random() * 1001);
        const countries = Array(size + 2).fill({ name: 'MockCountry', people: [{ name: 'MockPerson', animals: [] }] });
        countries[Math.floor(Math.random() * size)] = { name: 'MockCountry', people: '3' };
        expect(() => DataProcessor.filterCountries(countries, "mockFilter", false)).toThrow(DataProcessor.MalformattedCountryPeopleError);
    }
});

test('filterCountries does filter', () => {
    for (let i = 0; i < TEST_POWER; i++) {
        const size = Math.floor(Math.random() * 10);
        const filter = Math.floor(Math.random() * 1001).toString();
        const countries = Array(size + 2).fill({ name: 'MockCountry', people: [{ name: 'MockPerson', animals: [{ name: 'MockAnimal' }] }] });
        const nFiltered = Math.floor(Math.random() * size);
        for (let i = 0; i < nFiltered; i++)
            countries[i] = { name: 'MockCountry', people: [{ name: 'MockPerson', animals: [{ name: filter }] }] };
        expect(DataProcessor.filterCountries(countries, filter, false).length).toEqual(nFiltered);
    }
});

test('filterCountries does not filter animals when animalsNameFilter is null', () => {
    for (let i = 0; i < TEST_POWER; i++) {
        const size = Math.floor(Math.random() * 10);
        const filter = Math.floor(Math.random() * 1001).toString();
        const countries = Array(size + 2).fill({ name: 'MockCountry', people: [{ name: 'MockPerson', animals: [{ name: 'MockAnimal' }] }] });
        const nFiltered = Math.floor(Math.random() * size);
        for (let i = 0; i < nFiltered; i++)
            countries[i] = { name: 'MockCountry', people: [{ name: 'MockPerson', animals: [{ name: filter }] }] };
        expect(DataProcessor.filterCountries(countries, null, false).length).toEqual(countries.length);
    }
});

test('filterCountries does append count when doCount is true', () => {
    for (let i = 0; i < TEST_POWER; i++) {
        const countries = Array(Math.floor(Math.random() * 10)).fill(
            {
                name: 'MockCountry', people: Array(Math.floor(Math.random() * 10)).fill(
                    {
                        name: 'MockPerson', animals: Array(Math.floor(Math.random() * 10)).fill(
                            { name: 'MockAnimal' })
                    })
            }
        );
        DataProcessor.filterCountries(countries, null, true).forEach(country => {
            expect(country.name).toEqual('MockCountry [' + country.people.length + ']');
        })
    }
});

test('filterCountries does NOT append count when doCount is true', () => {
    for (let i = 0; i < TEST_POWER; i++) {
        const countries = Array(Math.floor(Math.random() * 10)).fill(
            {
                name: 'MockCountry', people: Array(Math.floor(Math.random() * 10)).fill(
                    {
                        name: 'MockPerson', animals: Array(Math.floor(Math.random() * 10)).fill(
                            { name: 'MockAnimal' })
                    })
            }
        );
        DataProcessor.filterCountries(countries, null, false).forEach(country => {
            expect(country.name).toEqual('MockCountry');
        })
    }
});