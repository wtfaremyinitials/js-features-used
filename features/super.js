const feature = {
    name: 'super',
    requiredVersion: '4.8.3',
}

module.exports = {
    feature,
    visitors: {
        Super: node => {
            return feature
        },
    },
}
