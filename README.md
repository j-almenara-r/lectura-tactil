# lectura-tactil

A Microsoft Edge browser extension that enables snap scroll functionality on any webpage, making it easier for your brain to keep track of content as you scroll.

## Features

- 🎯 **Discrete Pages**: Creates page-like sections with clear boundaries for a book-like reading experience
- ⚡ **F9 Toggle**: Press F9 to quickly toggle reading mode on/off (like Edge's native reading mode)
- ⚡ **Easy Toggle**: Enable/disable snap scroll with a single click
- ⌨️ **Keyboard Navigation**: Use Space/PageDown and PageUp to navigate between discrete pages
- 🌐 **Works Everywhere**: Automatically detects content sections on any webpage
- 📱 **Android Compatible**: Designed for Microsoft Edge on Android

## Installation

### For Microsoft Edge

1. Download or clone this repository
2. Open Microsoft Edge and navigate to `edge://extensions/`
3. Enable "Developer mode" in the bottom left corner
4. Click "Load unpacked" and select the extension directory
5. The Snap Scroll extension should now appear in your extensions list

### For Android (Microsoft Edge)

1. On your Android device, ensure you have Microsoft Edge installed
2. The extension can be loaded through Edge's developer mode or through the Edge Add-ons store (once published)

## Usage

1. Click the Lectura Tactil extension icon in your browser toolbar
2. Toggle the "Enable Snap Scroll" switch
3. Or press **F9** to quickly toggle reading mode on/off
4. Browse any webpage - content will snap to discrete page-like sections
5. Use keyboard shortcuts for navigation:
   - **F9**: Toggle reading mode on/off
   - **Space** or **Page Down**: Jump to next page
   - **Page Up**: Jump to previous page

## How It Works

The extension works like a Reading Mode with discrete pages as its distinctive feature:
- Automatically identifies content sections (articles, sections, divs)
- Creates discrete page-like boundaries with mandatory snap behavior
- Provides F9 keyboard shortcut to quickly toggle (like Edge's reading mode)
- Applies smooth scrolling and snap points for a book-like reading experience
- Provides keyboard shortcuts for easy page-by-page navigation

## Files Structure

- `manifest.json` - Extension configuration
- `content_script.js` - Main logic for snap scroll functionality
- `styles.css` - CSS for smooth scroll and snap points
- `popup.html` - Extension popup UI
- `popup.js` - Popup interaction logic
- `icon*.png` - Extension icons

## Privacy

This extension:
- Does not collect any user data
- Does not send any information to external servers
- Only stores your enable/disable preference locally
- Works entirely within your browser

## License

See LICENSE file for details.

## Contributing

Contributions are welcome! Please feel free to submit issues or pull requests.
