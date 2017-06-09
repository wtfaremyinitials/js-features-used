const feature = {
    name: 'spread operator',
    requiredVersion: { major: 5, minor: 12, patch: 0 },
}

module.exports = {
    feature,
    visitors: {
        SpreadElement: node => {
            return feature
        },
    },
}
