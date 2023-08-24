const temperature = document.querySelector(".weather1");
const cityField = document.querySelector(".weather2 p");
const dateField = document.querySelector(".weather2 span");
const iconField = document.querySelector(".weather3 img");
const weatherCondition = document.querySelector(".weather3 span");
const searchField = document.querySelector(".searchField");
const form = document.querySelector("form");


let target = "shimla"
const fetchData = async (target) => {

    const url = `https://api.weatherapi.com/v1/current.json?key=655e0a7d91cb41fbaeb184427232208&q=${target}`;

    const response = await fetch(url);
    const data = await response.json();
    console.log(data);

    const { current: { temp_c,
        condition: { icon, text }
    },
        location: { name, localtime },


    } = data

    updateDom(temp_c, name, icon, text, localtime);
}


function updateDom(temp, city, icon, condition, time) {
    temperature.innerText = temp + "°C";
    cityField.innerText = city;
    iconField.src = icon;
    weatherCondition.innerText = condition;

    const exactDate = time.split(" ")[0];
    const exactTime = time.split(" ")[1];
    // console.log(exactDate);
    // console.log(exactTime);

    const exactDay = new Date(exactDate).getDay();
    // console.log(exactDay);
    dateField.innerText = `${exactTime} - ${getFullDay(exactDay)}  ${exactDate}`;
    




}
fetchData(target);



function getFullDay(num) {
    switch (num) {
        case 0:
            return "Sunday"
        case 1:
            return "Monday"
        case 2:
            return "Tuesday"
        case 3:
            return "Wednesday"
        case 4:
            return "Thursday"
        case 5:
            return "Friday"
        case 6:
            return "Saturday"

        default:
            return "Don't know"
    }
}


const search = (e)=>{
     e.preventDefault();

     target = searchField.value;
     console.log(target);
     fetchData(target);
}
form.addEventListener("submit", search);