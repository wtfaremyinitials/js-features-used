const feature = {
    name: 'map and set',
    requiredVersion: '0.12.18',
}

module.exports = {
    feature,
    visitors: {
        NewExpression: node => {
            if (node.callee.name == 'Map') {
                return feature
            }
            if (node.callee.name == 'Set') {
                return feature
            }
        },
    },
}
