let allVisitors = {}

let features = [
    require('./async-functions'),
    require('./default-function-params'),
    require('./arrow-functions'),
    require('./rest-params'),
    require('./spread-operator'),
    require('./computed-properties'),
    require('./literal-shorthand'),
    require('./computed-accessors'),
    require('./for-of'),
    require('./octal-binary-literals'),
    require('./template-literals'),
    require('./regex-y-u-flags'),
    require('./destructuring'),
    require('./new-target'),
]

for (feature of features) {
    for (key in feature.visitors) {
        if (!allVisitors[key]) {
            allVisitors[key] = []
        }

        let nodeVisitors = feature.visitors[key]

        if (!Array.isArray(nodeVisitors)) {
            nodeVisitors = [nodeVisitors]
        }

        allVisitors[key] = allVisitors[key].concat(nodeVisitors)
    }
}

module.exports = {
    visitors: allVisitors,
}
