# Binary land

A general purpose bit visualization and manipulation tool.


### Todo

- [ ] Select specific bit range

### In progress

- [x] View the binary representation of a number
  - [x] Basic functionality
  - [x] Fix max safe integer limit via bigint
  - [ ] Add support for floating point numbers
  - [ ] Add support for negative numbers

### Completed ✓

- [x] Toggle specific bits on click
- [x] Show operations on selected bit range
  - [x] Extract bit range from number (e.g. `(input >> 4) & 0b1111`)
  - [x] Set bit range in number (e.g. `input | (0b1111 << 4)`) 
  - [x] Compare bit range in number (e.g. `(input >> 4) & 0b1111 == 0b1111`)