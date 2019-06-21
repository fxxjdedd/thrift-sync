const fetchRemoteFile = require('./util/fetchRemoteFile')
const parse = require('./util/parse')
const fs = require('fs')
const path = require('path')
const { logWithSpinner, stopSpinner } = require('./util/spinner')
const { log } = require('./util/logger')
const chalk = require('chalk')

function getFileOutputPath (pathPrefix, fileName) {
  return path.join(process.cwd(), pathPrefix, fileName)
}

module.exports = async function sync (gitUrl, options) {
  logWithSpinner(`✨`, `Cloning ${chalk.yellow(gitUrl)}.`)
  const files = await fetchRemoteFile(gitUrl)
  const parsedFiles = files.map(parse)
  const pathPrefix = options.path || ''
  for (const [content, fileName] of parsedFiles) {
    fs.writeFileSync(getFileOutputPath(pathPrefix, fileName), content)
  }
  stopSpinner()
  log()
  log(
    `Successfully generated files: \n` +
    `${chalk.cyan(parsedFiles.map(d => getFileOutputPath(pathPrefix, d[1])).join('\n'))}`
  )
  log()
}
