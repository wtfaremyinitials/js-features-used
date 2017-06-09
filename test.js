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
        featuresUsed('var y = { "foo bar": () => { return 1 } }').includes(feat),
        'object literal shorthand feature wrongly detected'
    )

    // computed shorthand methods
    t.true(
        featuresUsed('var x = "foo"; var y = { [x]() { return 1 } }').includes(feat),
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
        featuresUsed(`
            var x = "y";
            var z = {
                get [x] () { return 1 },
                set [x] (value) {  },
            }
        `).includes(feat),
        'computed accessors feature not detected'
    )
    t.false(
        featuresUsed(`
            var z = {
                get y () { return 1 },
                set y (value) {  },
            }
        `).includes(feat),
        'computed accessors feature wrongly detected'
    )
    t.false(
        featuresUsed('var x = "foo"; var y = { [x]() { return 1 } }').includes(feat),
        'computed accessors feature wrongly detected'
    )
})
