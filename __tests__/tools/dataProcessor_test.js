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