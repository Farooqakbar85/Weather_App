const submitBtn = document.getElementById("submitBtn");
const cityName = document.getElementById("cityName");
const city_name = document.getElementById('city_name');
const temp =document.getElementById('temp');
const temp_status = document.getElementById('temp_status');

const datahide = document.querySelector(".middle_layer");

const getinfo = async(event) => {
    event.preventDefault();
    let cityVal = cityName.value;
    if(cityVal === ""){
        city_name.innerText ='Please write the name before You search'; 
        datahide.classList.add('data_hide');

    }else{
       try{
        let url = `http://api.openweathermap.org/data/2.5/weather?q=${cityVal}&units=metric&appid=acb537cc9398b39b3e5ffb782ab6549b`
        const response = await fetch(url)
        const data = await response.json();
        const arrData = [data];
        temp.innerText = arrData[0].main.temp;
        temp_status.innerText = arrData[0].weather[0].main;
        city_name.innerText = `${arrData[0].name} , ${arrData[0].sys.country}`;
        const tempMod = arrData[0].weather[0].main;
        // conditions to check sunny or cloudy
        if(tempMod == "Clear"){
            temp_status.innerHTML = "<i class='fa fa-sun' style = 'color: #eccc68'></i>";
        }else if(tempMod == "clouds"){
            temp_status.innerHTML = "<i class='fa fa-clouds' style = 'color: #f1f2f6'></i>";
        }else if(tempMod == "Rain"){
            temp_status.innerHTML = "<i class='fa fa-clouds' style = 'color: #a4b0be'></i>";
        }else{
            temp_status.innerHTML = "<i class='fa fa-sun' style = 'color: #eccc68'></i>";
        }

        datahide.classList.remove('data_hide');
       }
       catch{
        city_name.innerText = 'Please enter the valid city name'
        datahide.classList.add('data_hide');
       }
    }
}
submitBtn.addEventListener("click", getinfo)