const test = require('ava')
const { featuresUsed } = require('.')

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
