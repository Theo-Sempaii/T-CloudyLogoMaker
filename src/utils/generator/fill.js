const {createCanvas, loadImage} = require('canvas')
const constants = require('../constants.json')

/**
 * @description Create a letter layer with the colors and style indicated!
 * @param {String} color 
 * @param {String} letter 
 * @param {Number} p 
 */
async function fill(color, letter, p) {

  const canvas = createCanvas(2048, 2048)
  const ctx = canvas.getContext("2d");
  const l = constants.letters.find(e => e.name == letter.toUpperCase())
  const border = await loadImage(l.border)
  const fill = await loadImage(l.fill[p])
  ctx.drawImage(fill, 0, 0)
  ctx.globalCompositeOperation = "source-in";
  ctx.fillStyle = color;
  ctx.fillRect(0, 0, 2048, 2048);
  ctx.globalCompositeOperation = "source-over";
  ctx.drawImage(border, 0, 0)
  const buffer = canvas.toBuffer()
  return buffer
}

module.exports = fill