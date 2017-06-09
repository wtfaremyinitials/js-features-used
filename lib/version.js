function createVersion(major, minor, patch) {
    return { major, minor, patch }
}

function maxVersion(versions) {
    versions.reduce((acc, curr) => {
        if (acc.major > curr) return acc
        if (acc.minor > curr) return acc
        if (acc.patch > curr) return acc
        return curr
    }, create(0, 0, 0))
}

module.exports = { createVersion, maxVersion }
