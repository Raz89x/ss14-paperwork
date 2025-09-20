// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode')
const path = require('path')

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated
  console.log('Congratulations, your extension "ss14-paperwork" is now active!')

  let panel

  let disposable = vscode.commands.registerCommand('textRenderer.showPreview', function () {
    const editor = vscode.window.activeTextEditor
    if (!editor) {
      vscode.window.showInformationMessage('No active editor')
      return
    }

    if (!panel) {
      panel = vscode.window.createWebviewPanel('textRenderer', 'Text Renderer Preview', vscode.ViewColumn.Beside, { enableScripts: true })

      panel.onDidDispose(
        () => {
          panel = null
        },
        null,
        context.subscriptions
      )
    }

    const isLF = editor.document.eol === vscode.EndOfLine.LF
    if (!isLF) {
      vscode.window.showErrorMessage('This file must use LF (\\n) line endings, not CRLF.')
    }

    updatePreview(panel, editor.document.getText(), isLF)

    // Update on change
    const changeDocSub = vscode.workspace.onDidChangeTextDocument((event) => {
      const active = vscode.window.activeTextEditor
      if (active && event.document === active.document && panel) {
        const isLF = active.document.eol === vscode.EndOfLine.LF
        updatePreview(panel, editor.document.getText(), isLF)
      }
    })

    // Update on editor switch
    const changeEditorSub = vscode.window.onDidChangeActiveTextEditor((newEditor) => {
      if (newEditor && panel) {
        const isLF = newEditor.document.eol === vscode.EndOfLine.LF
        updatePreview(panel, newEditor.document.getText(), isLF)
      }
    })

    context.subscriptions.push(changeDocSub, changeEditorSub)
  })

  context.subscriptions.push(disposable)
}

// This method is called when your extension is deactivated
function deactivate() {}

/**
 * Simple BBCode-like parser to HTML
 * Returns { html, label }
 */
function parseText(text) {
  let output = text
  let label = null

  // Split lines
  const lines = output.split('\n')

  // Check first line for # label
  const firstLineMatch = lines[0].match(/^#\s*(.+)$/)
  if (firstLineMatch) {
    label = firstLineMatch[1].trim()
    lines.shift() // remove first line from rendered text
  }

  output = lines.join('\n')

  // Keep looping until no further replacements
  let prev
  do {
    prev = output
    output = output
      .replace(/\[bold\]([\s\S]*?)\[\/bold\]/gi, '<b>$1</b>')
      .replace(/\[italic\]([\s\S]*?)\[\/italic\]/gi, '<i>$1</i>')
      .replace(/\[bolditalic\]([\s\S]*?)\[\/bolditalic\]/gi, '<b><i>$1</i></b>')
      .replace(/\[color=(#[0-9a-fA-F]{3,6}|[a-zA-Z]+)\]([\s\S]*?)\[\/color\]/gi, '<span style="color:$1">$2</span>')
      .replace(/\[mono\]([\s\S]*?)\[\/mono\]/gi, '<code>$1</code>')
      .replace(/\[bullet\]([\s\S]*?)\[\/bullet\]/gi, '<ul><li>$1</li></ul>')
      .replace(/\[bullet\/\]/gi, '• ')
      .replace(/\[head=(1|2|3)\]([\s\S]*?)\[\/head\]/gi, (match, lvl, content) => {
        let style = ''
        switch (lvl) {
          case '1':
            style = 'font-size:32px; font-weight:bold; display: inline-block; vertical-align: middle; line-height: 0;'
            break
          case '2':
            style = 'font-size:23px; font-weight:600; display: inline-block; vertical-align: middle; line-height: 0;'
            break
          case '3':
            style = 'font-size:19px; font-weight:500; display: inline-block; vertical-align: middle; line-height: 0;'
            break
        }
        return `<div style="${style}">${content}</div>`
      })
  } while (output !== prev)

  // Preserve newlines
  return { html: output.replace(/\n/g, '<br>'), label }
}

/**
 * Returns HTML for the webview
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

function updatePreview(panel, text, isLF) {
  panel.webview.html = getWebviewContent(text, panel, isLF)
}

module.exports = {
  activate,
  deactivate
}
