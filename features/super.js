const feature = {
    name: 'super',
    requiredVersion: { major: 4, minor: 8, patch: 3 },
}

module.exports = {
    feature,
    visitors: {
        Super: node => {
            return feature
        },
    },
}
