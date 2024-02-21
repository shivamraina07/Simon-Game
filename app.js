let gameSeq = [];
let userSeq = [];
let started = false;
let level = 0;
let highScore=0;
//array of all div
let btns = ["pink", "green", "yellow", "blue"];
let h3 = document.querySelector("h3");
let body = document.querySelector("body");
let h2 = document.querySelector("h2");

//starting phase of the game by pressing the key
body.addEventListener("keypress", function event() {
    if (started == false) {
        console.log("Game started");
        started = true;
    }
    levelup();  //callback to level up fn

});

// adding and removing the flash class to flash the div
function btnflash(btn) {
    btn.classList.add("flash");
    setTimeout(() => {
        btn.classList.remove("flash");
    }, 250);
}

//user flash function to flash div by clicking
function userflash(btn) {
    btn.classList.add("flash");
    setTimeout(() => {
        btn.classList.remove("flash");
    }, 250);
}

//Choose random div to flash by math function
function levelup() {
    userSeq = [];//when level up empty the userSeq
    level++;

    h3.innerText = `Level ${level}`;
    let randIdx = Math.floor(Math.random() * 4);
    let randColor = btns[randIdx];
    let randbtn = document.querySelector(`.${randColor}`);
    gameSeq.push(randColor);//push flash color into the the game seq
    console.log(gameSeq);
    btnflash(randbtn);// passing the flash color as parameter to the btn flash function
}

// check whether userSeq equal to GameSeq
function checkAns(idx) {
    //check the idx of user and game seq and also the length of both seq
    if (userSeq[idx] == gameSeq[idx]) {
        if (userSeq.length == gameSeq.length) {
            setTimeout(levelup, 1000);//timeout for the next flashed button
        }
    } else {
        h3.innerHTML = `Game over! Your score was <b> ${level}</b></br>press any key to start the game`;
        //showing the red bg-color when the game is over
        body.style.backgroundColor="red";
        setTimeout(()=>{
            body.style.backgroundColor="white";
        },150);
        //To print the High score achieved by the player
        if(level>highScore){
            highScore=level;
        }
        h2.innerText=`High Score is ${highScore}`;
        reset();
    };
}

//btn press function
function btnpress() {
    // let btn=this is same as working with this
    userflash(this);//passing this as the parameter, where this is the button pressed by the user
    
    let userbtn = this.getAttribute("id");//this as the pressed button
    userSeq.push(userbtn);
    console.log(userSeq);
    checkAns(userSeq.length - 1)
}

//add btn press function to the div
let allbtn = document.querySelectorAll(".btn");

//accessing all the single button to apply the event listener
for (btn of allbtn) {
    btn.addEventListener("click", btnpress)
}

// reset function to restart the game
function reset() {
    gameSeq = [];
    userSeq = [];
    started = false;
    level = 0;
}