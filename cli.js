#!/usr/bin/env node
const meow = require('meow')
const path = require('path')
const fs = require('fs')
const { featuresUsed } = require('.')

const cli = meow(
    `
    Usage
      $ engine-needed <files>

    Options

    Examples
      $ engine-needed *.js
`
)

if (cli.input.length == 0) {
    cli.showHelp()
}

const cwd = process.cwd()
const paths = cli.input.map(f => path.resolve(cwd, f))

console.log(paths)

for (const file of paths) {
    const code = fs.readFileSync(file).toString()
    console.log(file)
    console.log(featuresUsed(code))
}
