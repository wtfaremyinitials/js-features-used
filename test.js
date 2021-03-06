const test = require('ava')
const featuresUsed = require('.')

test('async functions', t => {
    var feat = require('./features/async-functions').feature

    t.true(
        featuresUsed('async function foo() {}').includes(feat),
        'async function feature not detected'
    )
    t.true(
        featuresUsed('async () => {}').includes(feat),
        'async function feature not detected'
    )
    t.true(
        featuresUsed('var o = { async foo() { } }').includes(feat),
        'async feature not detected'
    )
    t.true(
        featuresUsed('class A { async foo() { } }').includes(feat),
        'async feature not detected'
    )
    t.false(
        featuresUsed('function async() {}').includes(feat),
        'async function feature wrongly detected'
    )
    t.false(
        featuresUsed('() => {}').includes(feat),
        'async function feature wrongly detected'
    )
})

test('default function parameters', t => {
    var feat = require('./features/default-function-params').feature

    t.true(
        featuresUsed('function foo(a = 5) {}').includes(feat),
        'default function param feature not detected'
    )
    t.true(
        featuresUsed('(f = 3) => {}').includes(feat),
        'default function param feature not detected'
    )
    t.false(
        featuresUsed('f = 3').includes(feat),
        'default function param feature wrongly detected'
    )
})

test('arrow functions', t => {
    var feat = require('./features/arrow-functions').feature

    t.true(
        featuresUsed('() => {}').includes(feat),
        'arrow function feature not detected'
    )
    t.true(
        featuresUsed('async () => {}').includes(feat),
        'arrow function feature not detected'
    )
    t.false(
        featuresUsed('function arrow() {}').includes(feat),
        'arrow function feature wrongly detected'
    )
    t.false(
        featuresUsed('var fn = function() {}').includes(feat),
        'arrow function feature wrongly detected'
    )
})

test('rest parameters', t => {
    var feat = require('./features/rest-params').feature

    t.true(
        featuresUsed('function foo(...args) {}').includes(feat),
        'rest parameters feature not detected'
    )
    t.true(
        featuresUsed('function foo(a, b, c, ...args) {}').includes(feat),
        'rest parameters feature not detected'
    )
    t.true(
        featuresUsed('(...args) => {}').includes(feat),
        'rest parameters feature not detected'
    )
    t.false(
        featuresUsed('function foo(args) {}').includes(feat),
        'rest parameters feature wrongly detected'
    )
    t.false(
        featuresUsed('(args) => {}').includes(feat),
        'rest parameters feature wrongly detected'
    )
})

test('spread operator', t => {
    var feat = require('./features/spread-operator').feature

    t.true(
        featuresUsed('foo(...bar)').includes(feat),
        'spread operator feature not detected'
    )
    t.false(
        featuresUsed('foo.apply(this, bar)').includes(feat),
        'spread operator feature wrongly detected'
    )
})

test('computed properties', t => {
    var feat = require('./features/computed-properties').feature

    // computed properties
    t.true(
        featuresUsed('var x = "y"; var z = { [x]: 1 }').includes(feat),
        'computed properties feature not detected'
    )
    t.false(
        featuresUsed('var x = "y"; var z = { x: 1 }').includes(feat),
        'computed properties feature wrongly detected'
    )

    // computed shorthand methods
    t.true(
        featuresUsed('var x = "y"; var z = { [x]() { return 1 } }').includes(
            feat
        ),
        'computed properties feature not detected'
    )
    t.false(
        featuresUsed('var z = { y() { return 1 } }').includes(feat),
        'computed properties feature wrongly detected'
    )
})

