const feature = {
    name: 'computed accessors',
    requiredVersion: { major: 4, minor: 8, patch: 3 },
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
