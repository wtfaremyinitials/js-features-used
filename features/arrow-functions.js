const feature = {
    name: 'arrow functions',
    requiredVersion: '4.8.3',
}

module.exports = {
    feature,
    visitors: {
        ArrowFunctionExpression: node => {
            return feature
        },
    },
}
