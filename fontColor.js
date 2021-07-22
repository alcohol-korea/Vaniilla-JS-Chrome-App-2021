const colorContainer = document.querySelector(".js-colorContainer"),
colorForm = document.querySelector(".js-colorForm"),
colorInput = colorForm.querySelector("input"),
clockContainer = document.querySelector(".js-clock"),
clockColor = clockContainer.querySelector("h1"),
greetingColor = document.querySelector(".js-greeting"),
weatherColor = document.querySelector(".js-weather");

const USER_COLOR = "userColor"

function saveColor(text){
    localStorage.setItem(USER_COLOR,text);
}

function paintColor(color){
    clockColor.style.color = color;
    greetingColor.style.color = color;
    weatherColor.style.color = color;
}

function colorChange(event){
    console.log(event);
    event.preventDefault();
    const uservalue = event.target.value;
    paintColor(uservalue);
    saveColor(uservalue);
}

function loadedColor(){
    const loadedColor = localStorage.getItem(USER_COLOR);
    paintColor(loadedColor);
}

function init(){
    loadedColor();
    colorInput.addEventListener("input",colorChange);
}
init();