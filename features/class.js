const feature = {
    name: 'class',
    requiredVersion: { major: 4, minor: 8, patch: 3 },
}

module.exports = {
    feature,
    visitors: {
        ClassDeclaration: node => {
            return feature
        },
    },
}
