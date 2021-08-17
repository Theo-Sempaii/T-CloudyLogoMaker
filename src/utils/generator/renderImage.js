const path = require('path')
const { readdirSync, mkdirSync, writeFileSync } = require('fs')

/**
 * @description Render the image in any indicated path!
 * @param {Buffer} buffer 
 * @param {String} letter
 * @param {Number} num
 * @param {String} path
 * @param {String} type
 * @param {String} p
 */

async function renderImage(buffer, num, p, type, pa = `./out`) {
  if (!readdirSync(path.resolve(`${pa}`)).includes(num + "")) {
    mkdirSync(path.resolve(`${pa}/${num}/`))
  }

  if (type == "bg") {
    writeFileSync(path.resolve(`${pa}/${type}${p}.png`), buffer)
  } else {
    writeFileSync(path.resolve(`${pa}/${num}/${type}${p}.png`), buffer)
  }

  return true
}

module.exports = renderImage