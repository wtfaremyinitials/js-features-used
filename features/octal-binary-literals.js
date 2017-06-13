const feature = {
    name: 'octal and binary literals',
    requiredVersion: '4.8.3',
}

module.exports = {
    feature,
    visitors: {
        NumericLiteral: node => {
            if (node.extra.raw.startsWith('0o')) return feature
            if (node.extra.raw.startsWith('0b')) return feature
        },
    },
}
