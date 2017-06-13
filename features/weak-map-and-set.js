const feature = {
    name: 'weak map and set',
    requiredVersion: '0.12.18',
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