test('object literal shorthand', t => {
    var feat = require('./features/literal-shorthand').feature

    // shorthand properties
    t.true(
        featuresUsed('var x = 1; var y = { x }').includes(feat),
        'object literal shorthand feature not detected'
    )
    t.false(
        featuresUsed('var x = 1; var y = { x: x }').includes(feat),
        'object literal shorthand feature wrongly detected'
    )

    // shorthand methods
    t.true(
        featuresUsed('var y = { foo() { return 1 } }').includes(feat),
        'object literal shorthand feature not detected'
    )
    t.false(
        featuresUsed('var y = { foo: () => { return 1 } }').includes(feat),
        'object literal shorthand feature wrongly detected'
    )

    // string-keyed shorthand methods
    t.true(
        featuresUsed('var y = { "foo bar"() { return 1 } }').includes(feat),
        'object literal shorthand feature not detected'
    )
    t.false(
        featuresUsed('var y = { "foo bar": () => { return 1 } }').includes(
            feat
        ),
        'object literal shorthand feature wrongly detected'
    )

    // computed shorthand methods
    t.true(
        featuresUsed('var x = "foo"; var y = { [x]() { return 1 } }').includes(
            feat
        ),
        'object literal shorthand feature not detected'
    )
    t.false(
        featuresUsed('var y = { foo: () => { return 1 } }').includes(feat),
        'object literal shorthand feature wrongly detected'
    )
})

test('computed accessors', t => {
    var feat = require('./features/computed-accessors').feature

    t.true(
        featuresUsed(
            `
            var x = "y";
            var z = {
                get [x] () { return 1 },
                set [x] (value) {  },
            }
        `
        ).includes(feat),
        'computed accessors feature not detected'
    )
    t.false(
        featuresUsed(
            `
            var z = {
                get y () { return 1 },
                set y (value) {  },
            }
        `
        ).includes(feat),
        'computed accessors feature wrongly detected'
    )
    t.false(
        featuresUsed('var x = "foo"; var y = { [x]() { return 1 } }').includes(
            feat
        ),
        'computed accessors feature wrongly detected'
    )
})

test('for..of loops', t => {
    var feat = require('./features/for-of').feature

    t.true(
        featuresUsed(
            `
            var x = [1, 2, 3]
            for (n of x) {
                console.log(x)
            }
        `
        ).includes(feat),
        'for..of loops feature not detected'
    )
    t.false(
        featuresUsed(
            `
            var x = [1, 2, 3]
            for (n in x) {
                console.log(x)
            }
        `
        ).includes(feat),
        'for..of loops feature wrongly detected'
    )
    t.false(
        featuresUsed(
            `
            var x = [1, 2, 3]
            for (var i=0; i<x.length; i++) {
                console.log(x)
            }
        `
        ).includes(feat),
        'for..of loops feature wrongly detected'
    )
})

test('octal and binary literals', t => {
    var feat = require('./features/octal-binary-literals').feature

    // octal literals
    t.true(
        featuresUsed('var x = 0o10').includes(feat),
        'octal literal feature not detected'
    )
    t.false(
        featuresUsed('var x = 8').includes(feat),
        'octal literal feature wrongly detected'
    )

    // binary literals
    t.true(
        featuresUsed('var x = 0b10').includes(feat),
        'binary literal feature not detected'
    )
    t.false(
        featuresUsed('var x = 2').includes(feat),
        'binary literal feature wrongly detected'
    )
    t.false(
        featuresUsed('var x = 0x2').includes(feat),
        'binary literal feature wrongly detected'
    )
})

test('template literals', t => {
    var feat = require('./features/template-literals').feature

    t.true(
        featuresUsed('var x = "world"; var y = `Hello, ${x}!`').includes(feat),
        'template literals feature not detected'
    )
    t.false(
        featuresUsed('var x = "world"; var y = "Hello, " + x + "!"').includes(
            feat
        ),
        'template literals feature wrongly detected'
    )
})

test('regex y and u flags (RegExp literal)', t => {
    var feat = require('./features/regex-y-u-flags').feature

    t.true(
        featuresUsed('var r = /w/y').includes(feat),
        'regex y flag feature not detected'
    )
    t.true(
        featuresUsed('var r = /w/yi').includes(feat),
        'regex y flag feature not detected'
    )
    t.true(
        featuresUsed('var r = /w/u').includes(feat),
        'regex u flag feature not detected'
    )
    t.true(
        featuresUsed('var r = /w/ui').includes(feat),
        'regex u flag feature not detected'
    )
    t.false(
        featuresUsed('var r = /w/g').includes(feat),
        'regex y flag feature feature wrongly detected'
    )
})

