const feature = {
    name: 'const bindings',
    requiredVersion: '4.8.3',
}

module.exports = {
    feature,
    visitors: {
        VariableDeclaration: node => {
            if (node.kind == 'const') {
                return feature
            }
        },
    },
}
