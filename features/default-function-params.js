const feature = {
    name: 'default function parameters',
    requiredVersion: '6.4.0',
}

module.exports = {
    feature,
    visitors: {
        AssignmentPattern: node => {
            return feature
        },
    },
}
