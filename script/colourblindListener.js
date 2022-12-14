window.selectedFilter = null;

window.onload = function() {
  if (!chrome || !chrome.storage || !chrome.storage.local) return;
  chrome.storage.local.get(["key"], function(result) {
    try {
      document.getElementById(result.key).click();
    } catch (e) {
      console.log(e);
    }
  });
};

function setSelectedFilterId(value) {
  try {
    chrome.storage.local.set({ key: value }, function() {
      document.getElementById(value).checked = true;
    });
  } catch {}
}

function applyPageFilter(fileName) {
  chrome.tabs.executeScript({ file: fileName });
}

document.querySelectorAll(['[id^="radio"]']).forEach(radioButton => {
  const filter = radioButton.parentElement.id.replace("option-", "");
  radioButton.addEventListener("click", function() {
    setSelectedFilterId(radioButton.id);
    applyPageFilter(`filters/${filter}.js`);
    window.selectedFilter = filter
    applyPluginFilter(filter);
  });
});

