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

test('getProgramArguments throws when invalid number of arguments', () => {
    for (let i = 0; i < 10000; i++) {
        let min = Math.floor(Math.random() * 1001);
        let max = min + Math.floor(Math.random() * 1001);
        expect(() => ArgsChecker.getProgramArguments(min, max, new MockProgramArgumentsProvider(Array(min + max + 1).fill(0)))).toThrow(ArgsChecker.InvalidNumberOfArgumentsError);
    }
});

test('getProgramArguments does NOT throw when invalid number of arguments', () => {
    for (let i = 0; i < 10000; i++) {
        let min = Math.floor(Math.random() * 1001);
        let max = min + Math.floor(Math.random() * 1001);
        let size = min + (Math.floor(Math.random() * (max - min + 1)));
        expect(() => ArgsChecker.getProgramArguments(min, max, new MockProgramArgumentsProvider(Array(size).fill(0)))).not.toThrow(ArgsChecker.InvalidNumberOfArgumentsError);
    }
});

test('getProgramArguments removes first two', () => {
    for (let i = 0; i < 10000; i++) {
        let min = Math.floor(Math.random() * 1001);
        let max = min + Math.floor(Math.random() * 1001);
        let size = min + (Math.floor(Math.random() * (max-min + 1)));
        expect(ArgsChecker.getProgramArguments(min, max, new MockProgramArgumentsProvider(Array(size).fill(0))).length).toBe(size-2);
    }
});