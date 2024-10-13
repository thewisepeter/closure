const INACTIVITY_THRESHOLD = 60 * 60 * 1000; // 1 hour in milliseconds
let tabActivity = {}; // Store the last active time for each tab

// Function to check and close inactive tabs
function checkAndCloseInactiveTabs() {
  chrome.tabs.query({}, (tabs) => {
    const now = Date.now();

    tabs.forEach((tab) => {
      // Skip pinned or active tabs
      if (tab.pinned || tab.active) {
        return;
      }

      const lastActiveTime = tabActivity[tab.id] || now;

      if (now - lastActiveTime >= INACTIVITY_THRESHOLD) {
        // Close the tab if it has been inactive for the threshold time
        chrome.tabs.remove(tab.id);
      }
    });
  });
}

// Update activity on tab focus change
chrome.tabs.onActivated.addListener((activeInfo) => {
  const now = Date.now();
  tabActivity[activeInfo.tabId] = now;
});

// Track when a tab is updated (refreshed, navigated, etc.)
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  const now = Date.now();
  tabActivity[tabId] = now;
});

// Periodically check for inactive tabs every 5 minutes
setInterval(checkAndCloseInactiveTabs, 5 * 60 * 1000); // Every 5 minutes
