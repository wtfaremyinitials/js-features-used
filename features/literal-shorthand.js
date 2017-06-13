const feature = {
    name: 'literal shorthand',
    requiredVersion: '4.8.3',
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
