// Popup script for snap scroll extension

document.addEventListener('DOMContentLoaded', function() {
  const toggle = document.getElementById('snapScrollToggle');
  const status = document.getElementById('status');
  
  // Load current state
  chrome.storage.sync.get(['snapScrollEnabled'], function(result) {
    toggle.checked = result.snapScrollEnabled !== false; // Default to true
  });
  
  // Handle toggle change
  toggle.addEventListener('change', function() {
    const isEnabled = toggle.checked;
    
    // Save to storage
    chrome.storage.sync.set({ snapScrollEnabled: isEnabled }, function() {
      // Show success message
      status.classList.add('success');
      setTimeout(() => {
        status.classList.remove('success');
      }, 2000);
      
      // Send message to content script in active tab
      chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
        if (tabs[0]) {
          chrome.tabs.sendMessage(tabs[0].id, {
            action: 'toggleSnapScroll',
            enabled: isEnabled
          }, function(response) {
            if (chrome.runtime.lastError) {
              // Tab might not have content script yet, that's okay
              console.log('Content script not ready:', chrome.runtime.lastError.message);
            }
          });
        }
      });
    });
  });
});
