import keys from "./keys.js";
const API = keys['API'];
const KEY = keys['KEY'];

const form = document.getElementById("myForm");
const form2 = document.getElementById("myForm2");
const entry = document.getElementById("entry");
const main = document.getElementById("main");
const display = document.getElementById("options");
const location_info = document.getElementById("location");
const img_w = document.getElementById("img_w");
const location_data = document.getElementById("location-data");
const location_data2 = document.getElementById("location_data2");
const output = document.getElementById("output");
const forecast = document.getElementById("forecast");
const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
let area;

form.addEventListener("submit", (event) => {
    event.preventDefault();
    let count = 0;
    entry.classList.add("hidden");
    entry.classList.remove("relative");

    main.classList.remove("hidden");
    main.classList.add("relative");

    area = form.place.value;
    fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${area}&limit=7&appid=${API}`)
    .then(res => res.json())
    .then(data => {
        // Checks if there is data available for the location entered
        if (Object.keys(data).length === 0) {
            output.innerText = "";
            output.innerText = "No results found from Open Weather";
            output.nextElementSibling.classList.add("hidden");
        }
        else {
            output.innerText = "Search Results";
            output.nextElementSibling.classList.remove("hidden");
        }

        // Gets each elemnent in the data from the API
        for (let each of data){
            const divElement = document.createElement('div');
            divElement.className = 'w-full h-1/5 flex items-center border-b border-white hover:cursor-pointer';

            // checks if the name, state and country of a location is undefined
            if (each['state'] == undefined) {
                each['state'] = "";
            }
            if (each['name'] == undefined) {
                each['name'] = "";
            }
            if (each['country'] == undefined) {
                each['country'] = "";
            }
            
            // creates of a list of places with the same name
            divElement.innerHTML = 
            `
            <p class="text-xl md:text-4xl pr-8" id="place">${each['name']}</p>
            <p class="md:text-2xl pr-8" id="state">${each['state']}</p>
            <p class="md:text-2xl pr-8" id="country">${each['country']}</p>
            `
            display.appendChild(divElement)

            // Displays data for the first element in the list
            if (count === 0) {
                location_info.innerHTML = ""
                location_info.innerHTML =
                `
                <p class="text-xl md:text-4xl" id="place">${each['name']}</p>
                <p class="text-lg md:text-2xl" id="state">${each['state']}</p>
                <p class="text-lg md:text-2xl" id="country">${each['country']}</p>
                `

                const lat = each['lat'];
                const lon = each['lon'];

                // Gets weather data for the first element
                fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${KEY}`)
                .then(res => res.json())
                .then (data => {
                    let weather = data['weather'][0];
                    let weather_main = data['main'];

                    img_w.setAttribute("src", `https://openweathermap.org/img/wn/${weather['icon']}@2x.png`);
                    location_data.innerHTML = ""
                    location_data.innerHTML =
                    `
                    <div class="w-full h-fit flex">
                        <p class="text-lg md:text-2xl font-bold text-oxford_blue mr-2">${weather['main']}:</p>
                        <p class="text-md md:text-xl text-oxford_blue mb-1">${weather['description']}</p>
                    </div>
                    <div class="w-full h-fit flex">
                        <p class="text-lg md:text-2xl  font-bold text-oxford_blue mr-3">Temp: </p>
                        <p class="text-lg md:text-2xl text-oxford_blue">${(weather_main['temp'] - 273.15).toFixed(2)} C</p>
                    </div>
                    
                    `;

                    location_data2.innerHTML = ""
                    location_data2.innerHTML =
                    `
                    <div class="w-full h-fit flex">
                        <p class="text-lg md:text-2xl font-bold text-oxford_blue mr-3">Feels Like : </p>
                        <p class="text-md md:text-xl text-oxford_blue">${(weather_main['feels_like'] - 273.15).toFixed(2)} C</p>
                    </div>
                    <div class="w-full h-fit flex">
                        <p class="text-lg md:text-2xl font-bold text-oxford_blue mr-3">Pressure : </p>
                        <p class="text-lg md:text-2xl text-oxford_blue">${weather_main['pressure']} hPa</p>
                    </div>
                    <div class="w-full h-fit flex">
                        <p class="text-lg md:text-2xl  font-bold text-oxford_blue mr-3">Humidity : </p>
                        <p class="text-lg md:text-2xl text-oxford_blue">${weather_main['humidity']}%</p>
                    </div>
                    `
                })

                // Gets weather forecast for the first location on the list
                fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&cnt=4&appid=${KEY}`)
                .then(res => res.json())
                .then (data => {
                    forecast.innerHTML = "";

                    let list_in = data['list'];
                    for (let each in list_in) {
                        let list_value = list_in[each];
                        let f_weather = list_value['weather'][0];
                        let dt = list_value['dt'];
                        const f_temp = list_value['main']['temp']

                        const date = new Date(dt * 1000);
                        const dayOfWeek = days[date.getDay()];
                        const time = date.toLocaleTimeString().slice(0, -6);
                        const am_pm = date.toLocaleTimeString().slice(-2);
                        let new_div = document.createElement('div');
                        new_div.innerHTML =
                        `
                        <div class="w-52 md:w-44 h-full p-4 mr-4 md:mr-0 bg-white bg-opacity-50 flex flex-col items-center justify-between rounded-lg">
                            <p class="p-2 px-4 bg-black bg-opacity-50 rounded-lg text-white text-lg">${dayOfWeek}</p>
                            <img src="https://openweathermap.org/img/wn/${f_weather['icon']}@2x.png" alt="weather_icon">
                            <div class="flex flex-col items-center justify-between">
                                <p class="mb-2">${f_weather['description']}</p>
                                <p>${time} ${am_pm} - ${(f_temp - 273.15).toFixed(2)} C</p>
                            </div>
                        </div>
                        `
                        forecast.appendChild(new_div)
                    }
                })
            };
            count += 1;

            divElement.addEventListener("click", (event) => {

                // Adds the heading for the black box that displays the weather data
                location_info.innerHTML = ""
                location_info.innerHTML =
                `
                <p class="text-xl md:text-4xl" id="place">${each['name']}</p>
                <p class="text-lg md:text-2xl" id="state">${each['state']}</p>
                <p class="text-lg md:text-2xl" id="country">${each['country']}</p>
                `;

                const lat = each['lat'];
                const lon = each['lon'];

                // gets weather data on each location in the list
                fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${KEY}`)
                .then(res => res.json())
                .then (data => {
                    let weather = data['weather'][0];
                    let weather_main = data['main'];

                    img_w.setAttribute("src", `https://openweathermap.org/img/wn/${weather['icon']}@2x.png`);

                    location_data.innerHTML = ""
                    location_data.innerHTML =
                    `
                    <div class="w-full h-fit flex">
                        <p class="text-lg md:text-2xl font-bold text-oxford_blue mr-2">${weather['main']}:</p>
                        <p class="text-md md:text-xl text-oxford_blue mb-1">${weather['description']}</p>
                    </div>
                    <div class="w-full h-fit flex">
                        <p class="text-lg md:text-2xl  font-bold text-oxford_blue mr-3">Temp: </p>
                        <p class="text-lg md:text-2xl text-oxford_blue">${(weather_main['temp'] - 273.15).toFixed(2)} C</p>
                    </div>
                    
                    `;

                    location_data2.innerHTML = ""
                    location_data2.innerHTML =
                    `
                    <div class="w-full h-fit flex">
                        <p class="text-lg md:text-2xl font-bold text-oxford_blue mr-3">Feels Like : </p>
                        <p class="text-md md:text-xl text-oxford_blue">${(weather_main['feels_like'] - 273.15).toFixed(2)} C</p>
                    </div>
                    <div class="w-full h-fit flex">
                        <p class="text-lg md:text-2xl font-bold text-oxford_blue mr-3">Pressure : </p>
                        <p class="text-lg md:text-2xl text-oxford_blue">${weather_main['pressure']} hPa</p>
                    </div>
                    <div class="w-full h-fit flex">
                        <p class="text-lg md:text-2xl  font-bold text-oxford_blue mr-3">Humidity : </p>
                        <p class="text-lg md:text-2xl text-oxford_blue">${weather_main['humidity']}%</p>
                    </div>
                    `
                    
                })

                // Weather forecast for each location on the list
                fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&cnt=4&appid=${KEY}`)
                .then(res => res.json())
                .then (data => {
                    forecast.innerHTML = "";

                    let list_in = data['list'];
                    for (let each in list_in) {
                        let list_value = list_in[each];
                        let f_weather = list_value['weather'][0];
                        let dt = list_value['dt'];
                        const f_temp = list_value['main']['temp']

                        const date = new Date(dt * 1000);
                        const dayOfWeek = days[date.getDay()];
                        const time = date.toLocaleTimeString().slice(0, -6);
                        const am_pm = date.toLocaleTimeString().slice(-2);
                        console.log(time, am_pm)
                        let new_div = document.createElement('div');
                        new_div.innerHTML =
                        `
                        <div class="w-52 md:w-48 h-full p-4 mr-4 md:mr-0 bg-white bg-opacity-50 flex flex-col items-center justify-between rounded-lg">
                            <p class="p-2 px-4 bg-black bg-opacity-50 rounded-lg text-white text-lg">${dayOfWeek}</p>
                            <img src="https://openweathermap.org/img/wn/${f_weather['icon']}@2x.png" alt="weather_icon">
                            <div class="flex flex-col items-center justify-between">
                                <p class="mb-2">${f_weather['description']}</p>
                                <p>${time} ${am_pm} - ${(f_temp - 273.15).toFixed(2)} C</p>
                            </div>
                        </div>
                        `
                        forecast.appendChild(new_div)
                    }
                })

                // Weather forecast for each location on the list
                fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&cnt=4&appid=${KEY}`)
                .then(res => res.json())
                .then (data => {
                    forecast.innerHTML = "";

                    let list_in = data['list'];
                    for (let each in list_in) {
                        let list_value = list_in[each];
                        let f_weather = list_value['weather'][0];
                        let dt = list_value['dt'];
                        const f_temp = list_value['main']['temp']

                        const date = new Date(dt * 1000);
                        const dayOfWeek = days[date.getDay()];
                        const time = date.toLocaleTimeString().slice(0, -3);
                        let new_div = document.createElement('div');
                        new_div.innerHTML =
                        `
                        <div class="w-52 md:w-48 h-full p-4 mr-4 md:mr-0 bg-white bg-opacity-50 flex flex-col items-center justify-between rounded-lg">
                            <p class="p-2 px-4 bg-black bg-opacity-50 rounded-lg text-white text-lg">${dayOfWeek}</p>
                            <img src="https://openweathermap.org/img/wn/${f_weather['icon']}@2x.png" alt="weather_icon">
                            <div class="flex flex-col items-center justify-between">
                                <p class="mb-2">${f_weather['description']}</p>
                                <p>${time} - ${(f_temp - 273.15).toFixed(2)} C</p>
                            </div>
                        </div>
                        `
                        forecast.appendChild(new_div)
                    }
                })
            });
            
        };
        count = 0;
        
    });
});

