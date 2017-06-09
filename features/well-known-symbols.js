const feature = {
    name: 'well known symbols',
    requiredVersion: { major: 6, minor: 4, patch: 0 },
}

const symbols = [
    'isConcatSpreadable',
    'replace',
    'search',
    'split',
    'match',
    'toPrimitive',
    'toStringTag',
]

module.exports = {
    feature,
    visitors: {
        MemberExpression: node => {
            if (
                node.object.name == 'Symbol' &&
                symbols.includes(node.property.name)
            ) {
                return feature
            }
        },
    },
}
