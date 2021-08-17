const { createImage } = require('./src/utils/generator/createImage')
const getValidLetters = require('./src/utils/generator/getValidLetters')
const createBackground = require('./src/utils/generator/createBackground')


/**
 * The base maker!
 */
class CloudyLogoMaker {
  constructor() {
    this.createImage = createImage;
    this.getValidLetters = getValidLetters;
  };
}

module.exports = {
  CloudyLogoMaker,
  createImage,
  getValidLetters
}