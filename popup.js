// Save button click event handler
document.getElementById("save").addEventListener("click", () => {
  const inactivityMinutes = document.getElementById("inactivity").value;

  if (isNaN(inactivityMinutes) || inactivityMinutes < 1) {
    alert('Please enter a valid number of minutes (at least 1).');
    return; // Prevent saving
  }

  const inactivityMilliseconds = inactivityMinutes * 60 * 1000;

  chrome.storage.sync.set({ inactivityThreshold: inactivityMilliseconds }, () => {
    alert('Settings saved!');
    console.log(`Inactivity Threshold saved: ${inactivityMilliseconds} ms`);
    window.close(); // Close the popup after saving
  });
});

// Load the stored inactivity threshold on popup load
chrome.storage.sync.get(['inactivityThreshold'], (result) => {
  if (result.inactivityThreshold) {
    document.getElementById("inactivity").value = result.inactivityThreshold / (60 * 1000);
  }
});

// Function to display closed tabs in the popup
function displayClosedTabs() {
  chrome.storage.sync.get(['closedTabs'], (result) => {
    const closedTabs = result.closedTabs || [];
    const tabsList = document.getElementById("closedTabsList");

    tabsList.innerHTML = ''; // Clear existing list

    if (closedTabs.length === 0) {
      const noTabsMessage = document.createElement('p');
      noTabsMessage.textContent = 'No tabs have been closed yet.';
      tabsList.appendChild(noTabsMessage);
    } else {
      closedTabs.forEach((tab, index) => {
        const listItem = document.createElement('li');
        listItem.textContent = tab.title;
        const reopenButton = document.createElement('button');
        reopenButton.textContent = 'Reopen';
        reopenButton.addEventListener('click', () => {
          chrome.tabs.create({ url: tab.url });
        });
        listItem.appendChild(reopenButton);
        tabsList.appendChild(listItem);
      });
    }
  });
}

// Load closed tabs on popup load
document.addEventListener('DOMContentLoaded', () => {
  displayClosedTabs();
});


document.addEventListener('DOMContentLoaded', () => {
  // Load closed tabs on popup load
  displayClosedTabs();

  // Tab switching logic
  document.getElementById("settingsTab").addEventListener("click", () => {
    document.getElementById("settingsTab").classList.add("active");
    document.getElementById("recentTabsTab").classList.remove("active");
    document.getElementById("settingsContent").classList.add("active");
    document.getElementById("recentTabsContent").classList.remove("active");
  });

  document.getElementById("recentTabsTab").addEventListener("click", () => {
    document.getElementById("recentTabsTab").classList.add("active");
    document.getElementById("settingsTab").classList.remove("active");
    document.getElementById("recentTabsContent").classList.add("active");
    document.getElementById("settingsContent").classList.remove("active");
  });
});
