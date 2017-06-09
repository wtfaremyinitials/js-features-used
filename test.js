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