test('regex y and u flags (RegExp constructor)', t => {
    var feat = require('./features/regex-y-u-flags').feature

    t.true(
        featuresUsed('var r = new RegExp("\\w", "y")').includes(feat),
        'regex y flag feature not detected'
    )
    t.true(
        featuresUsed('var r = new RegExp("\\w", "yi")').includes(feat),
        'regex y flag feature not detected'
    )
    t.true(
        featuresUsed('var r = new RegExp("\\w", "u")').includes(feat),
        'regex u flag feature not detected'
    )
    t.true(
        featuresUsed('var r = new RegExp("\\w", "ui")').includes(feat),
        'regex u flag feature not detected'
    )
    t.false(
        featuresUsed('var r = new RegExp("\\w", "g")').includes(feat),
        'regex y flag feature feature wrongly detected'
    )
    t.false(
        featuresUsed('var r = new RegExp("\\w")').includes(feat),
        'regex y flag feature feature wrongly detected'
    )
    t.false(
        featuresUsed('var r = new RegExp("\\w", x)').includes(feat),
        'regex y flag feature feature wrongly detected'
    )
})

test('regex y and u flags (RegExp function)', t => {
    var feat = require('./features/regex-y-u-flags').feature

    t.true(
        featuresUsed('var r = RegExp("\\w", "y")').includes(feat),
        'regex y flag feature not detected'
    )
    t.true(
        featuresUsed('var r = RegExp("\\w", "yi")').includes(feat),
        'regex y flag feature not detected'
    )
    t.true(
        featuresUsed('var r = RegExp("\\w", "u")').includes(feat),
        'regex u flag feature not detected'
    )
    t.true(
        featuresUsed('var r = RegExp("\\w", "ui")').includes(feat),
        'regex u flag feature not detected'
    )
    t.false(
        featuresUsed('var r = RegExp("\\w", "g")').includes(feat),
        'regex y flag feature feature wrongly detected'
    )
    t.false(
        featuresUsed('var r = new RegExp("\\w")').includes(feat),
        'regex y flag feature feature wrongly detected'
    )
    t.false(
        featuresUsed('var r = new RegExp("\\w", x)').includes(feat),
        'regex y flag feature feature wrongly detected'
    )
})

test('destructuring declarations', t => {
    var feat = require('./features/destructuring').feature

    // destructure arrays
    t.true(
        featuresUsed('var [a, b, c] = [1, 2, 3]').includes(feat),
        'destructuring declarations feature not detected'
    )
    t.false(
        featuresUsed('var arr = [1, 2, 3]').includes(feat),
        'destructuring declarations feature wrongly detected'
    )

    // destructure objects
    t.true(
        featuresUsed('var { a, b, c } = { a: 1, b: 2, c: 3 }').includes(feat),
        'destructuring declarations feature not detected'
    )
    t.false(
        featuresUsed('var obj = { a: 1, b: 2, c: 3 }').includes(feat),
        'destructuring declarations feature wrongly detected'
    )
})

test('destructuring assignments', t => {
    var feat = require('./features/destructuring').feature

    // destructure arrays
    t.true(
        featuresUsed('var a, b, c; [a, b, c] = [1, 2, 3]').includes(feat),
        'destructuring assignments feature not detected'
    )
    t.false(
        featuresUsed('var arr = [1, 2, 3]').includes(feat),
        'destructuring assignments feature wrongly detected'
    )

    // destructure objects
    t.true(
        featuresUsed(
            'var a, b, c; ({ a, b, c } = { a: 1, b: 2, c: 3 })'
        ).includes(feat),
        'destructuring assignments feature not detected'
    )
    t.false(
        featuresUsed('var obj = { a: 1, b: 2, c: 3 }').includes(feat),
        'destructuring assignments feature wrongly detected'
    )
})

