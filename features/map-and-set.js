const feature = {
    name: 'map and set',
    requiredVersion: { major: 0, minor: 12, patch: 18 },
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
