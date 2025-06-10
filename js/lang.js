// Language configuration
const LANGUAGE_CONFIG = {
    en: { flag: 'img/united_states.svg', name: 'English', code: 'EN' },
    pt: { flag: 'img/brazil.svg', name: 'Português', code: 'PT' },
    ca: { flag: 'img/catalonia.svg', name: 'Catalan', code: 'CA' },
};

const SUPPORTED_LANGUAGES = Object.keys(LANGUAGE_CONFIG);

// Update DOM elements
const currentLangFlag = document.getElementById('current-lang-flag');
const currentLangCode = document.getElementById('current-lang-code');
const langDropdownToggle = document.getElementById('lang-dropdown-toggle');
const langDropdownMenu = document.getElementById('lang-dropdown-menu');

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

function updateCurrentLanguageDisplay(language) {
    const config = LANGUAGE_CONFIG[language];
    if (config) {
        currentLangFlag.src = config.flag;
        currentLangFlag.alt = config.code;
        currentLangCode.textContent = config.code;
    }
}

// Handle dropdown toggle
langDropdownToggle.addEventListener('click', (e) => {
    e.stopPropagation();
    langDropdownMenu.classList.toggle('hidden');
});

// Handle language selection
document.querySelectorAll('.lang-option').forEach(button => {
    button.addEventListener('click', async (e) => {
        const selectedLang = e.currentTarget.getAttribute('data-lang');
        updateCurrentLanguageDisplay(selectedLang);
        await setLanguage(selectedLang);
        localStorage.setItem('selectedLanguage', selectedLang);
        langDropdownMenu.classList.add('hidden');
    });
});

// Close dropdown when clicking outside
document.addEventListener('click', () => {
    langDropdownMenu.classList.add('hidden');
});

// Update getDefaultLanguage function
function getDefaultLanguage() {
    const savedLanguage = localStorage.getItem('selectedLanguage');
    if (savedLanguage && SUPPORTED_LANGUAGES.includes(savedLanguage)) {
        updateCurrentLanguageDisplay(savedLanguage);
        return savedLanguage;
    }

    const browserLanguage = navigator.language || navigator.userLanguage;
    const langCode = browserLanguage.split('-')[0];
    const detectedLanguage = SUPPORTED_LANGUAGES.includes(langCode) ? langCode : 'en';
    
    updateCurrentLanguageDisplay(detectedLanguage);
    return detectedLanguage;
}


async function setLanguage(language) {
    try {
        const translations = await loadTranslations(language);
        document.querySelectorAll('[translate]').forEach(element => {
            const key = element.getAttribute('translate');
            if (translations.hasOwnProperty(key)) {
                element.textContent = translations[key];
            }
        });
        
        // Save the selected language to localStorage
        localStorage.setItem('selectedLanguage', language);
        
        // Dispatch custom event when translations are complete
        document.dispatchEvent(new CustomEvent('translationsComplete'));
    } catch (error) {
        console.error('Failed to load translations:', error);
    }
}


// Set the default language when the page loads
document.addEventListener('DOMContentLoaded', async () => {
    const defaultLanguage = getDefaultLanguage();
    await setLanguage(defaultLanguage);
    // document.querySelector('main').classList.remove('hidden');
    // document.querySelector('footer').classList.remove('hidden');
});