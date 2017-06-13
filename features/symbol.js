const feature = {
    name: 'symbol',
    requiredVersion: '4.8.3',
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
