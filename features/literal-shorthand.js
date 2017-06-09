const feature = {
    name: 'literal shorthand',
    requiredVersion: { major: 4, minor: 8, patch: 3 },
}

module.exports = {
    feature,
    visitors: {
        ObjectProperty: node => {
            if (node.shorthand) {
                return feature
            }
        },
        ObjectMethod: node => {
            return feature
        },
    },
}
