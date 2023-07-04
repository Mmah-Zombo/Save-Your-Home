// const countryList = require('country-list');
//  console.log(countryList)
const form = document.getElementById("myForm");
const form2 = document.getElementById("myForm2");
const body = document.getElementById("body");
const entry = document.getElementById("entry");
const main = document.getElementById("main");
const display = document.getElementById("options");

let area;

form.addEventListener("submit", (event) => {
    event.preventDefault();
    body.setAttribute("style", "background-image: url('../assets/img/trees.jpg')");

    entry.classList.add("hidden");
    entry.classList.remove("relative");

    main.classList.remove("hidden");
    main.classList.add("relative");

    area = form.place.value;
    fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${area}&limit=5&appid=${API}`)
    .then(res => res.json())
    .then(data => {
        console.log(data);
        // for (let each of data){
        //     const divElement = document.createElement('div');
        //     divElement.className = 'w-full h-1/5 flex items-center border-b border-white';

        //     divElement.innerHTML = 
        //     `
        //     <p class="text-4xl pr-8" id="place">${each['name']}</p>
        //     <p class="text-2xl pr-8" id="state">${each['state']}</p>
        //     <p class="text-2xl pr-8" id="country">${each['country']}</p>
        //     `
        //     display.appendChild(divElement)

        //     each.addEventListener("click", (event) => {
        //         // 
        //     })
        // }
    })
});
     
form2.addEventListener("submit", (event) => {
    event.preventDefault();
    area = form2.place2.value
    display.innerHTML = "" 

    fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${area}&limit=5&appid=${API}`)
    .then(res => res.json())
    .then(data => {
        console.log(data);
        for (let each of data){
            const divElement = document.createElement('div');
            divElement.className = 'w-full h-1/5 flex items-center border-b border-white';

            divElement.innerHTML = 
            `
            <p class="text-4xl pr-8" id="place">${each['name']}</p>
            <p class="text-2xl pr-8" id="state">${each['state']}</p>
            <p class="text-2xl pr-8" id="country">${each['country']}</p>
            `
            display.appendChild(divElement)

            console.log('done')
        }
        // showWeatherData(data);
    })

});
     