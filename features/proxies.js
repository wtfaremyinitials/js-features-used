const feature = {
    name: 'proxies',
    requiredVersion: '6.4.0',
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
