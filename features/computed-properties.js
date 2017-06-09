const feature = {
    name: 'computed properties',
    requiredVersion: { major: 4, minor: 8, patch: 3 },
}

module.exports = {
    feature,
    visitors: {
        ObjectProperty: node => {
            if (node.computed) {
                return feature
            }
        },
        ObjectMethod: node => {
            if (node.computed) {
                return feature
            }
        },
    },
}
