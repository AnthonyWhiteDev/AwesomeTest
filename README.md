# AwesomeTest

![CI badge](https://img.shields.io/badge/CI-pass-green?style=for-the-badge) ![Coverage badge](https://img.shields.io/badge/coverage-100-green?style=for-the-badge)

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
Please provide at least one of those options.  
The `<value>` of the `--filter` option must be a string.  
The `--count` option does not take any additionnal value.
The `--help` option does not take any additionnal value.

## Lint
`npx eslint src/ __tests__/`

## Test
`npm test`