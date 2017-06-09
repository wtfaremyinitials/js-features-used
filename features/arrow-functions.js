const feature = {
    name: 'arrow functions',
    requiredVersion: { major: 4, minor: 8, patch: 3 },
}

module.exports = {
    feature,
    visitors: {
        ArrowFunctionExpression: node => {
            return feature
        },
    },
}
