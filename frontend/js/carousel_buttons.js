// Fonction pour éviter la propagation du clic pour les flèches
let cursorsLeft = document.getElementsByClassName("cursor-left");
for (cursorLeft of cursorsLeft){
    cursorLeft.addEventListener("click", function(event){
        event.stopPropagation();
    })
}
let cursorsRight = document.getElementsByClassName("cursor-right");
for (cursorRight of cursorsRight){
    cursorRight.addEventListener("click", function(event){
        event.stopPropagation();
    })
}

// Fonction pour le défilement latéral(fleches)
let bestFilms = document.getElementsByClassName("sevenBest")[0];
let zoneComedy = document.getElementsByClassName("comedy")[0];
let zoneFamily = document.getElementsByClassName("family")[0];
let zoneAction = document.getElementsByClassName("action")[0];
function goLeft(zone){
    zone.scrollBy({
        left : -230,
        behavior : "smooth"
    }
    )
}
function goRight(zone){
    zone.scrollBy({
        left : 230,
        behavior : "smooth"
    }
    )
}