async function loadTranslations(language) {
    const response = await fetch(`translations/${language}.json`);
    return await response.json();
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

function getDefaultLanguage() {
    // Get the saved language from localStorage
    const savedLanguage = localStorage.getItem('selectedLanguage');
    if (savedLanguage) {
        return savedLanguage;
    }
    // If there is no saved language, use the browser's default language
    const language = navigator.language || navigator.userLanguage;
    return language.startsWith('pt') ? 'pt' : 'en';
}

// Set the default language when the page loads
document.addEventListener('DOMContentLoaded', () => {
    const defaultLanguage = getDefaultLanguage();
    setLanguage(defaultLanguage);
});
