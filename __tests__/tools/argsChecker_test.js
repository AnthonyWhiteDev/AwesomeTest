'use strict';

const ArgsChecker = require('../../src/tools/argsChecker');

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
    for (let i = 0; i < 1000; i++) {
        let min = 2 + Math.floor(Math.random() * 1001);
        let max = min + Math.floor(Math.random() * 1001);
        let size = max + 10;
        max -= 2;
        min -= 2;
        expect(() => ArgsChecker.getProgramArguments(new MockProgramArgumentsProvider(Array(size).fill(0)), min, max)).toThrow(ArgsChecker.InvalidNumberOfArgumentsError);
    }
});


test('getProgramArguments throws when number of arguments lesser than nMinimumArgs', () => {
    for (let i = 0; i < 1000; i++) {
        let min = 10 + Math.floor(Math.random() * 1001);
        let max = min + Math.floor(Math.random() * 1001);
        let size = min - 5;
        max -= 2;
        min -= 2;
        expect(() => ArgsChecker.getProgramArguments(new MockProgramArgumentsProvider(Array(size).fill(0)), min, max)).toThrow(ArgsChecker.InvalidNumberOfArgumentsError);
    }
});

test('getProgramArguments does NOT throw when valid number of arguments', () => {
    for (let i = 0; i < 1000; i++) {
        let min = 2 + Math.floor(Math.random() * 1001);
        let size = min + Math.floor(Math.random() * 1001);
        let max = min + size - 2;
        min -= 2;
        expect(() => ArgsChecker.getProgramArguments(new MockProgramArgumentsProvider(Array(size).fill(0)), min, max)).not.toThrow(ArgsChecker.InvalidNumberOfArgumentsError);
    }
});

test('getProgramArguments removes first two', () => {
    for (let i = 0; i < 1000; i++) {
        let min = 2 + Math.floor(Math.random() * 1001);
        let size = min + Math.floor(Math.random() * 1001);
        let max = min + size - 2;
        min -= 2;
        expect(ArgsChecker.getProgramArguments(new MockProgramArgumentsProvider(Array(size).fill(0)), min-2, max).length).toBe(size-2);
    }
});

test('getProgramArguments does not test minimum number of arguments if nMinimumArguments is null', () => {
    for (let i = 0; i < 1000; i++) {
        let max = 2 + Math.floor(Math.random() * 1001);
        expect(()=>ArgsChecker.getProgramArguments(new MockProgramArgumentsProvider(Array(Math.floor(Math.random() * max)).fill(0)), null, max)).not.toThrow(ArgsChecker.InvalidNumberOfArgumentsError);
    }
});

test('getProgramArguments does not test maximum number of arguments if nMaximumArguments is null', () => {
    for (let i = 0; i < 1000; i++) {
        let min = 2 + Math.floor(Math.random() * 1001);
        let size = min + Math.floor(Math.random() * 1001);
        min -= 2;
        expect(() => ArgsChecker.getProgramArguments(new MockProgramArgumentsProvider(Array(size).fill(0)), min, null)).not.toThrow(ArgsChecker.InvalidNumberOfArgumentsError);
    }
});

test('getProgramArguments still throws if nMinimumArguments is null and nMaximumArguments is not null and under arguments length', () => {
    for (let i = 0; i < 1000; i++) {
        let min = 2 + Math.floor(Math.random() * 1001);
        let max = min + Math.floor(Math.random() * 1001);
        let size = max + 10;
        max -= 2;
        expect(() => ArgsChecker.getProgramArguments(new MockProgramArgumentsProvider(Array(size).fill(0)), null, max)).toThrow(ArgsChecker.InvalidNumberOfArgumentsError);
    }
});

test('getProgramArguments still throws if nMaximumArguments is null and nMinimumArguments is not null and above arguments length', () => {
    for (let i = 0; i < 1000; i++) {
        let min = 10 + Math.floor(Math.random() * 1001);
        let size = min - 5;
        min -= 2;
        expect(() => ArgsChecker.getProgramArguments(new MockProgramArgumentsProvider(Array(size).fill(0)), min, null)).toThrow(ArgsChecker.InvalidNumberOfArgumentsError);
    }
});

test('getProgramArguments does not throw if nMaximumArguments is null and nMinimumArguments is null', () => {
    for (let i = 0; i < 1000; i++) {
        expect(() => ArgsChecker.getProgramArguments(new MockProgramArgumentsProvider(Array(10 + Math.floor(Math.random() * 1001)).fill(0)), null, null)).not.toThrow(ArgsChecker.InvalidNumberOfArgumentsError);
    }
});

test('getProgramArguments throws if Invalid ProgramArgumentsProvider', () => {
    for (let i = 0; i < 1000; i++) {
        expect(()=>ArgsChecker.getProgramArguments(null, null, null)).toThrow(ArgsChecker.InvalidProgramArgumentsProviderError);
    }
});

test('getProgramArguments throws if provideProgramArguments fails', () => {
    for (let i = 0; i < 1000; i++) {
        expect(() => ArgsChecker.getProgramArguments(new ArgsChecker.ProgramArgumentsProvider(), null, null)).toThrow(ArgsChecker.ProgramArgumentsProvisionError);
    }
});