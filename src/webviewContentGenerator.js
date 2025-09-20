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

  // Convert Noto Sans font paths to Webview URIs
  const notoSansRegularPath = vscode.Uri.file(path.join(__dirname, 'media', 'font', 'NotoSans', 'NotoSans-Regular.ttf'))
  const notoSansBoldPath = vscode.Uri.file(path.join(__dirname, 'media', 'font', 'NotoSans', 'NotoSans-Bold.ttf'))
  const notoSansItalicPath = vscode.Uri.file(path.join(__dirname, 'media', 'font', 'NotoSans', 'NotoSans-Italic.ttf'))
  const notoSansBoldItalicPath = vscode.Uri.file(path.join(__dirname, 'media', 'font', 'NotoSans', 'NotoSans-BoldItalic.ttf'))
  const notoSansSymbolsPath = vscode.Uri.file(path.join(__dirname, 'media', 'font', 'NotoSans', 'NotoSansSymbols-Regular.ttf'))
  const notoSansSymbolsBoldPath = vscode.Uri.file(path.join(__dirname, 'media', 'font', 'NotoSans', 'NotoSansSymbols-Bold.ttf'))

  const notoSansRegularUri = panel.webview.asWebviewUri(notoSansRegularPath)
  const notoSansBoldUri = panel.webview.asWebviewUri(notoSansBoldPath)
  const notoSansItalicUri = panel.webview.asWebviewUri(notoSansItalicPath)
  const notoSansBoldItalicUri = panel.webview.asWebviewUri(notoSansBoldItalicPath)
  const notoSansSymbolsUri = panel.webview.asWebviewUri(notoSansSymbolsPath)
  const notoSansSymbolsBoldUri = panel.webview.asWebviewUri(notoSansSymbolsBoldPath)

  // Convert Roboto Mono font paths to Webview URIs
  const robotoMonoRegularPath = vscode.Uri.file(path.join(__dirname, 'media', 'font', 'RobotoMono', 'RobotoMono-Regular.ttf'))
  const robotoMonoBoldPath = vscode.Uri.file(path.join(__dirname, 'media', 'font', 'RobotoMono', 'RobotoMono-Bold.ttf'))
  const robotoMonoItalicPath = vscode.Uri.file(path.join(__dirname, 'media', 'font', 'RobotoMono', 'RobotoMono-Italic.ttf'))

  const robotoMonoRegularUri = panel.webview.asWebviewUri(robotoMonoRegularPath)
  const robotoMonoBoldUri = panel.webview.asWebviewUri(robotoMonoBoldPath)
  const robotoMonoItalicUri = panel.webview.asWebviewUri(robotoMonoItalicPath)

  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <title>Text Renderer</title>
      <style>
        @font-face {
          font-family: 'Noto Sans';
          src: url('${notoSansRegularUri}') format('truetype');
          font-weight: normal;
          font-style: normal;
        }
        @font-face {
          font-family: 'Noto Sans';
          src: url('${notoSansBoldUri}') format('truetype');
          font-weight: bold;
          font-style: normal;
        }
        @font-face {
          font-family: 'Noto Sans';
          src: url('${notoSansItalicUri}') format('truetype');
          font-weight: normal;
          font-style: italic;
        }
        @font-face {
          font-family: 'Noto Sans';
          src: url('${notoSansBoldItalicUri}') format('truetype');
          font-weight: bold;
          font-style: italic;
        }
        @font-face {
          font-family: 'Noto Sans Symbols';
          src: url('${notoSansSymbolsUri}') format('truetype');
          font-weight: normal;
          font-style: normal;
        }
        @font-face {
          font-family: 'Noto Sans Symbols';
          src: url('${notoSansSymbolsBoldUri}') format('truetype');
          font-weight: bold;
          font-style: normal;
        }
        
        @font-face {
          font-family: 'Roboto Mono';
          src: url('${robotoMonoRegularUri}') format('truetype');
          font-weight: normal;
          font-style: normal;
        }
        @font-face {
          font-family: 'Roboto Mono';
          src: url('${robotoMonoBoldUri}') format('truetype');
          font-weight: bold;
          font-style: normal;
        }
        @font-face {
          font-family: 'Roboto Mono';
          src: url('${robotoMonoItalicUri}') format('truetype');
          font-weight: normal;
          font-style: italic;
        }
      </style>
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
