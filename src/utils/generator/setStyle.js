const { Canvas, loadImage, createCanvas } = require('canvas')
const constants = require('../constants.json')
const path = require('path')
const { writeFileSync } = require('fs')

/**
 * 
 * @param {Canvas} canvas The canvas base to create a logotype!
 * @param {String} text The text you want to make logo!
 * @param {[String]} textColors The colors that the text will have, is an array of 3 colors to give depth!
 * @param {String} backgroundStyle The style of the background to generate!
 * @param {[String]} backgroundColors The 3 colors in the background!
 * @returns 
 */

async function setStyle(text, textColors, backgroundColors, backgroundStyle) {
  const letters = await getValidLetters(text)

  await Promise.all(letters.map(async letter => {

    await fill(textColors[0], letter, 1)
    await fill(textColors[1], letter, 2)
    await fill(textColors[2], letter, 3)

    await createBackground(backgroundColors[0], 0)
    await createBackground(backgroundColors[1], 1)
    await createBackground(backgroundColors[2], 2)

    await createLetter()
  }))


}


/**
 * 
 * @param {String} color 
 * @param {String} letter 
 * @param {String} path 
 */
async function fill(color, letter, p) {

  const canvas = createCanvas(2048, 2048)
  const ctx = canvas.getContext("2d");
  const border = await loadImage(path.resolve(`./src/img/borders/${letter}.png`))
  const fill = await loadImage(path.resolve(`./src/img/filling/${letter}/${p}.png`))
  ctx.drawImage(fill, 0, 0)
  ctx.globalCompositeOperation = "source-in";
  ctx.fillStyle = color;
  ctx.fillRect(0, 0, 2048, 2048);
  ctx.globalCompositeOperation = "source-over";
  ctx.drawImage(border, 0, 0)
  const buffer = canvas.toBuffer()
  return writeFileSync(`./out/part${p}.png`, buffer)
}

async function createLetter() {
  const canvas = createCanvas(2048, 2048)
  const ctx = canvas.getContext("2d");
  const part1 = await loadImage(path.resolve(`./out/part1.png`))
  const part2 = await loadImage(path.resolve(`./out/part2.png`))
  const part3 = await loadImage(path.resolve(`./out/part3.png`))
  const bg0 = await loadImage(path.resolve(`./out/bg0.png`))
  const bg1 = await loadImage(path.resolve(`./out/bg1.png`))
  const bg2 = await loadImage(path.resolve(`./out/bg2.png`))
  ctx.drawImage(bg0, 0, 0)
  ctx.drawImage(bg1, 0, 0)
  ctx.drawImage(bg2, 0, 0)
  ctx.drawImage(part1, 0, 0)
  ctx.drawImage(part2, 0, 0)
  ctx.drawImage(part3, 0, 0)
  const buffer = canvas.toBuffer()
  return writeFileSync(`./out/letter.png`, buffer)
}

async function createBackground(color, p) {
  const canvas = createCanvas(2048, 2048)
  const ctx = canvas.getContext("2d");
  const fill = await loadImage(path.resolve(`./src/img/waves/${p}.png`))
  ctx.drawImage(fill, 0, 0)
  ctx.globalCompositeOperation = "source-in";
  ctx.fillStyle = color;
  ctx.fillRect(0, 0, 2048, 2048);
  const buffer = canvas.toBuffer()
  return writeFileSync(`./out/bg${p}.png`, buffer)
}

/**
 * 
 * @param {String} text 
 */
async function getValidLetters(text) {
  const letters = await Promise.all(text.split("").map(l => {
    if (constants.letters.includes(l.toUpperCase())) return l.toUpperCase();
    else return undefined;
  }))
  return letters
}

module.exports = setStyle;