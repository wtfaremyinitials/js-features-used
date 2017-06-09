const feature = {
    name: 'computed properties',
    requiredVersion: { major: 7, minor: 10, patch: 0 },
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
