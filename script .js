const currentLocation = document.querySelector("#current-location");
const search = document.querySelector("#search");
const searchbar = document.querySelector(".form-cont");
const weatherData = document.querySelector(".weather-information");
const locationAccess = document.querySelector(".location-access");
const loader = document.querySelector(".loading");

const API_KEY = "d1845658f92b31c64bd94f06f7188c9c";
let currentTab = currentLocation;
currentTab.classList.add("bg");

getFromSessionStorage();



currentLocation.addEventListener("click", () => {

    switchTab(currentLocation);
});

search.addEventListener("click", () => {

    switchTab(search);
});

function switchTab(useTab){
    if(useTab != currentTab)
    {
        currentTab.classList.remove("bg");
        currentTab = useTab;
        currentTab.classList.add("bg");


        if(!searchbar.classList.contains("active")){
            weatherData.classList.remove("active");
            locationAccess.classList.remove("active");
            searchbar.classList.add("active");
        }
        else{
            searchbar.classList.remove("active");
            weatherData.classList.remove("active");
            getFromSessionStorage();
        }
    }

} 

function getFromSessionStorage(){
    
    const localCoordinates = sessionStorage.getItem("user-coordinates");
    
    if(!localCoordinates)
    {
        
        locationAccess.classList.add("active");
        
    }
    else{
        
        const data = JSON.parse(localCoordinates);
        
        fetchData(data);
        
    }
}

async function fetchData(data){
    const {lat, lon} = data;
    // let lat = 16.333;
    // let lon = 18.333;

    console.log('1');
    locationAccess.classList.remove("active");
    loader.classList.add("active");

    try {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
          );
        const  details = await response.json();
        loader.classList.remove("active");
        weatherData.classList.add("active");
        console.log('2');
        renderWeatherData(details);
    }
    catch(err){

        loader.classList.remove("active");
        //few more to add
        alert("error in processing try later");

    }
}


    const cityName = document.querySelector("[data-ctyName]");
    const flagName = document.querySelector("[data-contFlag]");
    const desc = document.querySelector("[data-weather]");
    const desc2 = document.querySelector("[data-currentWeather]");
    const temp = document.querySelector("[data-temp]");
    const wind = document.querySelector("[data-wind]");
    const humidity = document.querySelector("[data-humidity]");
    const cloud = document.querySelector("[data-cloud]");


function renderWeatherData(weatherInfo){
    console.log('3');
    console.log('a jayen thik chaluchi');
    cityName.innerText = weatherInfo?.name;
    console.log('3.1');
    flagName.src = `https://flagcdn.com/144x108/${weatherInfo?.sys?.country.toLowerCase()}.png`;
    desc.innerText = weatherInfo?.weather?.[0]?.description;
    console.log('3.5')
    desc2.src = `http://openweathermap.org/img/w/${weatherInfo?.weather?.[0]?.icon}.png`;
    console.log('4');
    temp.innerText =`${weatherInfo?.main?.temp} °C`;
    wind.innerText = `${weatherInfo?.wind?.speed} m/s`;
    humidity.innerText =`${weatherInfo?.main?.humidity}%`;
    cloud.innerText =`${weatherInfo?.clouds?.all}%`;
    console.log('5');
}
const locbtn = document.querySelector("[data-grant-access]");
locbtn.addEventListener("click", getLocation);


function getLocation() {
    if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    }
    else {
        //HW - show an alert for no gelolocation support available
        alert("No gelolocation support available")
    }
}

function showPosition(position) {

    const userCoordinates = {
        lat: position.coords.latitude,
        lon: position.coords.longitude,
    }

    sessionStorage.setItem("user-coordinates", JSON.stringify(userCoordinates));
    fetchData(userCoordinates);

}

const cityInput = document.querySelector('[data-city]');

searchbar.addEventListener("submit", (e) =>{
    e.preventDefault();
    let cityName = cityInput.value;

    if(cityName === "")
      return;
    else{
        fetchSearchWeather(cityName);
    }
});


async function fetchSearchWeather(city){
    loader.classList.add("active");
    weatherData.classList.remove("active");
    locationAccess.classList.remove("active");

    try
    {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
          );
        const data = await response.json();
        loader.classList.remove("active");
        weatherData.classList.add("active");
        renderWeatherData(data);

    }

    catch (err) {
        alert("Error");
    }
}

const loadSearch = document.querySelector("#loadsearch");
loadSearch.addEventListener("click", (e) =>{
    e.preventDefault();
    let cityName = cityInput.value;

    if(cityName === "")
      return;
    else{
        fetchSearchWeather(cityName);
    }
});

