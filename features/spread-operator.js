const feature = {
    name: 'spread operator',
    requiredVersion: '5.12.0',
}

module.exports = {
    feature,
    visitors: {
        SpreadElement: node => {
            return feature
        },
    },
}
