'use strict';

const ArgsChecker = require('../../src/tools/argsChecker');
const TEST_POWER = require('../test_config').TEST_POWER;

class MockProgramArgumentsProvider extends ArgsChecker.ProgramArgumentsProvider {
    constructor(args) {
        super();
        this.args = args;
    }
    provideProgramArguments() {
        return this.args;
    }
}

test('getProgramArguments throws when number of arguments greater than nMaximumArgs', () => {
    for (let i = 0; i < TEST_POWER; i++) {
        let min = 2 + Math.floor(Math.random() * 100001);
        let max = min + Math.floor(Math.random() * 100001);
        let size = max + 10;
        max -= 2;
        min -= 2;
        expect(() => ArgsChecker.getProgramArguments(new MockProgramArgumentsProvider(Array(size).fill(0)), min, max)).toThrow(ArgsChecker.InvalidNumberOfArgumentsError);
    }
});


test('getProgramArguments throws when number of arguments lesser than nMinimumArgs', () => {
    for (let i = 0; i < TEST_POWER; i++) {
        let min = 10 + Math.floor(Math.random() * 100001);
        let max = min + Math.floor(Math.random() * 100001);
        let size = min - 5;
        max -= 2;
        min -= 2;
        expect(() => ArgsChecker.getProgramArguments(new MockProgramArgumentsProvider(Array(size).fill(0)), min, max)).toThrow(ArgsChecker.InvalidNumberOfArgumentsError);
    }
});

test('getProgramArguments does NOT throw when valid number of arguments', () => {
    for (let i = 0; i < TEST_POWER; i++) {
        let min = 2 + Math.floor(Math.random() * 100001);
        let size = min + Math.floor(Math.random() * 100001);
        let max = min + size - 2;
        min -= 2;
        expect(() => ArgsChecker.getProgramArguments(new MockProgramArgumentsProvider(Array(size).fill(0)), min, max)).not.toThrow(ArgsChecker.InvalidNumberOfArgumentsError);
    }
});

test('getProgramArguments removes first two', () => {
    for (let i = 0; i < TEST_POWER; i++) {
        let min = 2 + Math.floor(Math.random() * 100001);
        let size = min + Math.floor(Math.random() * 100001);
        let max = min + size - 2;
        min -= 2;
        expect(ArgsChecker.getProgramArguments(new MockProgramArgumentsProvider(Array(size).fill(0)), min-2, max).length).toBe(size-2);
    }
});

test('getProgramArguments does not test minimum number of arguments if nMinimumArguments is null', () => {
    for (let i = 0; i < TEST_POWER; i++) {
        let max = 2 + Math.floor(Math.random() * 100001);
        expect(()=>ArgsChecker.getProgramArguments(new MockProgramArgumentsProvider(Array(Math.floor(Math.random() * max)).fill(0)), null, max)).not.toThrow(ArgsChecker.InvalidNumberOfArgumentsError);
    }
});

test('getProgramArguments does not test maximum number of arguments if nMaximumArguments is null', () => {
    for (let i = 0; i < TEST_POWER; i++) {
        let min = 2 + Math.floor(Math.random() * 100001);
        let size = min + Math.floor(Math.random() * 100001);
        min -= 2;
        expect(() => ArgsChecker.getProgramArguments(new MockProgramArgumentsProvider(Array(size).fill(0)), min, null)).not.toThrow(ArgsChecker.InvalidNumberOfArgumentsError);
    }
});

test('getProgramArguments does not test maximum number of arguments if nMaximumArguments is not provided', () => {
    for (let i = 0; i < TEST_POWER; i++) {
        let min = 2 + Math.floor(Math.random() * 100001);
        let size = min + Math.floor(Math.random() * 100001);
        min -= 2;
        expect(() => ArgsChecker.getProgramArguments(new MockProgramArgumentsProvider(Array(size).fill(0)), min)).not.toThrow(ArgsChecker.InvalidNumberOfArgumentsError);
    }
});

test('getProgramArguments still throws if nMinimumArguments is null and nMaximumArguments is not null and under arguments length', () => {
    for (let i = 0; i < TEST_POWER; i++) {
        let min = 2 + Math.floor(Math.random() * 100001);
        let max = min + Math.floor(Math.random() * 100001);
        let size = max + 10;
        max -= 2;
        expect(() => ArgsChecker.getProgramArguments(new MockProgramArgumentsProvider(Array(size).fill(0)), null, max)).toThrow(ArgsChecker.InvalidNumberOfArgumentsError);
    }
});

test('getProgramArguments still throws if nMaximumArguments is null and nMinimumArguments is not null and above arguments length', () => {
    for (let i = 0; i < TEST_POWER; i++) {
        let min = 10 + Math.floor(Math.random() * 100001);
        let size = min - 5;
        min -= 2;
        expect(() => ArgsChecker.getProgramArguments(new MockProgramArgumentsProvider(Array(size).fill(0)), min, null)).toThrow(ArgsChecker.InvalidNumberOfArgumentsError);
    }
});