test('destructuring parameters', t => {
    var feat = require('./features/destructuring').feature

    // destructure arrays
    t.true(
        featuresUsed('function foo([a, b]) { return a + b }').includes(feat),
        'destructuring parameters feature not detected'
    )
    t.false(
        featuresUsed('function foo(a, b) { return a + b }').includes(feat),
        'destructuring parameters feature wrongly detected'
    )

    // destructure objects
    t.true(
        featuresUsed('function foo({ a, b }) { return a + b }').includes(feat),
        'destructuring paramters feature not detected'
    )
    t.false(
        featuresUsed('function foo(a, b) { return a + b }').includes(feat),
        'destructuring parameters feature wrongly detected'
    )
})

test('new.target', t => {
    var feat = require('./features/new-target').feature

    t.true(
        featuresUsed('new (function F() { new.target === F})()').includes(feat),
        'new.targert feature not detected'
    )
    t.false(
        featuresUsed(
            'var x = { "new": { "target": "foo" } }; x.new.target = "bar"'
        ).includes(feat),
        'new.target feature wrongly detected'
    )
})

test('const bindings', t => {
    var feat = require('./features/const-bindings').feature

    t.true(
        featuresUsed('const x = 1').includes(feat),
        'const bindings feature not detected'
    )
    t.false(
        featuresUsed('var x = 1').includes(feat),
        'const bindings feature wrongly detected'
    )
})

test('let bindings', t => {
    var feat = require('./features/let-bindings').feature

    t.true(
        featuresUsed('let x = 1').includes(feat),
        'let bindings feature not detected'
    )
    t.false(
        featuresUsed('var x = 1').includes(feat),
        'let bindings feature wrongly detected'
    )
})

test('class', t => {
    var feat = require('./features/class').feature

    t.true(
        featuresUsed('class Foo {}').includes(feat),
        'class feature not detected'
    )
    t.false(
        featuresUsed('function Foo() {}').includes(feat),
        'class feature wrongly detected'
    )
})

test('super', t => {
    var feat = require('./features/super').feature

    t.true(
        featuresUsed(
            'class A {} class B extends A { foo() { super.foo() } }'
        ).includes(feat),
        'super feature not detected'
    )
})

test('generators', t => {
    var feat = require('./features/generators').feature

    t.true(
        featuresUsed('function * foo() { yield 1 }').includes(feat),
        'generator feature not detected'
    )
    t.true(
        featuresUsed('var o = { * foo() { yield 1} }').includes(feat),
        'generator feature not detected'
    )
    t.true(
        featuresUsed('class A { * foo() { yield 1 } }').includes(feat),
        'generator feature not detected'
    )
    t.false(
        featuresUsed('function foo() { return 1 }').includes(feat),
        'generator feature wrongly detected'
    )
})

test('typed array', t => {
    var feat = require('./features/typed-array').feature

    t.true(
        featuresUsed('var buffer = new ArrayBuffer(64)').includes(feat),
        'typed array feature not detected'
    )
    t.true(
        featuresUsed('var view = new Int8Array(buffer)').includes(feat),
        'typed array feature not detected'
    )
    t.true(
        featuresUsed('var view = new Uint8Array(buffer)').includes(feat),
        'typed array feature not detected'
    )
    t.true(
        featuresUsed('var view = new Uint8ClampedArray(buffer)').includes(feat),
        'typed array feature not detected'
    )
    t.true(
        featuresUsed('var view = new Int16Array(buffer)').includes(feat),
        'typed array feature not detected'
    )
    t.true(
        featuresUsed('var view = new Uint16Array(buffer)').includes(feat),
        'typed array feature not detected'
    )
    t.true(
        featuresUsed('var view = new Int32Array(buffer)').includes(feat),
        'typed array feature not detected'
    )
    t.true(
        featuresUsed('var view = new Uint32Array(buffer)').includes(feat),
        'typed array feature not detected'
    )
    t.true(
        featuresUsed('var view = new Float32Array(buffer)').includes(feat),
        'typed array feature not detected'
    )
    t.true(
        featuresUsed('var view = new Float64Array(buffer)').includes(feat),
        'typed array feature not detected'
    )
})

