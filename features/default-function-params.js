const feature = {
    name: 'default function parameters',
    requiredVersion: { major: 6, minor: 4, patch: 0 },
}

module.exports = {
    feature,
    visitors: {
        AssignmentPattern: node => {
            return feature
        },
    },
}
