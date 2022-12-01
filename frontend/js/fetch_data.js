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
// Fonction pour la durée des films
function timeH(time){
    if (time >= 60) {
        let hour = Math.floor(time/60);
        let minute = time % 60;
        return hour + " h "+ minute + " min";
    }
    else {
        return time + "min";
    }
}

// Récupérer les informations d'un film lors d'un évennement (clic) sur un élément (bouton ou image)
function movieInfo(element, url){
    try {
        element.addEventListener("click", function() {
            const movie = fetchData(url);
            movie.then((data) => {
                let imgTag = document.getElementsByClassName("img-modal")[0];
                // Ajouter les propriétés de la balise img
                imgTag.setAttribute("src", data["image_url"]);
                imgTag.setAttribute("alt", "Movie image");

                let textModal = document.getElementsByClassName("text-modal")[0];
                textModal.innerHTML ="<em>Titre :</em>&emsp;" + data["title"]
                + "<br /><em>Genre(s) :</em>&emsp;" + data["genres"]
                +"<br /><em>Date de sortie :</em>&emsp;" + data["date_published"]
                +"<br /><em>Note :</em>&emsp;" + data["rated"]
                +"<br /><em>Score IMDB :</em>&emsp;" + data["imdb_score"]
                +"<br /><em>Réalisateur :</em>&emsp;" + data["directors"]
                +"<br /><em>Acteurs :</em>&emsp;" + data["actors"]
                +"<br /><em>Durée :</em>&emsp;" + timeH(data["duration"])
                +"<br /><em>Pays d'origine :</em>&emsp;" + data["countries"]
                +"<br /><em>Score au Box-Office :</em>&emsp;" + data["worldwide_gross_income"]
                +"<br /><em>Description :</em>&emsp;" + data["long_description"];
                let modal = document.getElementById("modal");
                modal.style.display = "block";
                let backgroundModal = document.getElementsByClassName("background-modal")[0];
                backgroundModal.style.display = "block";
                body = document.getElementsByTagName("body")[0];
                body.style.overflow = "hidden";
            })
        })
    }
    catch(error){
        console.error("Impossible de récupérer les informations du film : ${error}");
    }
}

// Croix fermeture fenêtre modale
let closeModal = document.getElementsByClassName("close")[0];
closeModal.onclick = function(){
    modal.style.display = "none";
    backgroundModal.style.display = "none";
    body.style.overflow = "scroll";
}

function bestMovie(movieUrl) {
    let divTag = document.getElementsByClassName("img-best")[0];
    // Créer la balise img qui contient l'image récupérée du meilleur film
    imgTag = document.createElement("img");
    divTag.appendChild(imgTag);
    let button = document.getElementsByClassName("button")[0];
    // Afficher la fenêtre modale si on clique sur le boutton ayant la propriété class="button"
    movieInfo(button, movieUrl);
    try {
        const movieJson = fetchData(movieUrl);
        movieJson.then(function(data) {
            let title = document.getElementsByClassName("title-best-film")[0];
            title.innerHTML = data["title"];
            let description = document.getElementsByClassName("description")[0];
            description.innerHTML = data["long_description"];
            // Ajouter les propriétés de la balise img
            imgTag.setAttribute("src", data["image_url"]);
            imgTag.setAttribute("alt", "Best movie");
            imgTag.setAttribute("id", "best_movie");
            let bestSection = document.getElementsByClassName("best-film")[0].innerHTML;
            let imgUrl= imgTag.getAttribute("src");
            bestSection.style.backgroundImage = imgUrl;
            // bestSection.setAttribute("style", "background-image : url(imgUrl)";
            // bestSection.setAttribute("style", "background-repeat: repeat");
        })
    }
    catch(error){
        console.error("Impossible de récupérer les informations du meilleur film : ${error}");
    }
}

// Fonction récupérant 7 films à la suite
function fetchMovies(url, className, number=7, topMovie=false) {
    try {
        const movies = fetchData(url);
        movies.then((moviesData) => {
            let info = moviesData["results"];
            for(i=0; i < info.length; i++) {
                var movieUrl = info[i]["url"];
                if (topMovie) {
                    // Récupérer les informations du meilleur film
                    bestMovie(movieUrl)
                    topMovie=false; // Récupérer les informations des autres meilleurs films
                }
                // Récupérer l'url de l'image du film
                let imgUrl = info[i]["image_url"];
                // Créer la balise img en ajoutant les propriétés class="img-film" et src=imgUrl
                newImage = document.createElement("img");
                newImage.setAttribute("class", "img-film");
                newImage.setAttribute("src", imgUrl);
                // Afficher la fenêtre modale si on clique sur l'image récupérée
                movieInfo(newImage, movieUrl);
                // Créer la balise div qui contient l'image récupérée d'une catégorie className
                newDiv = document.createElement("div");
                let section = document.getElementsByClassName(className)[0];
                section.appendChild(newDiv);
                newDiv.appendChild(newImage);

                number--
                if (number==0){
                    break;
                }
            }
            if (number > 0) {
                let nextUrl = moviesData["next"];
                fetchMovies(nextUrl, className, number);
            }
        })
    }
    catch(error){
        console.error("Impossible de récupérer les informations des films : ${error}");
    }
}
// Récupération d'informations des meilleurs films
const urlMaxImdb = "http://localhost:8000/api/v1/titles/?sort_by=-imdb_score";
fetchMovies(urlMaxImdb, className="sevenBest", number=7, topMovie=true);
// Récupération d'informations des films les mieux notés pour la catégrie "Comedy"
const urlComedy = "http://localhost:8000/api/v1/titles/?genre=comedy&sort_by=-imdb_score";
fetchMovies(urlComedy, className="comedy");
// Récupération d'informations des films les mieux notés pour la catégrie "Family"
const urlFamily = "http://localhost:8000/api/v1/titles/?genre=family&sort_by=-imdb_score";
fetchMovies(urlFamily, className="family");
// Récupération d'informations des films les mieux notés pour la catégrie "Action"
const urlAction = "http://localhost:8000/api/v1/titles/?genre=action&sort_by=-imdb_score";
fetchMovies(urlAction, className="action");
