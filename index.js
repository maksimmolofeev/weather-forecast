const select = document.querySelector('#city-name');
const btn = document.querySelector('.container__button');
const outputCity = document.querySelector('.container__city-name');
const degrees = document.querySelector('.container__degrees');
const condition = document.querySelector('.container__condition-weather')
const img = document.querySelector('.img')

let cityId = 524901;
weatherFetch(cityId);

const cityList = [
    {
        name: 'Moscow',
        id: 524901
    },

    {
        name: 'Side',
        id: 301238
    },

    {
        name: 'Penza',
        id: 519560
    }
];

//https://openweathermap.org/img/wn/04d@2x.png

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

select.addEventListener('click', () => {})

btn.addEventListener('click', () => {
    
    let cityName = select.value;
    cityList.forEach(el => {
        if (el.name === cityName) {
            cityId = el.id;
        }
    });

    weatherFetch(cityId);
});