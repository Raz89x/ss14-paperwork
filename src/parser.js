'use strict'

/**
 * Parses a text string with custom formatting tags and converts it to HTML.
 * @param {string} text The input text string containing custom formatting tags.
 * @return {{html: string, label: string | null}} An object containing the parsed HTML string and the extracted label (if any).  The `html` property contains the HTML representation of the formatted text with newlines replaced by `<br>` tags. The `label` property holds the value of a label found at the beginning of the text (prefixed with '# '), or null if no label is present.
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
    .replace(/\[bold]([\s\S]*?)\[\/bold]/gi, '<b>$1</b>')
    .replace(/\[italic]([\s\S]*?)\[\/italic]/gi, '<i>$1</i>')
    .replace(/\[bolditalic]([\s\S]*?)\[\/bolditalic]/gi, '<b><i>$1</i></b>')
    .replace(/\[color=(#[0-9a-fA-F]{3,6}|[a-zA-Z]+)]([\s\S]*?)\[\/color]/gi, '<span style="color:$1">$2</span>')
    .replace(/\[mono]([\s\S]*?)\[\/mono]/gi, '<code>$1</code>')
    .replace(/\[bullet]([\s\S]*?)\[\/bullet]/gi, '<ul><li>$1</li></ul>')
    .replace(/\[bullet\/]/gi, '• ')
    .replace(/\[head=([123])]([\s\S]*?)\[\/head]/gi, (match, lvl, content) => {
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

module.exports = parseText