const feature = {
    name: 'destructuring',
    requiredVersion: '6.4.0',
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
