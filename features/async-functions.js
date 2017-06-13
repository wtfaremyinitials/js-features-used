const feature = {
    name: 'async functions',
    requiredVersion: '7.10.0',
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
        ObjectMethod: node => {
            if (node.async) {
                return feature
            }
        },
        ClassMethod: node => {
            if (node.async) {
                return feature
            }
        },
    },
}
