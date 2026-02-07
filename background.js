// Background service worker for handling keyboard commands

// Listen for F9 keyboard command to toggle reading mode
chrome.commands.onCommand.addListener((command) => {
  if (command === 'toggle-reading-mode') {
    // Get the active tab
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs[0]) {
        // Get current state from storage
        chrome.storage.sync.get(['snapScrollEnabled'], (result) => {
          const isCurrentlyEnabled = result.snapScrollEnabled !== false; // Default to true
          const newState = !isCurrentlyEnabled;
          
          // Update storage
          chrome.storage.sync.set({ snapScrollEnabled: newState }, () => {
            // Send message to content script to toggle
            chrome.tabs.sendMessage(tabs[0].id, {
              action: 'toggleSnapScroll',
              enabled: newState
            });
          });
        });
      }
    });
  }
});