form2.addEventListener("submit", (event) => {
    event.preventDefault();
    let count = 0;
    area = form2.place2.value;
    display.innerHTML = "" ;

    fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${area}&limit=7&appid=${API}`)
    .then(res => res.json())
    .then(data => {
        // Checks if there is data available for the location entered
        if (Object.keys(data).length === 0) {
            output.innerText = "";
            output.innerText = "No results found from Open Weather";
            output.nextElementSibling.classList.add("hidden");
        }
        else {
            output.innerText = "Search Results";
            output.nextElementSibling.classList.remove("hidden");
        }
        for (let each of data){
            const divElement = document.createElement('div');
            divElement.className = 'w-full h-1/5 flex items-center border-b border-white hover:cursor-pointer';

            // checks if the name, state and country of a location is undefined
            if (each['state'] == undefined) {
                each['state'] = "";
            }
            if (each['name'] == undefined) {
                each['name'] = "";
            }
            if (each['country'] == undefined) {
                each['country'] = "";
            }

            
            divElement.innerHTML = 
            `
            <p class="text-xl md:text-4xl pr-8" id="place">${each['name']}</p>
            <p class="md:text-2xl pr-8" id="state">${each['state']}</p>
            <p class="md:text-2xl pr-8" id="country">${each['country']}</p>
            `
            display.appendChild(divElement)
            
            // Adds weather data for the first element on the list
            if (count === 0) {
                location_info.innerHTML = ""
                location_info.innerHTML =
                `
                <p class="text-xl md:text-4xl" id="place">${each['name']}</p>
                <p class="text-lg md:text-2xl" id="state">${each['state']}</p>
                <p class="text-lg md:text-2xl" id="country">${each['country']}</p>
                `
                const lat = each['lat'];
                const lon = each['lon'];

                // Gets current weather data for the first element in the list
                fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${KEY}`)
                .then(res => res.json())
                .then (data => {
                    let weather = data['weather'][0];
                    let weather_main = data['main'];

                    img_w.setAttribute("src", `https://openweathermap.org/img/wn/${weather['icon']}@2x.png`);

                    location_data.innerHTML = ""
                    location_data.innerHTML =
                    `
                    <div class="w-full h-fit flex">
                        <p class="text-lg md:text-2xl font-bold text-oxford_blue mr-2">${weather['main']}:</p>
                        <p class="text-md md:text-xl text-oxford_blue mb-1">${weather['description']}</p>
                    </div>
                    <div class="w-full h-fit flex">
                        <p class="text-lg md:text-2xl  font-bold text-oxford_blue mr-3">Temp: </p>
                        <p class="text-lg md:text-2xl text-oxford_blue">${(weather_main['temp'] - 273.15).toFixed(2)} C</p>
                    </div>
                    
                    `;

                    location_data2.innerHTML = ""
                    location_data2.innerHTML =
                    `
                    <div class="w-full h-fit flex">
                        <p class="text-lg md:text-2xl font-bold text-oxford_blue mr-3">Feels Like : </p>
                        <p class="text-md md:text-xl text-oxford_blue">${(weather_main['feels_like'] - 273.15).toFixed(2)} C</p>
                    </div>
                    <div class="w-full h-fit flex">
                        <p class="text-lg md:text-2xl font-bold text-oxford_blue mr-3">Pressure : </p>
                        <p class="text-lg md:text-2xl text-oxford_blue">${weather_main['pressure']} hPa</p>
                    </div>
                    <div class="w-full h-fit flex">
                        <p class="text-lg md:text-2xl  font-bold text-oxford_blue mr-3">Humidity : </p>
                        <p class="text-lg md:text-2xl text-oxford_blue">${weather_main['humidity']}%</p>
                    </div>
                    `
                })

                // Gets weather forecast for the first location on the list
                fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&cnt=4&appid=${KEY}`)
                .then(res => res.json())
                .then (data => {
                    forecast.innerHTML = "";

                    let list_in = data['list'];
                    for (let each in list_in) {
                        let list_value = list_in[each];
                        let f_weather = list_value['weather'][0];
                        let dt = list_value['dt'];
                        const f_temp = list_value['main']['temp']

                        const date = new Date(dt * 1000);
                        const dayOfWeek = days[date.getDay()];
                        const time = date.toLocaleTimeString().slice(0, -6);
                        const am_pm = date.toLocaleTimeString().slice(-2);
                        let new_div = document.createElement('div');
                        new_div.innerHTML =
                        `
                        <div class="w-52 md:w-44 h-full p-4 mr-4 md:mr-0 bg-white bg-opacity-50 flex flex-col items-center justify-between rounded-lg">
                            <p class="p-2 px-4 bg-black bg-opacity-50 rounded-lg text-white text-lg">${dayOfWeek}</p>
                            <img src="https://openweathermap.org/img/wn/${f_weather['icon']}@2x.png" alt="weather_icon">
                            <div class="flex flex-col items-center justify-between">
                                <p class="mb-2">${f_weather['description']}</p>
                                <p>${time} ${am_pm} - ${(f_temp - 273.15).toFixed(2)} C</p>
                            </div>
                        </div>
                        `
                        forecast.appendChild(new_div)
                    }
                })
            };
            count += 1;

            // Adds click event to the displayed list and this their data on click
            divElement.addEventListener("click", () => {
                location_info.innerHTML = "";
                location_info.innerHTML =
                `
                <p class="text-xl md:text-4xl" id="place">${each['name']}</p>
                <p class="text-lg md:text-2xl" id="state">${each['state']}</p>
                <p class="text-lg md:text-2xl" id="country">${each['country']}</p>
                `;

                const lat = each['lat'];
                const lon = each['lon'];

                fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${KEY}`)
                .then(res => res.json())
                .then (data => {
                    let weather = data['weather'][0];
                    let weather_main = data['main'];

                    img_w.setAttribute("src", `https://openweathermap.org/img/wn/${weather['icon']}@2x.png`);

                    location_data.innerHTML = ""
                    location_data.innerHTML =
                    `
                    <div class="w-full h-fit flex">
                        <p class="text-lg md:text-2xl font-bold text-oxford_blue mr-2">${weather['main']}:</p>
                        <p class="text-lg md:text-2xl text-oxford_blue mb-1">${weather['description']}</p>
                    </div>
                    <div class="w-full h-fit flex">
                        <p class="text-lg md:text-2xl  font-bold text-oxford_blue mr-3">Temp: </p>
                        <p class="text-lg md:text-2xl text-oxford_blue">${(weather_main['temp'] - 273.15).toFixed(2)} C</p>
                        <p class="text-lg md:text-2xl  font-bold text-oxford_blue mr-3">Temp: </p>
                        <p class="text-lg md:text-2xl text-oxford_blue">${(weather_main['temp'] - 273.15).toFixed(2)} C</p>
                    </div>
                    
                    
                    `;

                    location_data2.innerHTML = ""
                    location_data2.innerHTML =
                    `
                    <div class="w-full h-fit flex">
                        <p class="text-lg md:text-2xl font-bold text-oxford_blue mr-3">Feels Like : </p>
                        <p class="text-lg md:text-2xl  text-oxford_blue">${(weather_main['feels_like'] - 273.15).toFixed(2)} C</p>
                    </div>
                    <div class="w-full h-fit flex">
                        <p class="text-lg md:text-2xl font-bold text-oxford_blue mr-3">Pressure : </p>
                        <p class="text-lg md:text-2xl text-oxford_blue">${weather_main['pressure']} hPa</p>
                    </div>
                    <div class="w-full h-fit flex">
                        <p class="text-lg md:text-2xl  font-bold text-oxford_blue mr-3">Humidity : </p>
                        <p class="text-lg md:text-2xl text-oxford_blue">${weather_main['humidity']}%</p>
                    </div>
                    `
                    
                })

                // Weather forecast for each location on the list
                fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&cnt=4&appid=${KEY}`)
                .then(res => res.json())
                .then (data => {
                    forecast.innerHTML = "";

                    let list_in = data['list'];
                    for (let each in list_in) {
                        let list_value = list_in[each];
                        let f_weather = list_value['weather'][0];
                        let dt = list_value['dt'];
                        const f_temp = list_value['main']['temp']

                        const date = new Date(dt * 1000);
                        const dayOfWeek = days[date.getDay()];
                        const time = date.toLocaleTimeString().slice(0, -6);
                        const am_pm = date.toLocaleTimeString().slice(-2);
                        let new_div = document.createElement('div');
                        new_div.innerHTML =
                        `
                        <div class="w-52 md:w-48 h-full p-4 mr-4 md:mr-0 bg-white bg-opacity-50 flex flex-col items-center justify-between rounded-lg">
                            <p class="p-2 px-4 bg-black bg-opacity-50 rounded-lg text-white text-lg">${dayOfWeek}</p>
                            <img src="https://openweathermap.org/img/wn/${f_weather['icon']}@2x.png" alt="weather_icon">
                            <div class="flex flex-col items-center justify-between">
                                <p class="mb-2">${f_weather['description']}</p>
                                <p>${time} ${am_pm} - ${(f_temp - 273.15).toFixed(2)} C</p>
                            </div>
                        </div>
                        `
                        forecast.appendChild(new_div)
                    }
                })
            });
        }
        count = 0

    })
});
