const feature = {
    name: 'for..of loops',
    requiredVersion: { major: 0, minor: 12, patch: 18 },
}

module.exports = {
    feature,
    visitors: {
        ForOfStatement: node => {
            return feature
        },
    },
}
