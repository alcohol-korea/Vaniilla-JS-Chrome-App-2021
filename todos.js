const toDoForm = document.querySelector(".js-toDoForm"),
toDoInput = toDoForm.querySelector("input"),
pendingList = document.querySelector(".js-pendingList"),
finishedList = document.querySelector(".js-finishedList");

const PENDING ="PENDING";
const FINISHED ="FINISHED";

// ul이 두개이므로 무조건 배열도 두개여야함 아니면 finishedList로 갈때 배열에 자료 사라짐
let pending = [];
let finished =[];

/* save part */

function saveToDos(){
    localStorage.setItem(PENDING,JSON.stringify(pending));
    localStorage.setItem(FINISHED,JSON.stringify(finished));
}

/* Finished part */

function backToPending(event){
    const btn = event.target;
    const li = btn.parentNode;
    const text = li.children[0].innerText;
    finishedList.removeChild(li); 
    paintPending(text); 
    const cleanToDos = finished.filter(function(toDo){
        return toDo.id !== parseInt(li.id);
    });
    finished = cleanToDos; 
    saveToDos();
}

function deleteFinished(event){
    const btn = event.target;
    const li = btn.parentNode;
    finishedList.removeChild(li);
    const cleanToDos = finished.filter(function(toDo){
        return toDo.id !== parseInt(li.id);
    });
    finished = cleanToDos; 
    saveToDos();
}

function paintFinished(text){
    const li = document.createElement("li");
    const delBtn = document.createElement("button");//delBtn을 클릭할때 이벤트 발생
    delBtn.addEventListener("click",deleteFinished);
    delBtn.innerText = "❌";
    const backBtn = document.createElement("button");//checkBtn을 클릭할때 이벤트 발생
    backBtn,addEventListener("click",backToPending);
    backBtn.innerText = "⬅️";
    const span = document.createElement("span");
    span.innerText = text;
    li.appendChild(span);
    li.appendChild(delBtn);
    li.appendChild(backBtn);
    finishedList.appendChild(li);
    const newId = finished.length+1;
    li.id = newId;
    const finishedObj = {
        text:text,
        id: newId
    };
    finished.push(finishedObj);
    saveToDos();
}

/* Pendig part*/

function chageToFinished(event){
    const btn = event.target;
    const li = btn.parentNode;
    const text = li.children[0].innerText;// text만 옮기는 이유는 li를 다옮겼을때 
    //그 li의 cheeckBtn을 없애고 가지고온 리스트의 dleltBtn의 이벤트를 추가할떄
    //dlebtn은 paintPending한 에서만 되는 버튼이므로 따로 지정해서 하기 어렵다
    //그래서 글자만 옮기는것이 현명하다
    pendingList.removeChild(li); //여기서 없어지고 finishedList에 이동된다
    paintFinished(text); 
    const cleanToDos = pending.filter(function(toDo){
        return toDo.id !== parseInt(li.id);
    });
    pending = cleanToDos; 
    saveToDos();
}

/*delBtn을 클릭했을때 실행되는 함수로 이때 toDo는 클릭된 객체-리스트이다
이때 li는 저장되어있는 문자열-리스트이다 그러므로 우리가 delBtn을 누르면
저장된 문자열-list의 객체형태의 id와 객체-list의 id가 같지 않는것만 
걸러내서 다시 저장하는것이 delBtn의 목적이다*/
function deletePending(event){
    const btn = event.target;
    const li = btn.parentNode;
    pendingList.removeChild(li);
    //위세줄만 한다면 저장함수를 실행하여도 클릭했을때만 지워지고 새로고침하면 
    //refresh되어서 지워지지가 않는다.
    const cleanToDos = pending.filter(function(toDo){
       return toDo.id !== parseInt(li.id);//parseInt를 해주어야 객체가되어서 비교할수있다
    });//filter함수는 안에있는 함수가 참인것만 반환하고 거짓은 버린다.
    pending = cleanToDos; //둘다 const이기에 재선언과 재할당이 안된다
    // 이식은 7=6과 같다고 우리가 말하는것과 같다 따라서 배열을 let으로 바꾸어주어야 한다.
    saveToDos();
}

//pendingList 에 나오도록 list 만듬 - list들 정보를 배열에 넣어서 저장
function paintPending(text){
    const li = document.createElement("li");
    const delBtn = document.createElement("button");//delBtn을 클릭할때 이벤트 발생
    delBtn.addEventListener("click",deletePending);
    delBtn.innerText = "❌";
    const checkBtn = document.createElement("button");//checkBtn을 클릭할때 이벤트 발생
    checkBtn.addEventListener("click",chageToFinished);
    checkBtn.innerText = "✅";
    const span = document.createElement("span");
    span.innerText = text;
    li.appendChild(span);
    li.appendChild(delBtn);
    li.appendChild(checkBtn);
    pendingList.appendChild(li);
    const newId = pending.length+1;
    li.id = newId;
    const pendingObj = {
        text:text,
        id: newId
    };
    pending.push(pendingObj);
    saveToDos();
}

/* load part */

function loadToDo(){
    //저장되어있는 자료를 불러서 다시 브라우저에 띄우는 역할임
    //문자열 저장을 객체로 바꿔서 그것의 text만 브라우저에 띄움
    const pedningToDo = localStorage.getItem(PENDING);
    if(pedningToDo !== null ){
        const parsedPending = JSON.parse(pedningToDo);
        parsedPending.forEach(function(toDo){
            paintPending(toDo.text);
        });
    }
    const finishedToDo = localStorage.getItem(FINISHED);
    if(finishedToDo !== null ){
        const parsedFinished = JSON.parse(finishedToDo);
        parsedFinished.forEach(function(toDo){
            paintFinished(toDo.text);
        });
    }

}
//handleSubmit실행 입력값받아서 paintpending실행 그리고 다시 입력란 빈칸
function handleSubmit(event){
    event.preventDefault();
    const currentValue= toDoInput.value;
    paintPending(currentValue);
    toDoInput.value="";
}
//초기화 함수 toDoForm에서  제출되는 이벤트가 되도록함
//loadToDo를 해서 저장되어있는 자료들을 불러와서 브라우저에 있도록 함
function init(){
    loadToDo();
    toDoForm.addEventListener("submit",handleSubmit);
}
init();