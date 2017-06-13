const feature = {
    name: 'template-literals',
    requiredVersion: '4.8.3',
}

module.exports = {
    feature,
    visitors: {
        TemplateLiteral: node => {
            return feature
        },
    },
}
