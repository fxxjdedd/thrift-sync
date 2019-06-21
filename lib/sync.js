const fetchRemoteFile = require('./util/fetchRemoteFile')
const parse = require('./util/parse')
const fs = require('fs')
const path = require('path')

module.exports = async function sync (gitUrl, options) {
  const files = await fetchRemoteFile(gitUrl)
  const parsedFiles = files.map(parse)
  for (const [content, fileName] of parsedFiles) {
    fs.writeFileSync(path.join(process.cwd(), fileName), content)
  }
}
