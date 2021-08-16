const { createCanvas } = require('canvas')

/**
 * 
 * @returns An image in 2d canvas context!
 */
function createImage() {
  const canvas = createCanvas(2048, 2048)
  return canvas.getContext('2d')
}

module.exports = createImage
