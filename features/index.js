let allVisitors = {}

let features = require('fs')
    .readdirSync(__dirname)
    .filter(f => f != 'index.js')
    .map(f => require('./' + f))

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
