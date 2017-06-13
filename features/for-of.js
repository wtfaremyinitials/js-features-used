const feature = {
    name: 'for..of loops',
    requiredVersion: '0.12.18',
}

module.exports = {
    feature,
    visitors: {
        ForOfStatement: node => {
            return feature
        },
    },
}
