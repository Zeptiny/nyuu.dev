const turnstileWidget = document.getElementById('cf-turnstile');
const themeToggleDarkIcon = document.getElementById('theme-toggle-dark-icon');
const themeToggleLightIcon = document.getElementById('theme-toggle-light-icon');
const themeToggleBtn = document.getElementById('theme-toggle');

let turnstileInitialized = false;

function updateTheme(darkMode) {
    document.documentElement.classList.toggle('dark', darkMode);
    themeToggleDarkIcon.classList.toggle('hidden', darkMode);
    themeToggleLightIcon.classList.toggle('hidden', !darkMode);
    
    // Update localStorage
    localStorage.setItem('theme', darkMode ? 'dark' : 'light');

    // Only update turnstile theme if it's already initialized
    if (turnstileInitialized && typeof turnstile !== 'undefined') {
        turnstileWidget.setAttribute('data-theme', darkMode ? 'dark' : 'light');
        turnstile.remove(turnstileWidget);
        turnstile.render(turnstileWidget);
    } else {
        // Just set the theme attribute for initial render
        turnstileWidget.setAttribute('data-theme', darkMode ? 'dark' : 'light');
    }
}

// Set theme on page load (before turnstile auto-renders)
const userPref = localStorage.getItem('theme');
const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
const darkMode = userPref === 'dark' || (!userPref && systemPrefersDark);

// Set initial theme without rendering turnstile
document.documentElement.classList.toggle('dark', darkMode);
themeToggleDarkIcon.classList.toggle('hidden', darkMode);
themeToggleLightIcon.classList.toggle('hidden', !darkMode);
turnstileWidget.setAttribute('data-theme', darkMode ? 'dark' : 'light');

// Mark as initialized after turnstile loads
window.addEventListener('load', () => {
    turnstileInitialized = true;
});

// Handle button click
themeToggleBtn.addEventListener('click', () => {
    const isDark = document.documentElement.classList.contains('dark');
    updateTheme(!isDark);
});