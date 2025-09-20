# Changelog

All notable changes to the SS14 Paperwork extension will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2025-01-20

### Added
- Initial release of SS14 Paperwork extension
- Real-time preview functionality for SS14 paperwork documents
- Support for SS14-specific formatting tags:
    - `[bold]...[/bold]` - Bold text formatting
    - `[italic]...[/italic]` - Italic text formatting
    - `[bolditalic]...[/bolditalic]` - Bold italic combination
    - `[color=#hex|colorname]...[/color]` - Colored text with hex codes or color names
    - `[mono]...[/mono]` - Monospace text formatting
    - `[bullet]...[/bullet]` - Bulleted list items
    - `[bullet/]` - Individual bullet points
    - `[head=1|2|3]...[/head]` - Three levels of headers with different sizes
- Paper label support using `# Label Name` syntax at document start
- Line ending validation (LF required for SS14 compatibility)
- Warning banner for files with incorrect CRLF line endings
- Side-by-side preview panel that updates in real-time
- Command palette integration with "SS14 Paperwork Renderer Preview" command
- Webview-based preview with custom CSS styling
- Automatic preview updates on document changes and editor switching
- JSDoc documentation throughout the codebase

### Technical Details
- Built with VS Code Extension API 1.104.0
- CommonJS module system for Node.js compatibility
- Modular architecture with separate parser and webview generator modules
- ESLint integration for code quality
- Prettier code formatting
- Test framework setup with Mocha and VS Code test utilities

### Project Structure
- Organized source code into `src/` directory
- Separated concerns: extension logic, parser, and webview generation
- Added comprehensive development tooling and configuration
- Microsoft Public License (MS-PL) licensing

### Development Environment
- Added `.gitignore` with Node.js, VS Code, and IDE-specific exclusions
- Configured `.vscodeignore` for extension packaging
- Set up ESLint configuration for modern JavaScript
- Added Prettier for consistent code formatting
- Configured `jsconfig.json` for better IntelliSense and type checking

## [Unreleased]

### Planned
- Configuration options for preview styling
- Additional formatting tag support
- Improved error handling and user feedback
- Performance optimizations for large documents
- Keyboard shortcuts for common operations

---

## Version History Summary
- **v1.0.0**: Initial release with core functionality, real-time preview, and SS14 formatting support

## Contributing

When contributing to this project, please:
1. Update this changelog with your changes
2. Follow the established commit message format
3. Ensure all tests pass before submitting
4. Add appropriate JSDoc documentation for new functions