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

function applyPageFilter(code) {
  chrome.tabs.executeScript(null, { code: code });
}

document.querySelectorAll(['[id^="radio"]']).forEach(radioButton => {
  const filter = radioButton.parentElement.id.replace("option-", "");
  console.log(filter)
  radioButton.addEventListener("click", function() {
    setSelectedFilterId(radioButton.id);
    applyPageFilter(createFilter(filter));
    window.selectedFilter = filter
    applyPluginFilter(filter);
  });
});

const filterForSVG = (type, filterValues) =>
  `<svg id="colorblind-filters" style="display: none"> 
    <defs> 
      <filter id="${type}" color-interpolation-filters="linearRGB"> 
      <feColorMatrix type="matrix" values="${filterValues}" in="SourceGraphic" /> 
      </filter> 
    </defs> 
  </svg>`;
      
// Numbers are taken from http://web.archive.org/web/20081014161121/http://www.colorjack.com/labs/colormatrix/
function createFilter(filterType) {
  const filters = {
    protanomaly: filterForSVG("protanomaly", "0.46533,0.53467,-0.00000,0,0 0.06533,0.93467,0.00000,0,0 0.00268,-0.00268,1.00000,0,0 0,0,0,1,0"),
    protanopia: filterForSVG("protanopia", "0.10889,0.89111,-0.00000,0,0 0.10889,0.89111,0.00000,0,0 0.00447,-0.00447,1.00000,0,0 0,0,0,1,0"),
    deuteranomaly: filterForSVG("deuteranomaly", "0.57418,0.42582,-0.00000,0,0 0.17418,0.82582,-0.00000,0,0 -0.01318,0.01318,1.00000,0,0 0,0,0,1,0"),
    deuteranopia: filterForSVG("deuteranopia", "0.29031,0.70969,-0.00000,0,0 0.29031,0.70969,-0.00000,0,0 -0.02197,0.02197,1.00000,0,0 0,0,0,1,0"),    
    achromatomaly: filterForSVG("achromatomaly", "0.618,0.320,0.062,0,0 0.163,0.775,0.062,0,0 0.163,0.320,0.516,0,0 0,0,0,1,0"),
    achromatopsia: filterForSVG("achromatopsia","0.299,0.587,0.114,0,0 0.299,0.587,0.114,0,0 0.299,0.587,0.114,0,0 0,0,0,1,0"),
    tritanomaly: filterForSVG("tritanomaly", "1.00000,0.09142,-0.09142,0,0 0.00000,0.92030,0.07970,0,0 -0.00000,0.52030,0.47970,0,0 0,0,0,1,0"),
    tritanopia: filterForSVG("tritanopia", "1.00000,0.15236,-0.15236,0,0 0.00000,0.86717,0.13283,0,0 -0.00000,0.86717,0.13283,0,0 0,0,0,1,0")
  }

  if (document.getElementById("current_colourblind_style")) {
    stylingID = document.getElementById("current_colourblind_style").remove();
    currentColourblindFilter = document.getElementById("current_colourblind_filter").remove();
  }

  var stylingID = document.createElement('style');
  stylingID.id = "current_colourblind_style";
  document.body.appendChild(stylingID);

  var currentColourblindFilter = document.createElement('div');
  currentColourblindFilter.id = "current_colourblind_filter";
  currentColourblindFilter.setAttribute('style', 'height: 0; padding: 0; margin: 0; line-height: 0;');
  document.body.appendChild(currentColourblindFilter);

  var myScript = document.createElement('script');
  myScript.textContent = `
  var currentColourblindFilter = ${currentColourblindFilter};
  var stylingID = ${stylingID};
  currentColourblindFilter.innerHTML = ${filters[filterType]};
  stylingID.innerHTML = 'html{-webkit-filter:url(#${filterType});filter:(#${filterType});}';
  `
  document.head.appendChild(myScript);
}
  
