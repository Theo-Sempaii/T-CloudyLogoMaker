const { Canvas, loadImage, createCanvas } = require('canvas')
const { writeFileSync } = require('fs')
const getValidLetters = require('./getValidLetters')
const createLetter = require('./createLetter')
const constants = require('../constants.json')
const createBackground = require('./createBackground')
const fs = require('fs')
const path = require('path')
const renderImage = require('./renderImage')
const fill = require('./fill')

/**
 * @param {String} text The text you want to make logo!
 * @param {[String]} textColors The colors that the text will have, is an array of 3 colors to give depth!
 * @param {String} backgroundStyle The style of the background to generate!
 * @param {[String]} backgroundColors The 3 colors in the background!
 */

async function createImage(text, textColors, backgroundColors, backgroundStyle) {
  const letters = await getValidLetters(text)

  let buffer;

  if (!fs.readdirSync(path.resolve('./')).includes('out')) {
    fs.mkdirSync(path.resolve('./out'))
  }




  await Promise.all(letters.map(async letter => {
    await renderImage(await fill(textColors[0], letter, 0), letters.indexOf(letter), 0, "fill")
    await renderImage(await fill(textColors[1], letter, 1), letters.indexOf(letter), 1, "fill")
    await renderImage(await fill(textColors[2], letter, 2), letters.indexOf(letter), 2, "fill")


    if(letters.indexOf(letter) == 0){
      await renderImage(await createBackground(backgroundColors[0], 0, 0), 0, 0, "bg")
      await renderImage(await createBackground(backgroundColors[1], 1, 0), 0, 1, "bg")
      await renderImage(await createBackground(backgroundColors[2], 2, 0), 0, 2, "bg")
    }



  }))

  buffer = await createLetter()

  return buffer
}





module.exports = { createImage };