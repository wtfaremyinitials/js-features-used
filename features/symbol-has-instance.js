const feature = {
    name: 'Symbol.hasInstance',
    requiredVersion: '6.11.0',
}

module.exports = {
    feature,
    visitors: {
        MemberExpression: node => {
            if (
                node.object.name == 'Symbol' &&
                node.property.name == 'hasInstance'
            ) {
                return feature
            }
        },
    },
}
