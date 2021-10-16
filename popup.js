const optionsButton = document.getElementById("options");
const enableButton = document.getElementById("enable");
const disableButton = document.getElementById("disable");

// set inital CSS states based on chrome.local.enabled
document.addEventListener("DOMContentLoaded", () => {
  chrome.storage.local.get(["enabled"], (local) => {
    if (local.enabled) {
      enableButton.className = "pure-button-primary";
      disableButton.className = "pure-button";
    } else {
      disableButton.className = "pure-button-primary";
      enableButton.className = "pure-button";
    }
  });
});

enableButton.addEventListener("click", () => {
  chrome.storage.local.set({ enabled: true });

  enableButton.className = "pure-button-primary";
  disableButton.className = "pure-button";
});

disableButton.addEventListener("click", () => {
  chrome.storage.local.set({ enabled: false });

  disableButton.className = "pure-button-primary";
  enableButton.className = "pure-button";
});

optionsButton.addEventListener("click", () => {
  chrome.runtime.openOptionsPage();
});
