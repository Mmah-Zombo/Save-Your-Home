import keys from "./keys.js";
const API = keys['API'];
const KEY = keys['KEY'];

const form = document.getElementById("myForm");
const form2 = document.getElementById("myForm2");
const body = document.getElementById("body");
const entry = document.getElementById("entry");
const main = document.getElementById("main");
const display = document.getElementById("options");
const location_info = document.getElementById("location");
const img_w = document.getElementById("img_w");
const location_data = document.getElementById("location-data");
const location_data2 = document.getElementById("location_data2");
let area;

form.addEventListener("submit", (event) => {
    event.preventDefault();
    // body.setAttribute("style", "background-image: url('../assets/img/trees.jpg')");
    let count = 0;
    entry.classList.add("hidden");
    entry.classList.remove("relative");

    main.classList.remove("hidden");
    main.classList.add("relative");

    area = form.place.value;
    fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${area}&limit=7&appid=${API}`)
    .then(res => res.json())
    .then(data => {
        console.log(data);
        for (let each of data){
            const divElement = document.createElement('div');
            divElement.className = 'w-full h-1/5 flex items-center border-b border-green-200 bg-opacity-40';

            divElement.innerHTML = 
            `
            <p class="text-4xl pr-8" id="place">${each['name']}</p>
            <p class="text-2xl pr-8" id="state">${each['state']}</p>
            <p class="text-2xl pr-8" id="country">${each['country']}</p>
            `;
            display.appendChild(divElement);
            if (count === 0) {
                location_info.innerHTML = ""
                location_info.innerHTML =
                `
                <p class="text-4xl" id="place">${each['name']}</p>
                <p class="text-2xl" id="state">${each['state']}</p>
                <p class="text-2xl" id="country">${each['country']}</p>
                `

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
                        <p class="text-2xl font-bold text-oxford_blue mr-2">${weather['main']}:</p>
                        <p class="text-2xl font-bold text-oxford_blue">${weather['description']}</p>
                    </div>
                    <div class="w-full h-fit flex">
                        <p class="text-2xl font-bold text-oxford_blue mr-3">Temperature: </p>
                        <p class="text-2xl font-bold text-oxford_blue">${(weather_main['temp'] - 273.15).toFixed(2)} C</p>
                    </div>
                    
                    `;

                    location_data2.innerHTML = ""
                    location_data2.innerHTML =
                    `
                    <div class="w-full h-fit flex">
                        <p class="text-2xl font-bold text-oxford_blue mr-3">Feels Like : </p>
                        <p class="text-2xl font-bold text-oxford_blue">${(weather_main['feels_like'] - 273.15).toFixed(2)} C</p>
                    </div>
                    <div class="w-full h-fit flex">
                        <p class="text-2xl font-bold text-oxford_blue mr-3">Pressure : </p>
                        <p class="text-2xl font-bold text-oxford_blue">${weather_main['pressure']} hPa</p>
                    </div>
                    <div class="w-full h-fit flex">
                        <p class="text-2xl font-bold text-oxford_blue mr-3">Humidity : </p>
                        <p class="text-2xl font-bold text-oxford_blue">${weather_main['humidity']}%</p>
                    </div>
                    `
                })
            };
            count += 1;

            divElement.addEventListener("click", (event) => {
                location_info.innerHTML = ""
                location_info.innerHTML =
                `
                <p class="text-4xl" id="place">${each['name']}</p>
                <p class="text-2xl" id="state">${each['state']}</p>
                <p class="text-2xl" id="country">${each['country']}</p>
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
                        <p class="text-2xl font-bold text-oxford_blue mr-2">${weather['main']}:</p>
                        <p class="text-2xl font-bold text-oxford_blue">${weather['description']}</p>
                    </div>
                    <div class="w-full h-fit flex">
                        <p class="text-2xl font-bold text-oxford_blue mr-3">Temperature: </p>
                        <p class="text-2xl font-bold text-oxford_blue">${(weather_main['temp'] - 273.15).toFixed(2)} C</p>
                    </div>
                    <div class="w-full h-fit flex">
                        <p class="text-2xl font-bold text-oxford_blue mr-3">Humidity : </p>
                        <p class="text-2xl font-bold text-oxford_blue">${weather_main['humidity']}%</p>
                    </div>
                    `;

                    location_data2.innerHTML = ""
                    location_data2.innerHTML =
                    `
                    <div class="w-full h-fit flex">
                        <p class="text-2xl font-bold text-oxford_blue mr-3">Feels Like : </p>
                        <p class="text-2xl font-bold text-oxford_blue">${(weather_main['feels_like'] - 273.15).toFixed(2)} C</p>
                    </div>
                    <div class="w-full h-fit flex">
                        <p class="text-2xl font-bold text-oxford_blue mr-3">Pressure : </p>
                        <p class="text-2xl font-bold text-oxford_blue">${weather_main['pressure']} hPa</p>
                    </div>
                    <div class="w-full h-fit flex">
                        <p class="text-2xl font-bold text-oxford_blue mr-3">Sea Level : </p>
                        <p class="text-2xl font-bold text-oxford_blue">${weather_main['sea_level']} hPa</p>
                    </div>
                    `
                    console.log(data['weather'], data['main'])
                    console.log(typeof(data['main']))
                })
            });
            
        };
        count = 0;
        
    });
});

