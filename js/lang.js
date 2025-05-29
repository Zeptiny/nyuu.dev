// Save the tanslations in a cache to not refetch every time the user change the language in the same session
const translationsCache = {};
async function loadTranslations(language) {
    if (translationsCache[language]) {
        return translationsCache[language];
    }
    const response = await fetch(`translations/${language}.json`);
    const data = await response.json();
    translationsCache[language] = data;
    return data;
}

var langTogglePT = document.getElementById('lang-toggle-pt');
var langToggleEN = document.getElementById('lang-toggle-en');

var langToggleBtn = document.getElementById('lang-toggle');

function updateToggleIcons(language) {
    langTogglePT.classList.toggle('hidden', language !== 'en');
    langToggleEN.classList.toggle('hidden', language !== 'pt');
}

function getDefaultLanguage() {
    const savedLanguage = localStorage.getItem('selectedLanguage');
    if (savedLanguage) {
        updateToggleIcons(savedLanguage);
        return savedLanguage;
    }

    const language = navigator.language || navigator.userLanguage;
    updateToggleIcons(language.startsWith('pt') ? 'pt' : 'en');
    return language.startsWith('pt') ? 'pt' : 'en';
}


function setLanguage(language) {
    loadTranslations(language).then(translations => {
        document.querySelectorAll('[translate]').forEach(element => {
            const key = element.getAttribute('translate');
            element.textContent = translations[key];
        });
        // Save the selected language to localStorage
        localStorage.setItem('selectedLanguage', language);
    })
}

langToggleBtn.addEventListener('click', function() {
    const currentLanguage = localStorage.getItem('selectedLanguage') || getDefaultLanguage();
    const newLanguage = currentLanguage === 'pt' ? 'en' : 'pt';
    updateToggleIcons(newLanguage);
    setLanguage(newLanguage);
});


// Set the default language when the page loads
document.addEventListener('DOMContentLoaded', async () => {
    const defaultLanguage = getDefaultLanguage();
    await setLanguage(defaultLanguage);
    // document.querySelector('main').classList.remove('hidden');
    // document.querySelector('footer').classList.remove('hidden');
});


