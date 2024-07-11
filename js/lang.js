async function loadTranslations(language) {
    const response = await fetch(`translations/${language}.json`);
    return await response.json();
}

var langTogglePT = document.getElementById('lang-toggle-pt');
var langToggleEN = document.getElementById('lang-toggle-en');

var langToggleBtn = document.getElementById('lang-toggle');

function getDefaultLanguage() {
    // Get the saved language from localStorage
    const savedLanguage = localStorage.getItem('selectedLanguage');
    if (savedLanguage) {
        if (savedLanguage == 'pt'){
            langToggleEN.classList.toggle('hidden')
        } else{
            langTogglePT.classList.toggle('hidden')
        }
        return savedLanguage;
    }
    // If there is no saved language, use the browser's default language
    const language = navigator.language || navigator.userLanguage;
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
  
    // toggle icons inside button
    langTogglePT.classList.toggle('hidden')
    langToggleEN.classList.toggle('hidden')

    if (localStorage.getItem('selectedLanguage')){
        if (localStorage.getItem('selectedLanguage') == 'pt'){
            setLanguage('en')
        } else{
            setLanguage('pt')
        }
    }
    
});

// Set the default language when the page loads
document.addEventListener('DOMContentLoaded', () => {
    const defaultLanguage = getDefaultLanguage();
    setLanguage(defaultLanguage);
});


