# AwesomeTest

![CI badge](https://img.shields.io/badge/CI-pass-green?style=for-the-badge) ![Coverage badge](https://img.shields.io/badge/COVERAGE-100%25-green?style=for-the-badge) ![Fun badge](https://img.shields.io/badge/FUN-100%25-green?style=for-the-badge)

## Table of Content

- [Explanation](#Explanation)
- [Usage](#Usage)
- [Lint](#Lint)
- [Test](#Test)

## Explanation

This application processes the data found in the file `./data.js.txt`. This data must be formatted as this example:  
```javascript
const data = [{
  name: 'Dillauti',
  people:
    [{
      name: 'Winifred Graham',
      animals:
        [{name: 'Anoa'},
          {name: 'Duck'},
          {name: 'Narwhal'},
          {name: 'Badger'},
          {name: 'Cobra'},
          {name: 'Crow'}]
    },
      {
        name: 'Blanche Viciani',
        animals:
          [{name: 'Barbet'},
            {name: 'Rhea'},
            {name: 'Snakes'}]
        }
    ]
  },
  {
    name: 'Tohabdal',
    people:
      [{
        name: 'Effie Houghton',
        animals:
          [{name: 'Zebra'},
            {name: 'Ring-tailed Lemur'},
            {name: 'Fly'},
            {name: 'Blue Iguana'},
            {name: 'Emu'},
            {name: 'African Wild Ass'},
            {name: 'Numbat'}]
      },
        {
          name: 'Essie Bennett',
          animals:
            [{name: 'Aldabra Tortoise'},
              {name: 'Patagonian Toothfish'},
              {name: 'Giant Panda'},
              {name: 'Goat'},
              {name: 'Quahog'},
              {name: 'Collared Lemur'},
              {name: 'Aldabra Tortoise'}]
        }
     ]
    }
   ];

module.exports = {
  data
}
```

The processing can have two roles:  
- Filtering the elements according to the `--filter` option, if used;
- Counting the elements if the option `--count` is used.

At least one of those two options must be used. No particular order in the usage of the options is needed.

## Usage
`node src/app.js [--filter=<value>] [--count] [--help]`  

#### Options:

- `--filter=<value>` Filter the animals to be considered by this `<value>`. Only the animals whose names contain this string will be considered. The `<value>` of the `--filter` option must be a string.  

- `--count` Displays the count of elements under a parent element (animals for a person, people for a country) by appending it to the name of the parent. The `--count` option does not take any additionnal value.

- `--help` Displays the help message.

Please provide at least one of those options and maximum 2. `--filter` and `--count` can be combined.

#### Example:

`node src/app.js --filter=ry --count`  

## Lint
`npx eslint src/ __tests__/`

## Test
`npm test`

## Environment variables

- `DEBUG` Set this to 1 in order to activate some debug logs. Any other value will deactivate them.

- `TESTPOWER` Set this number to represent the number of times that randomzed tests will be run. Default is 100.