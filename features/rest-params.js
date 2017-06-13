const feature = {
    name: 'rest parameters',
    requiredVersion: '6.4.0',
}

module.exports = {
    feature,
    visitors: {
        RestElement: node => {
            return feature
        },
    },
}
