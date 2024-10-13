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
  });
});

chrome.storage.sync.get(['inactivityThreshold'], (result) => {
  if (result.inactivityThreshold) {
    document.getElementById("inactivity").value = result.inactivityThreshold / (60 * 1000);
  }
});
