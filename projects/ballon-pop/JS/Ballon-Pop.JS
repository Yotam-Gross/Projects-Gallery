'use strict'

var gBaloons = [
    { bottom: 650, speed: 10},
    { bottom: 650, speed: 10},
    { bottom: 650, speed: 10},
    { bottom: 650, speed: 10},
    { bottom: 650, speed: 10},
]

var gInterval = 0

function startPoping(){

    gInterval = setInterval(moveBaloons, 100)

}

function moveBaloons(){

    var elBallons = document.querySelectorAll(".baloon")

    for(var i = 0; i < gBaloons.length; i++){

        var baloon = gBaloons[i]   // Model
        var elBaloon = elBallons[i] // DOM

        baloon.bottom -= baloon.speed // Model
        elBaloon.style.marginTop = baloon.bottom + 'px'

        if(baloon.bottom < 0) clearInterval(gInterval)

    }

    
}

function popTheBaloon(elBaloon){

    var popSound = new Audio("Sounds/pop.wav")
    popSound.play()
    elBaloon.style.display = "none"
}