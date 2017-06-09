const feature = {
    name: 'destructuring',
    requiredVersion: { major: 6, minor: 4, patch: 0 },
}

module.exports = {
    feature,
    visitors: {
        ArrayPattern: node => {
            return feature
        },
        ObjectPattern: node => {
            return feature
        },
    },
}
