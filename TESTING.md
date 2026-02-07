# Testing Guide for Snap Scroll Extension

## Prerequisites
- Microsoft Edge browser (Desktop version for testing)
- The extension files in this repository

## Installation Steps

1. **Open Microsoft Edge**
   - Launch Microsoft Edge browser on your computer

2. **Navigate to Extensions Page**
   - Type `edge://extensions/` in the address bar and press Enter
   - Or click the three dots menu (⋯) → Extensions → Manage Extensions

3. **Enable Developer Mode**
   - Look for "Developer mode" toggle in the bottom-left corner
   - Turn it ON

4. **Load the Extension**
   - Click "Load unpacked" button
   - Navigate to the folder containing the extension files
   - Select the folder and click "Select Folder"

5. **Verify Installation**
   - You should see "Snap Scroll" extension card appear
   - Note the extension ID (you'll see it in the card)
   - The extension icon should appear in your toolbar

## Testing the Extension

### Test 1: Basic Toggle Functionality

1. Click the Snap Scroll extension icon in the toolbar
2. You should see a popup with a toggle switch
3. Toggle the switch ON and OFF
4. Verify that "Settings saved!" message appears briefly

### Test 2: Test Page

1. Open the included `test_page.html` file in Edge
2. Enable the Snap Scroll extension from the popup
3. Try scrolling with your mouse wheel
4. Notice how the page snaps to each colored section
5. Try using keyboard shortcuts:
   - Press **Space** or **Page Down** → Should jump to next section
   - Press **Page Up** → Should jump to previous section

### Test 3: Real Websites

Test on various websites to ensure compatibility:

**Recommended test sites:**
- https://www.wikipedia.org (has clear article sections)
- https://medium.com (has article paragraphs)
- https://docs.microsoft.com (has documentation sections)
- Any news website with multiple articles

**What to check:**
- Does scrolling feel smooth?
- Does it snap to logical sections?
- Can you disable it and see normal scrolling return?
- Do keyboard shortcuts work?

### Test 4: Edge Cases

1. **Very short pages** (less than 2 screen heights)
   - The extension should not interfere
   - Normal scrolling should work

2. **Pages without clear sections**
   - Extension should create virtual snap points
   - Or gracefully degrade to normal scrolling

3. **Dynamic content** (like infinite scroll)
   - Test on sites like Twitter or Facebook
   - Check if snap points update as content loads

## Expected Behavior

### ✅ When Extension is ENABLED:
- Scrolling should feel "sticky" at section boundaries
- Content aligns nicely when you stop scrolling
- Keyboard shortcuts work for navigation
- Smooth scrolling animation between sections

### ❌ When Extension is DISABLED:
- Normal browser scrolling behavior
- No snap points
- Keyboard shortcuts don't affect scrolling

## Troubleshooting

### Extension doesn't load
- Check that all files are present (manifest.json, content_script.js, etc.)
- Verify manifest.json is valid JSON
- Check browser console for errors: F12 → Console

### Snap scroll doesn't work on a page
- Refresh the page after enabling the extension
- Check if the page has clear section elements
- Some websites might conflict with the extension's CSS

### Keyboard shortcuts don't work
- Ensure the extension is enabled
- Some websites override keyboard events
- Try on the test_page.html first

## Developer Tools

### View Console Logs
1. Press F12 to open DevTools
2. Go to Console tab
3. Look for any errors or warnings from the extension

### Inspect Extension
1. Go to `edge://extensions/`
2. Click "Details" on the Snap Scroll extension
3. Click "Inspect views: background page" (if available)
4. This opens DevTools for the extension itself

## Feedback

After testing, consider:
- Does snap scroll improve your reading experience?
- Are there any bugs or unexpected behaviors?
- What websites work best/worst with the extension?
- Any feature suggestions?

## Known Limitations

- Extension must be manually enabled after installation
- May not work perfectly on all websites (due to varying HTML structures)
- Performance may vary on very large pages
- Some websites with custom scroll handlers might conflict

## Next Steps

Once testing is complete:
1. Report any bugs found
2. Suggest improvements
3. Consider publishing to Edge Add-ons store
4. Create icon designs for better visual appeal