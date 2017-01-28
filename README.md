# Babel Plugin Auto Return

[![Greenkeeper badge](https://badges.greenkeeper.io/Nitive/babel-plugin-auto-return.svg)](https://greenkeeper.io/)
[![Circle CI](https://circleci.com/gh/Nitive/babel-plugin-auto-return.svg?style=svg)](https://circleci.com/gh/Nitive/babel-plugin-auto-return)
[![codecov.io](https://codecov.io/github/Nitive/babel-plugin-auto-return/coverage.svg?branch=master)](https://codecov.io/github/Nitive/babel-plugin-auto-return?branch=master)
🤖 work in progress 🤖

Babel plugin for auto return like in Ruby and CoffeeScript

- [x] plain functions
- [x] arrow functions
- [x] ES6 classes support
- [x] nested
- [ ] return object
- [x] React jsx
- [ ] More tests
- [ ] Examples
- [ ] Publish to npm


## Installation

```sh
$ npm install babel-plugin-auto-return
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

```json
{
  "plugins": ["auto-return"]
}
```

### Via CLI

```sh
$ babel --plugins auto-return script.js
```

### Via Node API

```javascript
require("babel-core").transform("code", {
  plugins: ["auto-return"]
});
```


## Good cases
##### Component
before:
```javascript
class Hello extends React.Component {
  render() {
    return (
      <div>
        <span>hello</span>
      </div>
    )
  }
}
```

now:
```javascript
class Hello extends React.Component {
  render() {
    <div>
      <span>hello</span>
    </div>
  }
}
```

#### Stateless component
```javascript
const Hello = props => (
  <div>
    <span>hello</span>
  </div>
)
```
and when you want to add variable (a lot of corrections)
```javascript
const Hello = props => {
  const text = 'hello';
  return (
    <div>
      <span>{text}</span>
    </div>
  )
}
```

but now:
```javascript
const Hello = props => {
  <div>
    <span>hello</span>
  </div>
}
```
and
```javascript
const Hello = props => {
  const text = 'hello'; // just add line (semicolon required)
  <div>
    <span>{text}</span>
  </div>
}
```
