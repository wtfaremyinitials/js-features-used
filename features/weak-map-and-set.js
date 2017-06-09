const feature = {
    name: 'weak map and set',
    requiredVersion: { major: 0, minor: 12, patch: 18 },
}

module.exports = {
    feature,
    visitors: {
        NewExpression: node => {
            if (node.callee.name == 'WeakMap') {
                return feature
            }
            if (node.callee.name == 'WeakSet') {
                return feature
            }
        },
    },
}
