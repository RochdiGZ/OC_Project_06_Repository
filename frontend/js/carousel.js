// Déplacer les images à droite
for (arrow of document.getElementsByClassName("cursor-right")) {
    arrow.onclick = function () {
        // this : fait référence à l'élément qui a reçu l'événement click.
        // this.parentElement : fait référence à l'élément parent de l'élément qui a reçu l'événement click.
        let images = this.parentElement.getElementsByClassName("img-film");
        images[0].parentElement.style.display = "none";
        // Ajouter l'élément parent de l'image d'indice 0 après le dernier enfant de cet élément parent
        images[0].parentElement.parentElement.append(images[0].parentElement);
        images[3].parentElement.style.display = "inline";
    }
}

// Déplacer les images à gauche
for (arrow of document.getElementsByClassName("cursor-left")) {
    arrow.onclick = function () {
        // this : fait référence à l'élément qui a reçu l'événement click.
        // this.parentElement : fait référence à l'élément parent de l'élément qui a reçu l'événement click.
        let images = this.parentElement.getElementsByClassName("img-film");
        images[3].parentElement.style.display = "none";
        // Insérer l'élément parent de la dernière image avant le premier enfant de cet élément parent
        images[images.length - 1].parentElement.parentElement.prepend(images[images.length - 1].parentElement);
        images[0].parentElement.style.display = "inline";
    }
}