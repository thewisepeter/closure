let INACTIVITY_THRESHOLD = 10 * 60 * 1000; // Default to 10 minutes in milliseconds
let tabActivity = {}; // Store the last active time for each tab
let closedTabs = []; // Store the closed tabs

// Load the custom inactivity threshold from Chrome storage
chrome.storage.sync.get(['inactivityThreshold'], (result) => {
  if (result.inactivityThreshold) {
    INACTIVITY_THRESHOLD = result.inactivityThreshold; // Update threshold if a custom value exists
  }
});

// Listen for changes to the inactivityThreshold in storage
chrome.storage.onChanged.addListener((changes, namespace) => {
  if (changes.inactivityThreshold) {
    INACTIVITY_THRESHOLD = changes.inactivityThreshold.newValue; // Update threshold
    console.log(`Inactivity Threshold updated: ${INACTIVITY_THRESHOLD} ms`);
  }
});

// Function to manually update the tabActivity for all tabs
function updateAllTabsActivity() {
  chrome.tabs.query({}, (tabs) => {
    let now = Date.now();
    tabs.forEach((tab) => {
      // If a tab doesn't have a record, we assume it's active
      if (!tabActivity[tab.id]) {
        tabActivity[tab.id] = now;
      }
    });
  });
}

// Function to check and close inactive tabs
function checkAndCloseInactiveTabs() {
  chrome.tabs.query({}, (tabs) => {
    let now = Date.now();
    console.log(`this is the value of now: ${now};`);

    tabs.forEach((tab) => {
      // Skip pinned or active tabs
      if (tab.pinned || tab.active) {
        return;
      }

      let lastActiveTime = tabActivity[tab.id] || now;
      console.log(`this is the value of lastActiveTime: ${lastActiveTime};`);

      console.log(`this is the difference ${now - lastActiveTime};`);

      if (now - lastActiveTime >= INACTIVITY_THRESHOLD) {

        closedTabs.push({ id: tab.id, url: tab.url, title: tab.title });

        // Save the closed tabs to Chrome storage
        chrome.storage.sync.set({ closedTabs });
        
        // Close the tab if it has been inactive for the threshold time
        chrome.tabs.remove(tab.id);
      }
    });
  });
}

// Periodically update all tabs' last activity time (this simulates manual interval testing)
setInterval(updateAllTabsActivity, 5 * 60 * 1000); // Every 5 minutes

// Periodically check for inactive tabs every 1 minute
setInterval(checkAndCloseInactiveTabs, 1 * 60 * 1000); // Every 1 minute for testing

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