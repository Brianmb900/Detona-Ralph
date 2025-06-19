const state ={
    view:{
        squares: document.querySelectorAll(".square"),
        enemmy: document.querySelector(".enemy"),
        timeLeft: document.querySelector("#time-left"),
        score: document.querySelector("#score"),
        life: document.querySelector("#life"),
    },
    values:{
        gameVelocity: 1000,
        hitPosition: 0,
        lasHitPosition: null,
        result: 0,
        currentTime: 60,
        lifePoints: 3,
    },
    actions:{
        timerId: setInterval(randomSquare, 1000),
        countDownTimerId: setInterval(countDown, 1000),
    },
};

function countDown(){
    state.values.currentTime--;
    state.view.timeLeft.textContent = state.values.currentTime;

    if(state.values.currentTime <= 0){
        setTimeout(() => {
        gameOver();
        }, 10);
    }
}

function gameOver(){
    clearInterval(state.actions.countDownTimerId)
    clearInterval(state.actions.timerId)
    alert("Game Over! A sua pontuação foi: " + state.values.result);
    location.reload();
}

function playSound(audioName){
    let audio = new Audio(`./src/audios/${audioName}.m4a`)
    audio.volume = 0.2;
    audio.play();
}

function randomSquare(){
    state.view.squares.forEach((square) => {
        square.classList.remove("enemy");
    });

    let randomNumber
    do{
        randomNumber = Math.floor(Math.random() * 9);
    }while(randomNumber === state.values.lasHitPosition)

    let randomSquare = state.view.squares[randomNumber];
    randomSquare.classList.add("enemy");

    state.values.hitPosition = randomSquare.id;
    state.values.lasHitPosition = randomNumber;
}

function addListenerHitBox(){
    state.view.squares.forEach((square)=>{
        square.addEventListener("mousedown", () =>{
            if(square.id === state.values.hitPosition){
                state.values.result++;
                state.view.score.textContent = state.values.result;
                state.values.hitPosition = null;
                clearInterval(state.actions.timerId)
                randomSquare();
                state.actions.timerId = setInterval(randomSquare, 1000);
                playSound("hit");
            }else{
                state.values.lifePoints--;
                state.view.life.textContent = "x"+state.values.lifePoints;
            }
            if(state.values.lifePoints <= 0){
                setTimeout(() => {
                gameOver();
                }, 10);
            }
        })
    })
}

function initialize(){
    randomSquare();
    addListenerHitBox();
}

initialize();
