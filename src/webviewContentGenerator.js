'use strict'

const vscode = require('vscode')
const path = require('path')
const parseText = require('./parser.js')

/**
 * Renders the given text as HTML content for a Webview panel.
 * @param {string} text The text to render.
 * @param {vscode.WebviewPanel} panel The Webview panel to display the content in.
 * @param {boolean} isLF Whether the file uses LF line endings.
 * @return {string} The HTML content for the Webview panel.
 */
function getWebviewContent(text, panel, isLF) {
  const { html, label } = parseText(text)
  panel.title = label ? `Text Renderer — Paper Label (${label})` : 'Text Renderer Preview'
  // Banner if file is not LF
  const warningBanner = isLF ? '' : `<div class="warning-banner">ERROR: File must use LF line endings!</div>`

  // Convert extension path to Webview URI
  const stylePathOnDisk = vscode.Uri.file(path.join(__dirname, 'media', 'style.css'))
  const styleUri = panel.webview.asWebviewUri(stylePathOnDisk)

  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <title>Text Renderer</title>
      <link href="${styleUri}" rel="stylesheet">
    </head>
    <body>
      ${warningBanner}
      <pre>${html}</pre>
    </body>
    </html>
    `
}

/**
 * Updates the preview content in a given panel with the provided text and line feed setting.
 * @param {object} panel The panel object representing the webview to update.
 * @param {string} text The text content to display in the preview.
 * @param {boolean} isLF Whether to use line feeds (true) or carriage returns (false) for newlines.
 * @return {void} This function does not return a value. It updates the panel's webview directly.
 */
function updatePreview(panel, text, isLF) {
  panel.webview.html = getWebviewContent(text, panel, isLF)
}

module.exports = { getWebviewContent, updatePreview }
