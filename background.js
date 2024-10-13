let INACTIVITY_THRESHOLD = 10 * 60 * 1000; // Default to 10 minutes in milliseconds
let tabActivity = {}; // Store the last active time for each tab

// Load the custom inactivity threshold from Chrome storage
chrome.storage.sync.get(['inactivityThreshold'], (result) => {
  if (result.inactivityThreshold) {
    INACTIVITY_THRESHOLD = result.inactivityThreshold; // Update threshold if a custom value exists
  }
});

// Function to check and close inactive tabs
function checkAndCloseInactiveTabs() {
  chrome.tabs.query({}, (tabs) => {
    let now = Date.now();

    tabs.forEach((tab) => {
      // Skip pinned or active tabs
      if (tab.pinned || tab.active) {
        return;
      }

      let lastActiveTime = tabActivity[tab.id] || now;

      if (now - lastActiveTime >= INACTIVITY_THRESHOLD) {
        // Close the tab if it has been inactive for the threshold time
        chrome.tabs.remove(tab.id);
      }
    });
  });
}

// Update activity on tab focus change
chrome.tabs.onActivated.addListener((activeInfo) => {
  let now = Date.now();
  tabActivity[activeInfo.tabId] = now;
});

// Track when a tab is updated (refreshed, navigated, etc.)
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  let now = Date.now();
  tabActivity[tabId] = now;
});

// Periodically check for inactive tabs every 1 minute
setInterval(checkAndCloseInactiveTabs, 1 * 60 * 1000); // Every 1 minute for testing
