const { Canvas, loadImage, createCanvas } = require('canvas')
const { writeFileSync } = require('fs')
const getValidLetters = require('./getValidLetters')
const createLetter = require('./createLetter')
const constants = require('../constants.json')
const createBackground = require('./createBackground')
const fs = require('fs')
const path = require('path')

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


/**
 * 
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

/**
 * 
 * @param {Buffer} buffer 
 * @param {String} letter
 * @param {Number} num
 * @param {String} path
 * @param {String} type
 * @param {String} p
 */

async function renderImage(buffer, num, p, type, pa = `./out`) {
  if (!fs.readdirSync(path.resolve(`${pa}`)).includes(num + "")) {
    fs.mkdirSync(path.resolve(`${pa}/${num}/`))
  }

  if (type == "bg") {
    writeFileSync(path.resolve(`${pa}/${type}${p}.png`), buffer)
  } else {
    writeFileSync(path.resolve(`${pa}/${num}/${type}${p}.png`), buffer)
  }

  return true
}



module.exports = { createImage };