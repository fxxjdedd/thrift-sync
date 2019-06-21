const loadFileFromDir = require('./loadFileFromDir')
const fs = require('fs-extra')

// https://blog.csdn.net/qq_36184671/article/details/82263075
module.exports = async function fetchRemoteFile (gitUrl) {
  const os = require('os')
  const path = require('path')
  const download = require('download-git-repo')
  const tmpdir = path.join(os.tmpdir(), 'thrift-sync')

  await fs.remove(tmpdir)

  try {
    await new Promise((resolve, reject) => {
      download('direct:' + gitUrl, tmpdir, { clone: true }, err => {
        if (err) return reject(err)
        resolve()
      })
    })
  } catch (e) {
    console.error(e)
  }

  return await loadFileFromDir(tmpdir)
}
