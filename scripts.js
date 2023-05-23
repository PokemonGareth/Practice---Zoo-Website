//-----DARK/LIGHT MODE-----
//Function for changing theme
function changeCSS(){
    var theme = document.getElementById("theme"); //gets the current theme from the link in the HTML
    var toggle = document.getElementById("themebutton");
    var themename = theme.getAttribute('href');


    if(themename == 'light.css'){ //detects whether the href = dark mode
        theme.setAttribute('href', 'dark.css'); //if the dark mode is enabled, it will swap over to light mode
        toggle.innerHTML = '<img src="Images/Toggle_off.png" alt="Lightmode Icon" style="height: 30px; width: 30px;">';
        localStorage.setItem('theme', 'dark');
    }
    else{
        theme.setAttribute('href', 'light.css'); //if the theme is not dark mode, it will change to dark mode.
        toggle.innerHTML = '<img src="Images/Toggle_on.png" alt="Darkmode Icon" style="height: 30px; width: 30px;">';
        localStorage.setItem('theme', 'light');
    }
}

var savedTheme = localStorage.getItem('theme'); //This will carry the current theme over to the other pages

if (savedTheme === 'dark'){ //works out if stored theme is light and changes it if necessary
    document.getElementById('theme').setAttribute('href', 'dark.css');
    document.getElementById('themebutton').innerHTML = '<img src="Images/Toggle_off.png" alt="Lightmode Icon" style="height: 30px; width: 30px;">';
}




//-----GOOGLE MAPS API-----
let map, infoWindow;

function initMap(){

    const ZooLocation = {lat: 50.843386039480244, lng: -3.1434076170986036};

    const map = new google.maps.Map(document.getElementById('map'),{
        zoom: 20,
        center: ZooLocation,
        mapTypeId: 'satellite',
    });

    const marker = new google.maps.Marker({
        position: ZooLocation,
        map: map,
    })

    infoWindow = new google.maps.InfoWindow();

    const locationButton = document.createElement("button");

    locationButton.textContent = "Pan to Current Location";
    locationButton.classList.add("custom-map-control-button");
    map.controls[google.maps.ControlPosition.TOP_CENTER].push(locationButton);
    locationButton.addEventListener("click", () => {
        if(navigator.geolocation){
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const pos = {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude,
                    };
                    infoWindow.setPosition(pos);
                    infoWindow.setContent("Location Found.");
                    infoWindow.open(map);
                    map.setCenter(pos);
                },
                () => {
                    handleLocationError(true, infoWindow, map.getCenter());
                }
            )
        } else{
            handleLocationError(false, infoWindow, map.getCenter());
        }
    });
}

function handleLocationError(browserHasGeolocation, infoWindow, pos){
    infoWindow.setPosition(pos);
    infoWindow.setContent(
        browserHasGeolocation
        ? "Error: The Geolocation Service Failed."
        : "Error: Your Browser doesn't support Geolocation."
    );
    infoWindow.open(map);
}

window.initMap = initMap;