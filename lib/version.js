const semver = require('semver')

function highestVersion(versions) {
    debugger
    return versions.reduce((acc, curr) => {
        if (semver.gt(curr, acc)) return curr
        else return acc
    }, '0.0.0')
}

module.exports = { highestVersion }
