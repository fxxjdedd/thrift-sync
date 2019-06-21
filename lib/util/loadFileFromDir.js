const finder = require('fs-finder')
const fs = require('fs-extra')

module.exports = async function loadFileFromDir (dir) {
  const paths = finder.from(dir)
   .exclude(['/.git', '/.vscode', '/node_module'])
   .findFiles('*.thrift')

  return paths.map(path => [fs.readFileSync(path, 'utf-8'), /\w\.thrift/.exec(path)[0].replace('.thrift', '.js')])
}
