function isComment (line) {
  return line.trim().startsWith('//')
}
module.exports = function generator (file) {
  const [content, fileName] = file
  const lines = content.split(/\n/)
  const buffer = []
  let flag
  for (const line of lines) {
    const words = line.split(/\s/)
    const [fstWord] = words
    if (fstWord === 'enum') {
      buffer.push(line.replace(/enum\s(\w+)/g, 'export const $1'))
      flag = true
    } else if (fstWord === '}') {
      if (flag) {
        buffer.push(line)
      }
      flag = false
    } else if (isComment(line)) {
      buffer.push(line)
    } else {
      if (flag) {
        buffer.push(line.replace(/\s=\s(\d+);/g, ': $1,'))
      }
    }
  }
  const parsed = buffer.join('\n')
  return [parsed, fileName]
}

