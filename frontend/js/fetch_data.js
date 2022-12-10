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
        return hour + " h "+ minute + " min.";
    }
    else {
        return time + "min.";
    }
}

// Récupérer les informations d'un film lors d'un évennement (clic) sur un élément (bouton ou image)
function movieInfo(element, url){
    try {
        element.addEventListener("click", function(event) {
            let movie = fetchData(url);
            movie.then((data) => {
                let imgTag = document.getElementsByClassName("img-modal")[0];
                // Ajouter les propriétés de la balise img
                imgTag.setAttribute("src", data["image_url"]);
                imgTag.setAttribute("alt", "Movie image");

                let textModal = document.getElementsByClassName("text-modal")[0];
                textModal.innerHTML ="<strong>Titre</strong><span> : </span><em>"+data["title"]+"</em>"
                + "<br><strong>Genre(s)</strong><span> : </span><em>"+data["genres"]+"</em>"
                + "<br><strong>Date de sortie</strong><span> : </span><em>"+data["date_published"]+"</em>"
                + "<br><strong>Note</strong><span> : </span><em>"+data["rated"]+"</em>"
                + "<br><strong>Score IMDB</strong><span> : </span><em>"+data["imdb_score"]+"</em>"
                + "<br><strong>Réalisateur</strong><span> : </span><em>"+data["directors"]+"</em>"
                + "<br><strong>Acteurs</strong><span> : </span><em>"+data["actors"]+"</em>"
                + "<br><strong>Durée</strong><span> : </span><em>"+timeH(data["duration"])+"</em>"
                + "<br><strong>Pays d'origine</strong><span> : </span><em>"+data["countries"]+"</em>"
                + "<br><strong>Résultat au Box Office</strong><span> : </span><em>"
                + data["worldwide_gross_income"]+"</em>"
                + "<br><strong>Résumé du film</strong><span> : </span><em>"+data["long_description"]+"</em>";
                let modal = document.getElementById("modal");
                modal.style.display = "block";
                let backgroundModal = document.getElementsByClassName("background-modal")[0];
                backgroundModal.style.display = "block";
                body = document.getElementsByTagName("body")[0];
                body.style.overflow = "scroll";
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
    let button = document.getElementsByClassName("button")[0];
    // Afficher la fenêtre modale si on clique sur le bouton ayant la propriété class="button"
    movieInfo(button, movieUrl);
    try {
        const movieJson = fetchData(movieUrl);
        movieJson.then(function(data) {
            // Ajouter au document l'image du meilleur film comme background
            let best = document.getElementsByClassName("best-film")[0] ;
            let imgUrl= data["image_url"];
            best.style.backgroundImage = "url(" + imgUrl + ")";
            // Modifier les propriétés de background
            best.style.backgroundRepeat = "no-repeat";
            best.style.backgroundSize = "100%";
            best.style.backgroundPosition = "24% 72%";
            best.style.opacity = "0.8";

            // Ajouter au document le titre du meilleur film
            let title = document.getElementsByClassName("title-best-film")[0];
            title.innerHTML = data["title"];
            // Ajouter au document la description du meilleur film
            let description = document.getElementsByClassName("description")[0];
            description.innerHTML = "<em>Description</em>" + "<br>" + data["long_description"];

            // Ajouter l'image du meilleur film dans le document
            // Créer la balise img qui contient l'image récupérée du meilleur film
            let divTag = document.getElementsByClassName("img-best")[0];
            imgTag = document.createElement("img");
            divTag.appendChild(imgTag);

            // Ajouter les propriétés de la balise img
            imgTag.setAttribute("src", data["image_url"]);
            imgTag.setAttribute("alt", "Best movie");
            imgTag.setAttribute("class", "best_movie");
            imgTag.style.width = "100%";
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
                let movieUrl = info[i]["url"];
                if (topMovie) {
                    // Récupérer les informations du meilleur film
                    bestMovie(movieUrl)
                    topMovie=false; // Récupérer les informations des autres meilleurs films
                }
                else {
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
                }
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
let urlMaxImdb = "http://localhost:8000/api/v1/titles/?sort_by=-imdb_score";
fetchMovies(urlMaxImdb, className="sevenBest", number=7, topMovie=true);
// Récupération d'informations des films les mieux notés pour la catégorie "Comedy"
let urlComedy = "http://localhost:8000/api/v1/titles/?genre=comedy&sort_by=-imdb_score";
fetchMovies(urlComedy, className="comedy");
// Récupération d'informations des films les mieux notés pour la catégrie "Family"
let urlFamily = "http://localhost:8000/api/v1/titles/?genre=family&sort_by=-imdb_score";
fetchMovies(urlFamily, className="family");
// Récupération d'informations des films les mieux notés pour la catégrie "Action"
let urlAction = "http://localhost:8000/api/v1/titles/?genre=action&sort_by=-imdb_score";
fetchMovies(urlAction, className="action");
