const { loadImage, createCanvas } = require('canvas');
const { writeFileSync } = require('fs')
const constants = require('../constants.json')

/**
 * 
* @description The function in charge of creating the backgrounds for each logo!
 * @param {String} color The color of the Background!
 * @param {Number} p The background layer to generate!
 * @param {Number} level The random generator of the level path!
 */
async function createBackground(color, p, level) {
  const canvas = createCanvas(2048, 2048)
  const ctx = canvas.getContext("2d");
  let fill;
  if (p == 0) fill = await loadImage(constants.base)
  else if (p == 1) fill = await loadImage(constants.waves.level1[level])
  else fill = await loadImage(constants.waves.level2[level])
  ctx.drawImage(fill, 0, 0)
  ctx.globalCompositeOperation = "source-in";
  ctx.fillStyle = color;
  ctx.fillRect(0, 0, 2048, 2048);
  const buffer = canvas.toBuffer()

  return buffer
}

module.exports = createBackground