const babylon = require('babylon')
const traverse = require('babel-traverse').default
const { maxVersion } = require('./lib/version')
const { visitors } = require('./features')

function engineNeeded(code) {
    let features = featuresUsed(code)
    return maxVersion(features.map(f => f.requiredVersion))
}

function featuresUsed(code) {
    let features = []
    let ast = parse(code)

    console.log(require('util').inspect(ast.program, { depth: null }))

    traverse(ast, {
        enter: path => {
            let nodeVisitors = visitors[path.node.type] || []
            let visitorResults = nodeVisitors
                .map(fn => fn(path.node))
                .filter(truthy)
            features = features.concat(visitorResults)
        },
    })
    return features
}

function parse(code) {
    return babylon.parse(code, {
        sourceType: 'module',
        allowImportExportEverywhere: false,
        allowReturnOutsideFunction: true,
        plugins: [
            'jsx',
            'flow',
            'doExpressions',
            'objectRestSpread',
            'decorators',
            'classProperties',
            'exportExtensions',
            'asyncGenerators',
            'functionBind',
            'functionSent',
            'dynamicImport',
        ],
    })
}

function truthy(val) {
    return !!val
}

module.exports = { featuresUsed, engineNeeded }
