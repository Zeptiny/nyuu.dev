const turnstileWidget = document.getElementById('cf-turnstile');
const themeToggleDarkIcon = document.getElementById('theme-toggle-dark-icon');
const themeToggleLightIcon = document.getElementById('theme-toggle-light-icon');
const themeToggleBtn = document.getElementById('theme-toggle');

function updateTheme(darkMode) {
    document.documentElement.classList.toggle('dark', darkMode);
    themeToggleDarkIcon.classList.toggle('hidden', darkMode);
    themeToggleLightIcon.classList.toggle('hidden', !darkMode);
    turnstileWidget.setAttribute('data-theme', darkMode ? 'dark' : 'light');
    
    // Update localStorage
    localStorage.setItem('theme', darkMode ? 'dark' : 'light');

    // Reset turnstile
    turnstile.remove(turnstileWidget);
    turnstile.render(turnstileWidget);
}

// Set theme on page load
document.addEventListener('DOMContentLoaded', () => {
    const userPref = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const darkMode = userPref === 'dark' || (!userPref && systemPrefersDark);
    updateTheme(darkMode);
});

// Handle button click
themeToggleBtn.addEventListener('click', () => {
    const isDark = document.documentElement.classList.contains('dark');
    updateTheme(!isDark);
});
