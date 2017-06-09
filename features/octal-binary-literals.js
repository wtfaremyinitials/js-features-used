const feature = {
    name: 'octal and binary literals',
    requiredVersion: { major: 4, minor: 8, patch: 3 },
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
