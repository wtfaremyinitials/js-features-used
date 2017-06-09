let allVisitors = {}

let features = [
    require('./async-functions'),
    require('./default-function-params'),
    require('./arrow-functions'),
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
