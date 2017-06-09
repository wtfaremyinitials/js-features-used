const feature = {
    name: 'symbol',
    requiredVersion: { major: 4, minor: 8, patch: 3 },
}

module.exports = {
    feature,
    visitors: {
        CallExpression: node => {
            if (node.callee.name == 'Symbol') {
                return feature
            }
        },
    },
}
