// animation texte performance

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
});

// mis a jour de la date du site

let date = new Date()
let jour = String(date.getDate()).padStart(2, '0')
let mois = String(date.getMonth() + 1).padStart(2, '0')
let annee = date.getFullYear()
let dateFormatee = "*Les informations citées ici ont été mises à jour à la date du " + jour + '/' + mois + '/' + annee + '.'

const semaineContainer = document.getElementById(`res_semaine`)
semaineContainer.textContent = dateFormatee


// compteur de membre canal telegram

const botToken = '6786917922:AAG5AKbnPz7sXxivUmW5LmAmD8JFY9Vm9j0';
const chatId = '@auroranetwork';
const url = `https://api.telegram.org/bot${botToken}/getChatMemberCount?chat_id=${chatId}`;

const userContainer = document.getElementById('count_user')

axios.get(url)
.then(response => {
    userContainer.textContent = response.data.result
})
.catch(error => {
    console.error("Erreur lors de la récupération du nombre de membres :", error);
})

document.getElementById('scrollToResult').addEventListener('click', function(e) {
    e.preventDefault(); // Empêche le comportement par défaut du lien

    // Récupère l'élément cible
    var target = document.getElementById(this.getAttribute('href').substring(1));

    // Calcule la position de l'élément cible
    var targetPosition = target.getBoundingClientRect().top;
    var startPosition = window.pageYOffset;
    var distance = targetPosition - startPosition;
    var startTime = null;

    function animation(currentTime) {
        if (startTime === null) startTime = currentTime;
        var timeElapsed = currentTime - startTime;
        var run = ease(timeElapsed, startPosition, distance, 1300); // Dernier paramètre = durée en ms
        window.scrollTo(0, run);
        if (timeElapsed < 1300) requestAnimationFrame(animation); // Continue l'animation si la durée n'est pas écoulée
    }

    function ease(t, b, c, d) {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t + b;
        t--;
        return -c / 2 * (t * (t - 2) - 1) + b;
    }

    requestAnimationFrame(animation);
});


// animation footer

let toggles = document.getElementsByClassName('toggle');
let contentDiv = document.getElementsByClassName('content_faq');
let icons = document.getElementsByClassName('icon');

for(let i=0; i<toggles.length; i++){
    toggles[i].addEventListener('click', ()=>{
        if(parseInt(contentDiv[i].style.height) != contentDiv[i].scrollHeight){
            contentDiv[i].style.height = contentDiv[i].scrollHeight + "px";
            toggles[i].style.color = "#00aa88";
            icons[i].classList.remove('fa-plus');
            icons[i].classList.add('fa-minus');
        }
        else{
            contentDiv[i].style.height = "0px";
            toggles[i].style.color = "#111130";
            icons[i].classList.remove('fa-minus');
            icons[i].classList.add('fa-plus');
        }
        for(let j=0; j<contentDiv.length; j++){
            if(j!==i){
                contentDiv[j].style.height = "0px";
                toggles[j].style.color = "#111130";
                icons[j].classList.remove('fa-minus');
                icons[j].classList.add('fa-plus');
            }
        }
    });
}