test('map and set', t => {
    var feat = require('./features/map-and-set').feature

    t.true(
        featuresUsed('var x = new Map()').includes(feat),
        'map feature not detected'
    )
    t.true(
        featuresUsed('var x = new Set()').includes(feat),
        'set feature not detected'
    )
})

test('weak map and set', t => {
    var feat = require('./features/weak-map-and-set').feature

    t.true(
        featuresUsed('var x = new WeakMap()').includes(feat),
        'weak map feature not detected'
    )
    t.true(
        featuresUsed('var x = new WeakSet()').includes(feat),
        'weak set feature not detected'
    )
})

test('proxies', t => {
    var feat = require('./features/proxies').feature

    t.true(
        featuresUsed('var p = new Proxy()').includes(feat),
        'proxy feature not detected'
    )
    t.false(
        featuresUsed('var p = {}').includes(feat),
        'proxy feature wrongly detected'
    )
})

test('reflect', t => {
    var feat = require('./features/reflect').feature

    t.true(
        featuresUsed('Reflect.get({ foo: "bar" }, "foo")').includes(feat),
        'reflect feature not detected'
    )
    t.true(
        featuresUsed('var foo = {}; Reflect.set(foo, "bar", "baz")').includes(
            feat
        ),
        'reflect feature not detected'
    )
    t.false(
        featuresUsed('({ foo: "bar"}).foo').includes(feat),
        'reflect feature wrongly detected'
    )
})

test('symbol', t => {
    var feat = require('./features/symbol').feature

    t.true(
        featuresUsed('var s = Symbol("foo")').includes(feat),
        'symbol feature not detected'
    )
    t.false(
        featuresUsed('var s = "foo"').includes(feat),
        'symbol feature wrongly detected'
    )
})

test('well-known symbols', t => {
    var feat = require('./features/symbols-well-known').feature

    t.true(
        featuresUsed('Symbol.isConcatSpreadable').includes(feat),
        'well-known symbols feature not detected'
    )
    t.true(
        featuresUsed('Symbol.replace').includes(feat),
        'well-known symbols feature not detected'
    )
    t.true(
        featuresUsed('Symbol.search').includes(feat),
        'well-known symbols feature not detected'
    )
    t.true(
        featuresUsed('Symbol.split').includes(feat),
        'well-known symbols feature not detected'
    )
    t.true(
        featuresUsed('Symbol.match').includes(feat),
        'well-known symbols feature not detected'
    )
    t.true(
        featuresUsed('Symbol.toPrimitive').includes(feat),
        'well-known symbols feature not detected'
    )
    t.true(
        featuresUsed('Symbol.toStringTag').includes(feat),
        'well-known symbols feature not detected'
    )
    t.false(
        featuresUsed('Symbol.iterator').includes(feat),
        'well-known symbols feature wrongly detected' // Symbol.iteraror is as old as Symbol
    )
    t.false(
        featuresUsed('Symbol.unscopables').includes(feat),
        'well-known symbols feature wrongly detected' // Symbol.unscopables is as old as Symbol
    )
})

test('Symbol.hasInstance', t => {
    var feat = require('./features/symbol-has-instance').feature

    t.true(
        featuresUsed('Symbol.hasInstance').includes(feat),
        'Symbol.hasInstance feature not detected'
    )
    t.false(
        featuresUsed('Symbol.iterator').includes(feat),
        'Symbol.hasInstance feature wrongly detected' // Symbol.iteraror is as old as Symbol
    )
})

test('Symbol.species', t => {
    var feat = require('./features/symbol-species').feature

    t.true(
        featuresUsed('Symbol.species').includes(feat),
        'Symbol.species feature not detected'
    )
    t.false(
        featuresUsed('Symbol.iterator').includes(feat),
        'Symobol.species feature wrongly detected' // Symbol.iteraror is as old as Symbol
    )
})
