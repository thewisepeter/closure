document.getElementById("save").addEventListener("click", () => {
  const inactivityMinutes = document.getElementById("inactivity").value;
  const inactivityMilliseconds = inactivityMinutes * 60 * 1000;

  chrome.storage.sync.set({ inactivityThreshold: inactivityMilliseconds }, () => {
    alert('Settings saved!');
  });
});

chrome.storage.sync.get(['inactivityThreshold'], (result) => {
  if (result.inactivityThreshold) {
    document.getElementById("inactivity").value = result.inactivityThreshold / (60 * 1000);
  }
});
