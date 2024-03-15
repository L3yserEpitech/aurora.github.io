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
