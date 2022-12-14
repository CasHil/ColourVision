if (document.getElementById("current_colourblind_style")) {
    stylingID = document.getElementById("current_colourblind_style").remove();
    currentColourblindFilter = document.getElementById("current_colourblind_filter").remove();
}
stylingID = document.createElement('style');
stylingID.id = "current_colourblind_style";
document.body.appendChild(stylingID);

currentColourblindFilter = document.createElement('div');
currentColourblindFilter.id = "current_colourblind_filter";
currentColourblindFilter.setAttribute('style', 'height: 0; padding: 0; margin: 0; line-height: 0;');
document.body.appendChild(currentColourblindFilter);

stylingID.innerHTML = 'html{-webkit-filter:none;filter:none;}';
