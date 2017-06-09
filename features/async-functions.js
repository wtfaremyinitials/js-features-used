const feature = {
    name: 'async functions',
    requiredVersion: { major: 7, minor: 10, patch: 0 },
}

module.exports = {
    feature,
    visitors: {
        FunctionDeclaration: node => {
            if (node.async) {
                return feature
            }
        },
        ArrowFunctionExpression: node => {
            if (node.async) {
                return feature
            }
        },
    },
}
