const weather = document.querySelector(".js-weather");
const API_KEY = "1e75698d9be6393ad3a2d138e8483d67";
const COORDS = "coords";

function getWeather(lat,lng){
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric`
    ).then(function(response){
      return response.json();
    }).then(function(json){
        const temp = json.main.temp;
        const place = json.name;
        weather.innerText = `${temp} @ ${place}`;
    });
    //fetch는 api를 불러오는 함수로 인수를 써서 나타내고 APIid로 api정보를 request한다.
}//getWeather에 parsedCoords.latitude,parsedCoords.longitude를 넣어서 날씨정보를 알수있다


function saveCoords(coordsObj){
    localStorage.setItem(COORDS,JSON.stringify(coordsObj));//좌표값이 객체이므로 문자열화함.
}

function handleGeoSuccess(position){
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const coordsObj = {
        latitude,
        longitude//콜론 사이로 값이 같으면 콜론을 삭제하고 그단어만 쓰면됨
    };//coords에대한 좌표를 객체로 써줌
    saveCoords(coordsObj);
    getWeather(latitude,longitude);
}

function handleGeoError(){
    console.log("Can't access geo location")
}

function askForCoords(){
    navigator.geolocation.getCurrentPosition(handleGeoSuccess,handleGeoError);
    //navigator은 사용자의 상태나 신원정보를 나타내며 
    //해당 정보를 질문할떄와 특정활동을 등록할떄
    //navigator.geolocation는 웹에서 장치의 위치를 알아낼 때 사용할 수 있는 Geolocation 객체를 반환
    //Geolocation.getCurrentPosition() 메서드는 장치의 현재 위치를 가져옵니다
    //getCurrentPosition은 success와 error가 있다 
}

function loadCoords(){
    const loadCoords = localStorage.getItem(COORDS);
    if(loadCoords === null )
    {
        askForCoords();
    }
    else
    {
        const parsedCoords = JSON.parse(loadCoords);//
        getWeather(parsedCoords.latitude,parsedCoords.longitude);
    }
}
function init(){
    loadCoords();
}
init();