const feature = {
    name: 'generators',
    requiredVersion: '4.8.3',
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
