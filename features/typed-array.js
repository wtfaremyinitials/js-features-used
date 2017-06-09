const feature = {
    name: 'typed array',
    requiredVersion: { major: 0, minor: 10, patch: 48 },
}

const constructors = [
    'ArrayBuffer',
    'Int8Array',
    'Uint8Array',
    'Uint8ClampedArray',
    'Int16Array',
    'Uint16Array',
    'Int32Array',
    'Uint32Array',
    'Float32Array',
    'Float64Array',
]

module.exports = {
    feature,
    visitors: {
        NewExpression: node => {
            if (constructors.includes(node.callee.name)) {
                return feature
            }
        },
    },
}
