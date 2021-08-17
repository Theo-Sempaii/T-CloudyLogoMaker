const constants = require('../constants.json')
/**
 * @description A small tool to obtain the valid letters to make a logo!
 * @param {String} text The text from which you want to get the valid letters!
 */
async function getValidLetters(text) {
  const letters = await Promise.all(text.split("").map(l => {
    if (constants.letters.find(i => i.name == l.toUpperCase())) return l.toUpperCase();
    else return undefined;
  }))
  return letters.filter(letter => letter != undefined)
}

module.exports = getValidLetters