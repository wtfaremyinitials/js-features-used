js-features-used
===

![](https://img.shields.io/npm/dm/js-features-used.svg)
![](https://img.shields.io/npm/v/js-features-used.svg)
![](https://img.shields.io/npm/l/js-features-used.svg)
[![styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg)](https://github.com/prettier/prettier)

> Detect the JavaScript language features used in code

```js
var featuresUsed = require('features-used')

console.log(featuresUsed(`
const foo = 'bar'
let baz = { foo }

async function main() {
    const r = /hello/u
    baz.foo.match(r)
}

main()
`))

/*
 [ { name: 'const bindings', requiredVersion: '4.8.3' },
   { name: 'let bindings', requiredVersion: '4.8.3' },
   { name: 'literal shorthand', requiredVersion: '4.8.3' },
   { name: 'async functions', requiredVersion: '7.10.0' },
   { name: 'regex y and u flags', requiredVersion: '6.4.0' } ]
*/
```
