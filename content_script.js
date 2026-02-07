// Content script for snap scroll functionality

// Configuration constants
const MAX_SECTIONS = 50; // Maximum number of sections to prevent performance issues on complex pages
const MIN_SECTION_HEIGHT_PX = 100; // Minimum height for a section to be considered for snap points
const DOM_OBSERVER_DEBOUNCE_MS = 1000; // Debounce time for DOM changes to prevent excessive reprocessing
const SCROLL_THRESHOLD_PX = 50; // Pixel threshold to determine if we're past a section boundary

// Check if snap scroll is enabled
chrome.storage.sync.get(['snapScrollEnabled'], function(result) {
  const isEnabled = result.snapScrollEnabled !== false; // Default to true
  
  if (isEnabled) {
    enableSnapScroll();
  }
});

// Listen for messages from popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'toggleSnapScroll') {
    if (request.enabled) {
      enableSnapScroll();
    } else {
      disableSnapScroll();
    }
    sendResponse({ success: true });
  }
  return true;
});

function enableSnapScroll() {
  // Add snap scroll class to body
  document.body.classList.add('snap-scroll-enabled');
  
  // Find all major content sections and apply snap points
  applySnapPoints();
  
  // Observe DOM changes to reapply snap points if needed
  observeDOMChanges();
}

function disableSnapScroll() {
  // Remove snap scroll class from body
  document.body.classList.remove('snap-scroll-enabled');
  
  // Remove snap scroll classes from all elements
  const snapElements = document.querySelectorAll('.snap-scroll-section');
  snapElements.forEach(element => {
    element.classList.remove('snap-scroll-section');
  });
}

function applySnapPoints() {
  // Target common content sections
  const selectors = [
    'section',
    'article',
    'main > div',
    '.section',
    '.content-section',
    '[role="region"]',
    'div[id*="section"]',
    'div[class*="section"]'
  ];
  
  // Try to find meaningful sections
  let sections = [];
  
  for (const selector of selectors) {
    const elements = document.querySelectorAll(selector);
    if (elements.length > 0 && elements.length < MAX_SECTIONS) {
      sections = Array.from(elements);
      break;
    }
  }
  
  // If no sections found, use viewport-height based sections
  if (sections.length === 0) {
    createVirtualSections();
  } else {
    // Apply snap point class to found sections
    sections.forEach(section => {
      // Only apply to sections that are large enough
      if (section.offsetHeight > MIN_SECTION_HEIGHT_PX) {
        section.classList.add('snap-scroll-section');
      }
    });
  }
}

function createVirtualSections() {
  // For pages without clear sections, divide content into viewport-sized chunks
  const mainContent = document.body;
  const viewportHeight = window.innerHeight;
  const totalHeight = mainContent.scrollHeight;
  
  // Don't create virtual sections if content is too short
  if (totalHeight < viewportHeight * 2) {
    return;
  }
  
  // Add snap container class to body for CSS to handle scroll-snap
  document.body.classList.add('snap-scroll-container-virtual');
}

function observeDOMChanges() {
  // Create observer to watch for dynamic content changes
  const observer = new MutationObserver((mutations) => {
    // Debounce the reapplication of snap points
    clearTimeout(window.snapScrollTimeout);
    window.snapScrollTimeout = setTimeout(() => {
      if (document.body.classList.contains('snap-scroll-enabled')) {
        // Remove old snap classes
        const oldSnapElements = document.querySelectorAll('.snap-scroll-section');
        oldSnapElements.forEach(element => {
          element.classList.remove('snap-scroll-section');
        });
        // Reapply snap points
        applySnapPoints();
      }
    }, DOM_OBSERVER_DEBOUNCE_MS);
  });
  
  // Observe changes to the body and its children
  observer.observe(document.body, {
    childList: true,
    subtree: true
  });
}

// Add keyboard navigation for snap scrolling
document.addEventListener('keydown', (e) => {
  if (!document.body.classList.contains('snap-scroll-enabled')) {
    return;
  }
  
  // Space or Page Down: scroll to next section
  if (e.key === ' ' || e.key === 'PageDown') {
    e.preventDefault();
    scrollToNextSection();
  }
  
  // Page Up: scroll to previous section
  if (e.key === 'PageUp') {
    e.preventDefault();
    scrollToPreviousSection();
  }
});

function scrollToNextSection() {
  const sections = document.querySelectorAll('.snap-scroll-section');
  const currentScrollY = window.scrollY;
  
  for (let section of sections) {
    const rect = section.getBoundingClientRect();
    const absoluteTop = rect.top + currentScrollY;
    
    if (absoluteTop > currentScrollY + SCROLL_THRESHOLD_PX) {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
      return;
    }
  }
  
  // If no next section, scroll to bottom
  window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
}

function scrollToPreviousSection() {
  const sections = document.querySelectorAll('.snap-scroll-section');
  const currentScrollY = window.scrollY;
  
  for (let i = sections.length - 1; i >= 0; i--) {
    const section = sections[i];
    const rect = section.getBoundingClientRect();
    const absoluteTop = rect.top + currentScrollY;
    
    if (absoluteTop < currentScrollY - SCROLL_THRESHOLD_PX) {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
      return;
    }
  }
  
  // If no previous section, scroll to top
  window.scrollTo({ top: 0, behavior: 'smooth' });
}
