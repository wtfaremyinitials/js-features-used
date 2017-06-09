const feature = {
    name: 'regex y and u flags',
    requiredVersion: { major: 6, minor: 4, patch: 0 },
}

const checkExpression = node => {
    if (node.callee.name != 'RegExp') {
        return
    }

    if (node.arguments.length < 2) {
        return
    }

    if (node.arguments[1].type != 'StringLiteral') {
        return
    }

    let flags = node.arguments[1].value
    if (flags.includes('y') || flags.includes('u')) {
        return feature
    }
}

module.exports = {
    feature,
    visitors: {
        RegExpLiteral: node => {
            if (node.flags.includes('y')) {
                return feature
            }

            if (node.flags.includes('u')) {
                return feature
            }
        },
        NewExpression: checkExpression,
        CallExpression: checkExpression,
    },
}
