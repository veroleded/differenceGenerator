# differenceGenerator
[![Maintainability](https://api.codeclimate.com/v1/badges/844a17bc1201eeaf7e36/maintainability)](https://codeclimate.com/github/veroleded/differenceGenerator/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/844a17bc1201eeaf7e36/test_coverage)](https://codeclimate.com/github/veroleded/differenceGenerator/test_coverage)

## Description
  A difference generator is a program that determines the difference between two data structures. This is a popular task for which there are many online services, such as http://www.jsondiff.com/. Such a mechanism is used when outputting tests or when automatically tracking changes in configuration files.
# Utility features:
* Support for different input formats: yaml, json
* Report generation as plain text, stylish and json

# Download:
```bash
git clone git@github.com:veroleded/differenceGenerator.git
```

# Install:
```bash
make install
```

# To globally install a package from a local directory:
```bash
npm link
```

# Get more information about the program
```bash
gendiff --help
```

# Run program
```bash
gendiff [filepath] [filepath]
```

# Run features

The path to the file can be absolute or relative

## Run tests
```bash
make test
```

### Example of gendiff work:
``` js
// формат plain
gendiff --format plain path/to/file.yml another/path/file.json

Property 'common.follow' was added with value: false
Property 'group1.baz' was updated. From 'bas' to 'bars'
Property 'group2' was removed

// формат stylish
gendiff filepath1.json filepath2.json

{
  + follow: false
    setting1: Value 1
  - setting2: 200
  - setting3: true
  + setting3: {
        key: value
    }
  + setting4: blah blah
  + setting5: {
        key5: value5
    }
}
```