form2.addEventListener("submit", (event) => {
    event.preventDefault();
    let count = 0
    area = form2.place2.value
    display.innerHTML = "" 

    fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${area}&limit=7&appid=${API}`)
    .then(res => res.json())
    .then(data => {
        console.log(data);
        for (let each of data){
            const divElement = document.createElement('div');
            divElement.className = 'w-full h-1/5 flex items-center border-b border-white hover:cursor-pointer';

            divElement.innerHTML = 
            `
            <p class="text-4xl pr-8" id="place">${each['name']}</p>
            <p class="text-2xl pr-8" id="state">${each['state']}</p>
            <p class="text-2xl pr-8" id="country">${each['country']}</p>
            `
            display.appendChild(divElement)
            if (count === 0) {
                location_info.innerHTML = ""
                location_info.innerHTML =
                `
                <p class="text-4xl" id="place">${each['name']}</p>
                <p class="text-2xl" id="state">${each['state']}</p>
                <p class="text-2xl" id="country">${each['country']}</p>
                `
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
                        <p class="text-2xl font-bold text-oxford_blue mr-2">${weather['main']}:</p>
                        <p class="text-2xl font-bold text-oxford_blue">${weather['description']}</p>
                    </div>
                    <div class="w-full h-fit flex">
                        <p class="text-2xl font-bold text-oxford_blue mr-3">Temperature: </p>
                        <p class="text-2xl font-bold text-oxford_blue">${(weather_main['temp'] - 273.15).toFixed(2)} C</p>
                    </div>
                    <div class="w-full h-fit flex">
                        <p class="text-2xl font-bold text-oxford_blue mr-3">Humidity : </p>
                        <p class="text-2xl font-bold text-oxford_blue">${weather_main['humidity']}%</p>
                    </div>
                    `;

                    location_data2.innerHTML = ""
                    location_data2.innerHTML =
                    `
                    <div class="w-full h-fit flex">
                        <p class="text-2xl font-bold text-oxford_blue mr-3">Feels Like : </p>
                        <p class="text-2xl font-bold text-oxford_blue">${(weather_main['feels_like'] - 273.15).toFixed(2)} C</p>
                    </div>
                    <div class="w-full h-fit flex">
                        <p class="text-2xl font-bold text-oxford_blue mr-3">Pressure : </p>
                        <p class="text-2xl font-bold text-oxford_blue">${weather_main['pressure']} hPa</p>
                    </div>
                    <div class="w-full h-fit flex">
                        <p class="text-2xl font-bold text-oxford_blue mr-3">Sea Level : </p>
                        <p class="text-2xl font-bold text-oxford_blue">${weather_main['sea_level']} hPa</p>
                    </div>
                    `
                })
            };
            count += 1;

            divElement.addEventListener("click", () => {
                location_info.innerHTML = "";
                location_info.innerHTML =
                `
                <p class="text-4xl" id="place">${each['name']}</p>
                <p class="text-2xl" id="state">${each['state']}</p>
                <p class="text-2xl" id="country">${each['country']}</p>
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
                        <p class="text-2xl font-bold text-oxford_blue mr-2">${weather['main']}:</p>
                        <p class="text-2xl font-bold text-oxford_blue">${weather['description']}</p>
                    </div>
                    <div class="w-full h-fit flex">
                        <p class="text-2xl font-bold text-oxford_blue mr-3">Temperature: </p>
                        <p class="text-2xl font-bold text-oxford_blue">${(weather_main['temp'] - 273.15).toFixed(2)} C</p>
                    </div>
                    <div class="w-full h-fit flex">
                        <p class="text-2xl font-bold text-oxford_blue mr-3">Humidity : </p>
                        <p class="text-2xl font-bold text-oxford_blue">${weather_main['humidity']}%</p>
                    </div>
                    `;

                    location_data2.innerHTML = ""
                    location_data2.innerHTML =
                    `
                    <div class="w-full h-fit flex">
                        <p class="text-2xl font-bold text-oxford_blue mr-3">Feels Like : </p>
                        <p class="text-2xl font-bold text-oxford_blue">${(weather_main['feels_like'] - 273.15).toFixed(2)} C</p>
                    </div>
                    <div class="w-full h-fit flex">
                        <p class="text-2xl font-bold text-oxford_blue mr-3">Pressure : </p>
                        <p class="text-2xl font-bold text-oxford_blue">${weather_main['pressure']} hPa</p>
                    </div>
                    <div class="w-full h-fit flex">
                        <p class="text-2xl font-bold text-oxford_blue mr-3">Sea Level : </p>
                        <p class="text-2xl font-bold text-oxford_blue">${weather_main['sea_level']} hPa</p>
                    </div>
                    `
                    console.log(data['weather'], data['main'])
                    console.log(typeof(data['main']))
                })
            });
        }
        count = 0

        // fetch(`https://api.openweathermap.org/data/3.0/onecall?lat={lat}&lon={lon}&appid=${API}`)
        // .then(response => response.json())
    })
});

// if (form2.place2.value) {
//     area = form2.place2.value
//     fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${area}&limit=5&appid=${API}`)
//     .then(res => res.json())
//     .then(data => {
//         console.log(data + "hi")
//         console.log('in here')

//     })
//     // fetch(`https://api.openweathermap.org/data/3.0/onecall?lat={lat}&lon={lon}&appid=${API}`)
//     // .then(response => response.json())
// }
// else if (form.place.value) {
//     // area = form.place.value

//     // fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${area}&limit=5&appid=${API}`)
//     // .then(res => res.json())
    
//     //  fetch(`https://api.openweathermap.org/data/3.0/onecall?lat={lat}&lon={lon}&appid=${API}`)
//     // .then(response => response.json())
// }
