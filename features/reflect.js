const feature = {
    name: 'reflect',
    requiredVersion: '6.4.0',
}

module.exports = {
    feature,
    visitors: {
        Identifier: node => {
            if (node.name == 'Reflect') {
                return feature
            }
        },
    },
}
