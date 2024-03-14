document.addEventListener('DOMContentLoaded', (event) => {
    const titleElement = document.querySelector('.title_result');
    const originalSize = 1;
    const maxScale = 0.8;
    const minScale = 0.5;

    const updateSize = () => {
        const windowHeight = window.innerHeight;
        const elementPosition = titleElement.getBoundingClientRect().top + (titleElement.offsetHeight / 2); // Position du milieu de l'élément
        const centerOfWindowAdjusted = (windowHeight / 2) - 200;
        const distanceFromCenterAdjusted = Math.abs(centerOfWindowAdjusted - elementPosition);
        const scaleRange = maxScale - minScale;
        const newSize = minScale + (distanceFromCenterAdjusted / (windowHeight / 2)) * scaleRange;
        titleElement.style.transform = `scale(${Math.max(minScale, Math.min(maxScale, newSize))})`;
    };

    window.addEventListener('scroll', updateSize);
    updateSize();

    let elementCompteur = document.getElementById('compteur');
    let valeurMax = 137;
    let duree = 3000; // Durée en millisecondes
    let debut = Date.now();
    let intervalle = duree / valeurMax;

    let intervalID = setInterval(function() {
        let tempsEcoule = Date.now() - debut;
        let pourcentage = Math.floor(tempsEcoule / duree * valeurMax);

        if (pourcentage <= valeurMax) {
            elementCompteur.textContent = `${pourcentage}%`;
        } else {
            elementCompteur.textContent = `137%`;
            clearInterval(intervalID);
        }
    }, intervalle);
});
