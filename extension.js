'use strict'

/**
 * The main module exports object.  This object contains the `activate` function, which is called by VS Code when the extension is activated.
 * @module extension
 */
const { activate } = require('./src/extension.js')
module.exports = {
  activate
}