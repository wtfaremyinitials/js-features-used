const feature = {
    name: 'let bindings',
    requiredVersion: { major: 4, minor: 8, patch: 3 },
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
