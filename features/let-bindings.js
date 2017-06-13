const feature = {
    name: 'let bindings',
    requiredVersion: '4.8.3',
}

module.exports = {
    feature,
    visitors: {
        VariableDeclaration: node => {
            if (node.kind == 'let') {
                return feature
            }
        },
    },
}
