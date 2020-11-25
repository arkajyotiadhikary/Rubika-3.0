var cube = document.querySelector("#cube");
var ring = document.querySelector("#clock");
var button = document.querySelector("button");
var notationR = ["R", "R'", "R2"],
    notationL = ["L", "L'", "L2"],
    notationU = ["U", "U'", "U2"],
    notationD = ["D", "D'", "D2"],
    notationF = ["F", "F'", "F2"],
    notationB = ["B", "B'", "B2"];
var scramble = "Scramble: "
var cubeTop = false;
var bigSize = true;
var paddingTop = 0;
var paddingBottom = 5;
var size = 300;
var n = 0, m = 0;
var running = false;

let ms = 0;
let seconds = 0;
let minutes = 0;

let displayms = 0;
let displayseconds = 0;
let displayminutes = 0;

let interval = null;
let stopped = true;

setInterval(function(){
    if(!cubeTop){
        cube.style.cssText = `padding-top : ${paddingTop += 0.05}%; padding-bottom: ${paddingBottom -= 0.05}%`;

        n++;
        if(n === 100) {
            cubeTop = !cubeTop;
        }
    }else{
        cube.style.cssText = `padding-top : ${paddingTop -= 0.05}%; padding-bottom: ${paddingBottom += 0.05}%`;

        n--;
        if(n === 0) {
            cubeTop = !cubeTop;
        }
    }
}, 10);

setInterval(function(){
    if(bigSize){
        ring.style.cssText = `background-size: ${size -= 0.2}px`;

        m++;
        if(m === 100) {
            bigSize = !bigSize;
        }
    }else{
        ring.style.cssText = `background-size: ${size += 0.2}px`;

        m--;
        if(m === 0) {
            bigSize = !bigSize;
        }
    }
}, 10);

function randomNotation(arr){
    return arr[Math.floor(Math.random()*arr.length)];
}

function randomScramble(){
    for(var i=0; i<3; i++){
        scramble += (randomNotation(notationR)+" ");
        scramble += (randomNotation(notationL)+" ");
        scramble += (randomNotation(notationF)+" ");
        scramble += (randomNotation(notationU)+" ");
        scramble += (randomNotation(notationD)+" ");
        scramble += (randomNotation(notationB)+" ");
    }
    document.querySelector("#scramble").textContent = scramble;
    scramble = "Scramble: ";
}

randomScramble();

button.addEventListener("click", randomScramble);

function stopWatch(){

    ms++;

    //Logic to determine when to increment next value
    if(ms / 100 === 1){
        ms = 0;
        seconds++;

        if(seconds / 60 === 1){
            seconds = 0;
            minutes++;
        }

            if(minutes / 60 === 1){
                minutes = 0;
                stopWatch();
            }

    }

    //If ms/seconds/minutes are only one digit, add a leading 0 to the value
    if(ms < 10){
        displayms = "0" + ms.toString();
    }
    else{
        displayms = ms;
    }

    if(seconds < 10){
        displayseconds = "0" + seconds.toString();
    }
    else{
        displayseconds = seconds;
    }

    if(minutes < 10){
        displayminutes = "0" + minutes.toString();
    }
    else{
        displayminutes = minutes;
    }

    //Display updated time values to user
    document.getElementById("time").innerHTML = displayminutes + ":" + displayseconds + "." + displayms;

}

function reset(){

    window.clearInterval(interval);
    ms = 0;
    seconds = 0;
    minutes = 0;
    document.getElementById("time").innerHTML = "00:00:00";

}

ring.addEventListener("click", function (){

    if(stopped){
        reset();
        //Start the stopwatch (by calling the setInterval() function)
        interval = window.setInterval(stopWatch, 10);
        stopped = !stopped;

    }
    else{

        window.clearInterval(interval);
        stopped = !stopped;
        randomScramble();

    }

});

document.querySelector("body").addEventListener("keyup", function (e){

    if(stopped && e.code == 'Space'){
        reset();
        //Start the stopwatch (by calling the setInterval() function)
        interval = window.setInterval(stopWatch, 10);
        stopped = !stopped;

    }
    else if(!stopped){

        window.clearInterval(interval);
        stopped = !stopped;
        randomScramble();

    }

});
