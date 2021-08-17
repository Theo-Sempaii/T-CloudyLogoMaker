const { createImage } = require('./src/utils/generator/createImage')
const getValidLetters = require('./src/utils/generator/getValidLetters')
const createBackground = require('./src/utils/generator/createBackground')
const createLetter = require('./src/utils/generator/createLetter')
const renderImage = require('./src/utils/generator/renderImage')
const fill = require('./src/utils/generator/fill')


/**
 * @description A manager class intended to apply to object-oriented programming!
 */
class CloudyLogoMaker {
  constructor() {
    this.createImage = createImage;
    this.getValidLetters = getValidLetters;
    this.createLetter = createLetter;
    this.createBackground = createBackground;
    this.renderImage = renderImage;
    this.fill = fill;
  };
}

module.exports = {
  CloudyLogoMaker,
  createImage,
  getValidLetters,
  createLetter,
  createBackground,
  renderImage,
  fill
}