'use strict'

const vscode = require('vscode')
const view = require('./webviewContentGenerator.js')

/**
 * Activates the extension, registering a command to show the text renderer preview.
 * @param {vscode.ExtensionContext} context - The extension context.
 */
function activate(context) {
  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated
  console.log('Congratulations, your extension "ss14-paperwork" is now active!')

  let panel

  /**
   * Registers a command to show a preview of the current text editor's content in a webview panel.
   * The command displays an information message if no active editor is found.
   * It creates a webview panel if one doesn't exist and disposes of it when closed.
   * The preview only supports files with LF line endings, displaying an error message otherwise.
   * Updates the preview content on text document changes and active editor switches.
   * @type {vscode.Disposable}
   */
  let disposable = vscode.commands.registerCommand('textRenderer.showPreview', function() {
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

    view.updatePreview(panel, editor.document.getText(), isLF)

    // Update on change
    const changeDocSub = vscode.workspace.onDidChangeTextDocument((event) => {
      const active = vscode.window.activeTextEditor
      if (active && event.document === active.document && panel) {
        const isLF = active.document.eol === vscode.EndOfLine.LF
        view.updatePreview(panel, editor.document.getText(), isLF)
      }
    })

    // Update on editor switch
    const changeEditorSub = vscode.window.onDidChangeActiveTextEditor((newEditor) => {
      if (newEditor && panel) {
        const isLF = newEditor.document.eol === vscode.EndOfLine.LF
        view.updatePreview(panel, newEditor.document.getText(), isLF)
      }
    })

    context.subscriptions.push(changeDocSub, changeEditorSub)
  })

  context.subscriptions.push(disposable)
}

// This method is called when your extension is deactivated
function deactivate() {
}


module.exports = { activate, deactivate }