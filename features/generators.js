const feature = {
    name: 'generators',
    requiredVersion: { major: 4, minor: 8, patch: 3 },
}

module.exports = {
    feature,
    visitors: {
        FunctionDeclaration: node => {
            if (node.generator) {
                return feature
            }
        },
        ObjectMethod: node => {
            if (node.generator) {
                return feature
            }
        },
        ClassMethod: node => {
            if (node.generator) {
                return feature
            }
        },
    },
}
