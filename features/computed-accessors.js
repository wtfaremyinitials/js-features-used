const feature = {
    name: 'computed accessors',
    requiredVersion: '4.8.3',
}

module.exports = {
    feature,
    visitors: {
        ObjectMethod: node => {
            if (node.computed && node.kind != 'method') {
                return feature
            }
        },
    },
}
