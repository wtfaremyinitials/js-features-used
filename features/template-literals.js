const feature = {
    name: 'template-literals',
    requiredVersion: { major: 4, minor: 8, patch: 3 },
}

module.exports = {
    feature,
    visitors: {
        TemplateLiteral: node => {
            return feature
        },
    },
}
