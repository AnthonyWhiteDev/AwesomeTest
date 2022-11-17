const main = require('../src/main');

test('adds 1 + 2 to equal 3', () => {
    expect(main.sum(1, 2)).toBe(3);
});

test('adds 1 + 2 to equal 3', () => {
    expect(main.subtract(1, 2)).toBe(-1);
});