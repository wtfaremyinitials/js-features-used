const feature = {
    name: 'proxies',
    requiredVersion: { major: 6, minor: 4, patch: 0 },
}

module.exports = {
    feature,
    visitors: {
        NewExpression: node => {
            if (node.callee.name == 'Proxy') {
                return feature
            }
        },
    },
}
