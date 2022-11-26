// Obtenir un objet JSON
async function fetchData(url) {
    let response = await fetch(url);
    if (response.ok) {
        // obtenir le corps de réponse et l'analyser en JSON
        let json = await response.json();
        return json
    }   else {
            alert("HTTP-Error: " + response.status);
    }
}
// Récupérer les informations d'un film lors d'un évennement (clic) sur un élément (bouton ou image)
function movieInfo(element, url){
    try {
        element.addEventListener("click", function() {
            const movie = fetchData(url);
            movie.then((data) => {
                imgModal.setAttribute("src", data["image_url"]);
                textModal.innerHTML ="<em>Titre : </em>&emsp;" + data["title"]
                + "<br /><em>Genre(s) : </em>&emsp;" + data["genres"]
                +"<br /><em>Date de sortie : </em>&emsp;" + data["date_published"]
                +"<br /><em>Note : </em>&emsp;" + data["rated"]
                +"<br /><em>Score IMDB : </em>&emsp;" + data["imdb_score"]
                +"<br /><em>Réalisateur : </em>&emsp;" + data["directors"]
                +"<br /><em>Acteurs : </em>&emsp;" + data["actors"]
                +"<br /><em>Durée : </em>&emsp;" + timeH(data["duration"])
                +"<br /><em>Pays d'origine : </em>&emsp;" + data["countries"]
                +"<br /><em>Score au Box-Office : </em>&emsp;" + data["worldwide_gross_income"]
                +"<br /><em>Description : </em>&emsp;" + data["long_description"];
                modal.style.display = "block";
                backgroundModal.style.display = "block";
                body.style.overflow = "hidden";
            })
        })
    }
    catch(error){
        console.error("Impossible de récupérer les informations du film : ${error}");
    }
}
// Les fenêtres modales
var modal = document.getElementById("modal");
var backgroundModal = document.getElementsByClassName("background-modal")[0];
var body = document.getElementsByTagName("body")[0];

// Croix fermeture fenêtre modale
let closeModal = document.getElementsByClassName("close")[0];
closeModal.onclick = function(){
    modal.style.display = "none";
    backgroundModal.style.display = "none";
    body.style.overflow = "scroll";
}

// Info modal
let imgModal = document.getElementsByClassName("img-modal")[0];
let textModal = document.getElementsByClassName("text-modal")[0];

// Fonction pour la durée des films
function timeH(time){
    if (time >= 60) {
        let hour = Math.floor(time/60);
        let minute = time % 60;
        return hour+" h "+ minute + " min";
    }
    else {
        return time+"min";
    }
}

// Fonction récupérant 7 films à la suite
function fetchMovies(url, className, number=7, takeFirst=false) {
    try {
        const movies = fetchData(url);
        movies.then((moviesData) => {
            let next = moviesData["next"];
            let info = moviesData["results"];
            for(i=0; i < info.length; i++) {
                var movieUrl = info[i]["url"];
                if (takeFirst) {
                    takeFirst=false;
                    // film au plus haut score imdb
                    let img = document.getElementsByClassName("img-best")[0];
                    movieInfo(img, movieUrl);
                    let button = document.getElementsByClassName("button")[0];
                    movieInfo(button, movieUrl);
                    /*
                    let movie = fetchData(movieUrl);
                    movie.then((data) {
                        let title = document.getElementsByClassName("title-best-film")[0];
                        title.innerHTML = data["title"];
                        let description = document.getElementsByClassName("description")[0];
                        description.innerHTML = data["long_description"];
                        img.setAttribute("src", data["image_url"]);
                    })
                    */
                    fetch(movieUrl)
                        .then(function(res) {
                            if (res.ok) {
                                return res.json();
                            }
                        })
                        .then(function(data) {
                            let title = document.getElementsByClassName("title-best-film")[0];
                            title.innerHTML = data["title"];
                            let description = document.getElementsByClassName("description")[0];
                            description.innerHTML = data["long_description"];
                            img.setAttribute("src", data["image_url"]);
                        })
                        .catch(function(err) { alert("Erreur")});
                    continue;
                }
                let imgUrl = info[i]["image_url"];
                let section = document.getElementsByClassName(className)[0];
                newDiv = document.createElement("div");
                newImage = document.createElement("img");
                newImage.setAttribute("class", "img-film");
                newImage.setAttribute("src", imgUrl);
                movieInfo(newImage, movieUrl);
                section.appendChild(newDiv);
                newDiv.appendChild(newImage);
                number--
                if (number==0){
                    break;
                }
            }
            if (number>0) {
                fetchMovies(next, className, number);
            }
        })
    }
    catch(error){
        console.error("Impossible de récupérer les informations des films : ${error}");
    }
}

// Récupération des url
const urlMaxImdb = "http://localhost:8000/api/v1/titles/?sort_by=-imdb_score";
const urlComedy = "http://localhost:8000/api/v1/titles/?genre=comedy&sort_by=-imdb_score";
const urlFamily = "http://localhost:8000/api/v1/titles/?genre=family&sort_by=-imdb_score";
const urlAction = "http://localhost:8000/api/v1/titles/?genre=action&sort_by=-imdb_score";
// Récupération d'informations des meilleurs films
fetchMovies(urlMaxImdb, className="sevenBest", number=7, takeFirst=true);
// Récupération d'informations des films les mieux notés pour la catégrie "Comedy"
fetchMovies(urlComedy, className="comedy");
// Récupération d'informations des films les mieux notés pour la catégrie "Family"
fetchMovies(urlFamily, className="family");
// Récupération d'informations des films les mieux notés pour la catégrie "Action"
fetchMovies(urlAction, className="action");
