const feature = {
    name: 'class',
    requiredVersion: '4.8.3',
}

module.exports = {
    feature,
    visitors: {
        ClassDeclaration: node => {
            return feature
        },
    },
}
