const feature = {
    name: 'computed properties',
    requiredVersion: '4.8.3',
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