test('getProgramArguments does not throw if nMaximumArguments is null and nMinimumArguments is null', () => {
    for (let i = 0; i < TEST_POWER; i++) {
        expect(() => ArgsChecker.getProgramArguments(new MockProgramArgumentsProvider(Array(10 + Math.floor(Math.random() * 100001)).fill(0)), null, null)).not.toThrow(ArgsChecker.InvalidNumberOfArgumentsError);
    }
});

test('getProgramArguments does not throw if nMaximumArguments and nMinimumArguments are not provided', () => {
    for (let i = 0; i < TEST_POWER; i++) {
        expect(() => ArgsChecker.getProgramArguments(new MockProgramArgumentsProvider(Array(10 + Math.floor(Math.random() * 100001)).fill(0)))).not.toThrow(ArgsChecker.InvalidNumberOfArgumentsError);
    }
});

test('getProgramArguments throws if Invalid ProgramArgumentsProvider', () => {
    for (let i = 0; i < TEST_POWER; i++) {
        expect(()=>ArgsChecker.getProgramArguments(null, null, null)).toThrow(ArgsChecker.InvalidProgramArgumentsProviderError);
    }
});

test('getProgramArguments throws if provideProgramArguments fails', () => {
    for (let i = 0; i < TEST_POWER; i++) {
        expect(() => ArgsChecker.getProgramArguments(new ArgsChecker.ProgramArgumentsProvider(), null, null)).toThrow(ArgsChecker.ProgramArgumentsProvisionError);
    }
});

test('parseProgramArguments returns [] if argumentsList is null', () => {
    for (let i = 0; i < TEST_POWER; i++) {
        expect(ArgsChecker.parseProgramArguments(null)).toStrictEqual([]);
    }
});

test('parseProgramArguments throws if argument `=` but without `--`', () => {
    for (let i = 0; i < TEST_POWER; i++) {
        const size = Math.floor(Math.random() * 100001);
        const args = Array(size).fill('--correctly=formatted');
        args[Math.floor(Math.random() * size)] = 'badly=formatted';
        expect(() => ArgsChecker.parseProgramArguments(args)).toThrow(ArgsChecker.MalformattedProgramArgumentProvidedError);
    }
});

test('parseProgramArguments throws if argument with `=` but no value', () => {
    for (let i = 0; i < TEST_POWER; i++) {
        const size = Math.floor(Math.random() * 100001);
        const args = Array(size).fill('--correctly=formatted');
        args[Math.floor(Math.random() * size)] = '--bad=';
        expect(() => ArgsChecker.parseProgramArguments(args)).toThrow(ArgsChecker.MalformattedProgramArgumentProvidedError);
    }
});

test('parseProgramArguments throws if argument with `=` but `-` only', () => {
    for (let i = 0; i < TEST_POWER; i++) {
        const size = Math.floor(Math.random() * 100001);
        const args = Array(size).fill('--correctly=formatted');
        args[Math.floor(Math.random() * size)] = '-badly==fomatted';
        expect(() => ArgsChecker.parseProgramArguments(args)).toThrow(ArgsChecker.MalformattedProgramArgumentProvidedError);
    }
});

test('parseProgramArguments throws if argument with `-` only', () => {
    for (let i = 0; i < TEST_POWER; i++) {
        const size = Math.floor(Math.random() * 100001);
        const args = Array(size).fill('--correctly=formatted');
        args[Math.floor(Math.random() * size)] = '-bad';
        expect(() => ArgsChecker.parseProgramArguments(args)).toThrow(ArgsChecker.MalformattedProgramArgumentProvidedError);
    }
});

test('parseProgramArguments throws if argument without `--` nor `=`', () => {
    for (let i = 0; i < TEST_POWER; i++) {
        const size = Math.floor(Math.random() * 100001);
        const args = Array(size).fill('--correctly=formatted');
        args[Math.floor(Math.random() * size)] = 'bad';
        expect(() => ArgsChecker.parseProgramArguments(args)).toThrow(ArgsChecker.MalformattedProgramArgumentProvidedError);
    }
});

test('parseProgramArguments sets proper value if `=` is used', () => {
    for (let i = 0; i < TEST_POWER; i++) {
        const key = Math.floor(Math.random() * 100001);
        const value = Math.floor(Math.random() * 100001);
        const size = Math.floor(Math.random() * 100001);
        const args = Array(size).fill('--correctly=formatted');
        args[Math.floor(Math.random() * size)] = '--' + key + '=' + value;
        expect(ArgsChecker.parseProgramArguments(args)[key]).toEqual(value.toString());
    }
});

test('parseProgramArguments sets proper value `true` if `=` is not used', () => {
    for (let i = 0; i < TEST_POWER; i++) {
        const key = Math.floor(Math.random() * 100001);
        const size = Math.floor(Math.random() * 100001);
        const args = Array(size).fill('--correctly=formatted');
        args[Math.floor(Math.random() * size)] = '--' + key;
        expect(ArgsChecker.parseProgramArguments(args)[key]).toBe(true);
    }
});