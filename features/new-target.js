const feature = {
    name: 'new.target',
    requiredVersion: { major: 5, minor: 12, patch: 0 },
}

module.exports = {
    feature,
    visitors: {
        MetaProperty: node => {
            if (node.meta.name == 'new' && node.property.name == 'target') {
                return feature
            }
        },
    },
}
