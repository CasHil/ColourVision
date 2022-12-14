const createStylesForCSS = type =>
  `#rainbow{-webkit-filter:url(#${type});}`;
const SVGFilter = (type, filterValues) =>
  `<svg id="colorblind-filters" style="display: none"> 
    <defs> 
      <filter id="${type}" color-interpolation-filters="linearRGB"> 
      <feColorMatrix type="matrix" values="${filterValues}" in="SourceGraphic" /> 
      </filter> 
    </defs> 
  </svg>`;
      
// Numbers are taken from http://web.archive.org/web/20081014161121/http://www.colorjack.com/labs/colormatrix/
const filters = {
  protanomalySVG: SVGFilter("protanomaly", "0.46533,0.53467,-0.00000,0,0 0.06533,0.93467,0.00000,0,0 0.00268,-0.00268,1.00000,0,0 0,0,0,1,0"),
  protanomalyStyles: createStylesForCSS("protanomaly"),

  protanopiaSVG: SVGFilter("protanopia", "0.10889,0.89111,-0.00000,0,0 0.10889,0.89111,0.00000,0,0 0.00447,-0.00447,1.00000,0,0 0,0,0,1,0"),
  protanopiaStyles: createStylesForCSS("protanopia"),

  deuteranomalySVG: SVGFilter("deuteranomaly", "0.57418,0.42582,-0.00000,0,0 0.17418,0.82582,-0.00000,0,0 -0.01318,0.01318,1.00000,0,0 0,0,0,1,0"),
  deuteranomalyStyles: createStylesForCSS("deuteranomaly"),
  
  deuteranopiaSVG: SVGFilter("deuteranopia", "0.29031,0.70969,-0.00000,0,0 0.29031,0.70969,-0.00000,0,0 -0.02197,0.02197,1.00000,0,0 0,0,0,1,0"),
  deuteranopiaStyles: createStylesForCSS("deuteranopia"),
    
  achromatomalySVG: SVGFilter("achromatomaly", "0.618,0.320,0.062,0,0 0.163,0.775,0.062,0,0 0.163,0.320,0.516,0,0 0,0,0,1,0"),
  achromatomalyStyles: createStylesForCSS("achromatomaly"),

  achromatopsiaSVG: SVGFilter("achromatopsia","0.299,0.587,0.114,0,0 0.299,0.587,0.114,0,0 0.299,0.587,0.114,0,0 0,0,0,1,0"),
  achromatopsiaStyles: createStylesForCSS("achromatopsia"),

  tritanomalySVG: SVGFilter("tritanomaly", "1.00000,0.09142,-0.09142,0,0 0.00000,0.92030,0.07970,0,0 -0.00000,0.52030,0.47970,0,0 0,0,0,1,0"),
  tritanomalyStyles: createStylesForCSS("tritanomaly"),

  tritanopiaSVG: SVGFilter("tritanopia", "1.00000,0.15236,-0.15236,0,0 0.00000,0.86717,0.13283,0,0 -0.00000,0.86717,0.13283,0,0 0,0,0,1,0"),
  tritanopiaStyles: createStylesForCSS("tritanopia")
};

function findAndRemoveElement(elementId) {
  if (document.getElementById(elementId)) {
    document.getElementById(elementId).remove();
  }
}

function applyPluginFilter(filter) {
  if (filter === "normal")
    return removeFilter({ target: { id: window.selectedFilter } });

  findAndRemoveElement("styleID")
  findAndRemoveElement("filterID")
  
  var styleId = document.createElement("style");
  styleId.id = "styleID";
  document.body.appendChild(styleId);

  var filterId = document.createElement("div");
  filterId.id = "filterID";
  filterId.setAttribute("style", "height: 0; padding: 0; margin: 0; line-height: 0;"
  );
  document.body.appendChild(filterId);
  filterId.innerHTML = filters[filter + "SVG"];
  styleId.innerHTML = filters[filter + "Styles"];
  
}

function selectFilter(filterEvent) {
  if (!filterEvent) return;
  const filter = getFilterId(filterEvent.target);
  if (!filter) return;
  applyPluginFilter(filter);
}

function getFilterId(element) {
  let filterID = element.id.replace("option-", "");
  return !!filterID ? filterID : getFilterId(element.parentNode);
}

function removeFilter(filterEvent) {
  if (!filterEvent) return;
  const filter = getFilterId(filterEvent.target);
  if (!filter) return;

  findAndRemoveElement("styleID")
  findAndRemoveElement("filterID")
}

const options = document.querySelectorAll('[id^="option-"]');

options.forEach(option => {
  option.addEventListener("mouseover", selectFilter, false);
  option.addEventListener("mouseout", filterEvent => {
      removeFilter(filterEvent);
      if (window.selectedFilter) applyPluginFilter(window.selectedFilter);
    },
    false);
});