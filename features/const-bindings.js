const feature = {
    name: 'const bindings',
    requiredVersion: { major: 4, minor: 8, patch: 3 },
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
