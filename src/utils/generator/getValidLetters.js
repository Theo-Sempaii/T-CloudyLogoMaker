const constants = require('../constants.json')
/**
 * 
 * @param {String} text 
 */
async function getValidLetters(text) {
  const letters = await Promise.all(text.split("").map(l => {
    if (constants.letters.find(i => i.name == l.toUpperCase())) return l.toUpperCase();
    else return undefined;
  }))
  return letters.filter(letter => letter != undefined)
}

module.exports = getValidLetters