# lectura-tactil

A Microsoft Edge browser extension that enables snap scroll functionality on any webpage, making it easier for your brain to keep track of content as you scroll.

## Features

- 🎯 **Snap Scrolling**: Automatically aligns content sections when scrolling
- ⚡ **Easy Toggle**: Enable/disable snap scroll with a single click
- ⌨️ **Keyboard Navigation**: Use Space/PageDown and PageUp to navigate between sections
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

1. Click the Snap Scroll extension icon in your browser toolbar
2. Toggle the "Enable Snap Scroll" switch
3. Browse any webpage - scrolling will now snap to content sections
4. Use keyboard shortcuts for navigation:
   - **Space** or **Page Down**: Jump to next section
   - **Page Up**: Jump to previous section

## How It Works

The extension uses CSS scroll-snap properties and intelligent section detection to:
- Automatically identify content sections (articles, sections, divs)
- Apply smooth scrolling behavior
- Snap to section boundaries when scrolling
- Provide keyboard shortcuts for easy navigation

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
