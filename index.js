const select = document.querySelector('#city-name');
const btn = document.querySelector('.container__button');
const outputCity = document.querySelector('.container__city-name');
const degrees = document.querySelector('.container__degrees');
const condition = document.querySelector('.container__condition-weather')
const img = document.querySelector('.img');
const imgSearch = document.querySelector('.container__img-search');
const citySearch = document.querySelector('.container__city-search');
const cityChoice = document.querySelector('.container__city-choice');


let cityId = 524901;
weatherFetch(cityId);

async function weatherFetch(id) {
    const url = `https://api.openweathermap.org/data/2.5/weather?id=${id}&appid=e2c12abd7b2bb8d0875f2aa65538e020`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        outputCity.textContent = data.name;
        degrees.innerHTML = `${Math.round(data.main.temp - 273)} &deg`;
        condition.textContent = data.weather[0]['description'];
        img.innerHTML = `<img src="https://openweathermap.org/img/wn/${data.weather[0]['icon']}@2x.png" ></img>`

    } catch (error) {
        console.log(error);
    }
};

function getCheckElement (cityName) {
    cityList.forEach(el => {
        if (el.name.toLowerCase() === cityName.toLowerCase()) {
            cityId = el.id;
        }
    });

    weatherFetch(cityId);
}

btn.addEventListener('click', () => {
    
    let cityName = select.value;

    getCheckElement(cityName);
});

imgSearch.addEventListener('click', () => {
    cityChoice.style.display = "none";
    citySearch.style.display = "block";
    citySearch.focus();
    citySearch.onkeyup = (event) => {

        if (event.keyCode === 13) {
            let cityName = citySearch.value;

            getCheckElement(cityName)

            citySearch.style.display = "none";
            cityChoice.style.display = "block";
            citySearch.value = '';
            cityChoice.value = cityName.charAt(0).toUpperCase() + cityName.slice(1)
            console.log(select.value)
        };
    };
});