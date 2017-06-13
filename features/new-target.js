const feature = {
    name: 'new.target',
    requiredVersion: '5.12.0',
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
