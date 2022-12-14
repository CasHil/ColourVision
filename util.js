export default function findAndRemoveElement(elementId) {
    if (document.getElementById(elementId)) {
      document.getElementById(elementId).remove();
    }
  }

// export default function findAndRemoveColourblindFilterAndStyle() {
//     findAndRemoveElement("current_colourblind_style");
//     findAndRemoveElement("current_colourblind_filter");
// }

// export default function createStyleAndFilterElements() {
//     var stylingId = document.createElement('style');
//     stylingId.id = "current_colourblind_style";
//     document.body.appendChild(stylingId);

//     var filterId = document.createElement('div');
//     filterId.id = "current_colourblind_filter";
//     filterId.setAttribute('style', 'height: 0; padding: 0; margin: 0; line-height: 0;');
//     document.body.appendChild(filterId);
//     return [stylingId, filterId];
// }

var util = (function() {
    function findAndRemoveElement(elementId) {
        if (document.getElementById(elementId)) {
          document.getElementById(elementId).remove();
        }
      }

    function findAndRemoveColourblindFilterAndStyle() {
        findAndRemoveElement("current_colourblind_style");
        findAndRemoveElement("current_colourblind_filter");
    }

    function createStyleAndFilterElements() {
        var stylingId = document.createElement('style');
        stylingId.id = "current_colourblind_style";
        document.body.appendChild(stylingId);
    
        var filterId = document.createElement('div');
        filterId.id = "current_colourblind_filter";
        filterId.setAttribute('style', 'height: 0; padding: 0; margin: 0; line-height: 0;');
        document.body.appendChild(filterId);
        return [stylingId, filterId];
    }
    return {
        findAndRemoveElement: findAndRemoveElement,
        findAndRemoveColourblindFilterAndStyle: findAndRemoveColourblindFilterAndStyle,
        createStyleAndFilterElements: createStyleAndFilterElements
    }
  })()