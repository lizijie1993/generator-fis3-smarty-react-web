// https://ivweb.io/topic/58d92e3fdb35a9135d42f840

const fs = require('fs')
const path = require('path')

function noDotAndUnderlineFiles(x) {
  return x[0] !== '.' && x[0] !== '_'
}

function read(root, filter, files, prefix) {
  prefix = prefix || ''
  files = files || []
  filter = filter || noDotAndUnderlineFiles

  const dir = path.join(root, prefix)
  if (!fs.existsSync(dir)) return files
  if (fs.statSync(dir).isDirectory())
    fs.readdirSync(dir)
      .filter(filter)
      .forEach(function (name) {
        read(root, filter, files, path.join(prefix, name))
      })
  else
    files.push(prefix)

  return files
}

module.exports = {
  read
}