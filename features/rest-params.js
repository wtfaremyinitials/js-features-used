const feature = {
    name: 'rest parameters',
    requiredVersion: { major: 6, minor: 4, patch: 0 },
}

module.exports = {
    feature,
    visitors: {
        RestElement: node => {
            return feature
        },
    },
}
