# Architecture Documentation

## Extension Architecture

### Components Overview

```
┌─────────────────────────────────────────────────────┐
│                  Browser Extension                   │
├─────────────────────────────────────────────────────┤
│                                                       │
│  ┌──────────────┐         ┌──────────────────────┐ │
│  │  manifest.   │         │     Extension        │ │
│  │   json       │────────▶│      Icons           │ │
│  │ (Config)     │         │  (16/48/128.png)     │ │
│  └──────────────┘         └──────────────────────┘ │
│         │                                            │
│         ├──────────┬──────────────────┐            │
│         ▼          ▼                  ▼             │
│  ┌─────────┐ ┌──────────┐    ┌──────────────┐    │
│  │ popup.  │ │ popup.   │    │  content_    │    │
│  │  html   │ │   js     │    │  script.js   │    │
│  │  (UI)   │ │ (Logic)  │    │  (Injected)  │    │
│  └─────────┘ └──────────┘    └──────────────┘    │
│                    │                   │            │
│                    │                   │            │
│                    ▼                   ▼            │
│            ┌──────────────┐    ┌──────────────┐   │
│            │   Chrome     │    │   styles.    │   │
│            │   Storage    │    │     css      │   │
│            │              │    │  (Applied    │   │
│            │              │    │  to pages)   │   │
│            └──────────────┘    └──────────────┘   │
└─────────────────────────────────────────────────────┘
                        │
                        ▼
            ┌───────────────────────┐
            │    Web Pages          │
            │  (All URLs)           │
            │                       │
            │  - Snap scroll applied │
            │  - Keyboard shortcuts  │
            │  - Section detection   │
            └───────────────────────┘
```

## File Responsibilities

### manifest.json
- **Purpose**: Extension configuration and metadata
- **Key Settings**:
  - Manifest version 3 (latest standard)
  - Permissions: storage (save settings), activeTab (interact with current page)
  - Content script injection on all URLs
  - Extension popup configuration

### content_script.js
- **Purpose**: Main logic injected into every webpage
- **Features**:
  - Detects and applies snap points to page sections
  - Handles enable/disable toggle
  - Keyboard navigation (Space, PageUp, PageDown)
  - Observes DOM changes for dynamic content
  - Smart section detection with multiple strategies

### styles.css
- **Purpose**: CSS styling for snap scroll functionality
- **Features**:
  - CSS scroll-snap-type for native snap behavior
  - Smooth scrolling animations
  - Optional visual indicators for snap points

### popup.html & popup.js
- **Purpose**: User interface for extension settings
- **Features**:
  - Toggle switch to enable/disable snap scroll
  - Settings persistence using Chrome Storage API
  - Real-time communication with content script
  - User-friendly design

## Data Flow

### 1. Initial Load
```
Page Load → Content Script Injected → Check Storage → Apply Settings
```

### 2. User Toggle
```
User Clicks Icon → Popup Opens → User Toggles Switch → 
Save to Storage → Send Message to Content Script → Apply/Remove Snap Scroll
```

### 3. Snap Scroll Detection
```
Content Script → Analyze DOM → Find Sections → Apply CSS Classes → 
Browser Native Scroll-Snap → Smooth Navigation
```

## Snap Point Detection Strategy

The extension uses a multi-level detection strategy:

1. **Semantic Elements** (Preferred)
   - `<section>`, `<article>` tags
   - Elements with section-related classes or IDs
   - ARIA regions

2. **Common Patterns**
   - `.section`, `.content-section` classes
   - `main > div` direct children
   - Elements with "section" in ID/class

3. **Fallback: Virtual Sections**
   - If no clear sections found
   - Divide content by viewport height
   - Applied for pages with continuous content

## Browser Compatibility

### Supported Browsers
- ✅ Microsoft Edge (Chromium-based)
- ✅ Google Chrome
- ✅ Other Chromium-based browsers

### API Requirements
- Manifest V3 support
- Chrome Extensions API
- CSS scroll-snap support

## Privacy & Security

### Data Collection
- ❌ No personal data collected
- ❌ No external server communication
- ✅ Settings stored locally only
- ✅ Runs entirely in browser

### Permissions Justification
- **storage**: Required to save user's enable/disable preference
- **activeTab**: Required to apply snap scroll to current page

## Performance Considerations

### Optimization Strategies
1. **Debounced DOM Observer**: Prevents excessive recalculations
2. **Efficient Selectors**: Uses specific selectors to find sections
3. **CSS-based Snap**: Leverages browser's native scroll-snap for smoothness
4. **Lazy Application**: Only processes visible content sections

### Memory Usage
- Minimal: ~2-5KB per page
- No large data structures
- Cleans up when disabled

## Future Enhancements

Potential improvements:
- [ ] Custom snap sensitivity settings
- [ ] Blacklist/whitelist for specific domains
- [ ] Visual indicators for snap points
- [ ] Analytics dashboard (privacy-preserving)
- [ ] Sync settings across devices
- [ ] Touch gesture support for mobile
- [ ] Customizable keyboard shortcuts