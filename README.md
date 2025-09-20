# SS14 Paperwork
A Visual Studio Code extension that assists in creating and previewing paperwork for Space Station 14. This extension provides real-time preview functionality for custom formatted text documents used in the SS14 game.

## Features
- **Real-time Preview**: Live preview of your paperwork as you type with automatic updates
- **Custom Formatting Tags**: Support for SS14-specific formatting tags including:
    - `[bold]...[/bold]` - Bold text
    - `[italic]...[/italic]` - Italic text
    - `[bolditalic]...[/bolditalic]` - Bold italic text
    - `[color=#hex|colorname]...[/color]` - Colored text
    - `[mono]...[/mono]` - Monospace text
    - `[bullet]...[/bullet]` and `[bullet/]` - Bulleted lists
    - `[head=1|2|3]...[/head]` - Headers (3 levels)
- **Paper Labels**: Support for document labels using `# Label Name` syntax
- **Line Ending Validation**: Ensures documents use LF line endings (required for SS14)
- **Side-by-side Editing**: Preview opens in a separate panel alongside your editor

## Installation
1. Download the `.vsix` file from the releases
2. Open VS Code
3. Go to Extensions view (`Ctrl+Shift+X`)
4. Click the `...` menu and select "Install from VSIX..."
5. Select the downloaded `.vsix` file

## Usage
1. Open any text file in VS Code
2. Use the Command Palette (`Ctrl+Shift+P`) and search for "SS14 Paperwork Renderer Preview"
3. The preview will open in a side panel
4. Start typing with SS14 formatting tags to see live updates

## Example Document
### Medical Report
[head=1]PATIENT REPORT[/head]
[bold]Patient Name:[/bold] John Doe [bold]Condition:[/bold] [color=red]Critical[/color]
[head=2]Treatment Notes[/head] [bullet]Administered first aid[/bullet] [bullet]Patient stabilized[/bullet] [bullet][mono]Time: 14:32[/mono][/bullet]
[italic]End of report[/italic]

## Requirements
- Visual Studio Code version 1.104.0 or higher
- Files must use LF (`\n`) line endings for proper SS14 compatibility

## Extension Settings
This extension doesn't add any VS Code settings currently.

## Commands
- `SS14 Paperwork Renderer Preview` - Opens the preview panel for the current document

## Known Issues
- Files with CRLF line endings will show a warning banner as SS14 requires LF endings
- Preview only updates when the active editor contains the document being previewed

### Building from Source
1. Clone the repository
2. Run `npm install` to install dependencies
3. Run `npm run lint` to check for linting issues
4. Use VS Code's "Run Extension" debug configuration to test

### Running Tests
```bash
npm test
```

## License
This project is licensed under the Microsoft Public License (MS-PL). See the LICENSE file for details.

## Author
Smalls

## Contributing
Contributions are welcome! Please feel free to submit issues and pull requests.

## Changelog
See CHANGELOG.md for version history and changes.