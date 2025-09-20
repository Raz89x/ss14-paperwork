'use strict'

const vscode = require('vscode')
const path = require('path')
const parseText = require('./parser.js')

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

function updatePreview(panel, text, isLF) {
  panel.webview.html = getWebviewContent(text, panel, isLF)
}

module.exports = { getWebviewContent, updatePreview }
