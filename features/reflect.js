const feature = {
    name: 'reflect',
    requiredVersion: { major: 6, minor: 4, patch: 0 },
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
