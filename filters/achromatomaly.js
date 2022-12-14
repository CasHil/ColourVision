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

currentColourblindFilter.innerHTML = 
`<svg id="colorblind-filters" style="display: none"> 
    <defs> 
        <filter id="achromatomaly"> 
            <feColorMatrix type="matrix" values="0.618,0.320,0.062,0,0 0.163,0.775,0.062,0,0 0.163,0.320,0.516,0,0 0,0,0,1,0" in="SourceGraphic" /> 
        </filter> 
    </defs> 
</svg>`;
stylingID.innerHTML = 'html{-webkit-filter:url(#achromatomaly);filter:(#achromatomaly);}'
