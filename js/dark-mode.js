var turnstileWidget = document.getElementById('cf-turnstile');
var themeToggleDarkIcon = document.getElementById('theme-toggle-dark-icon');
var themeToggleLightIcon = document.getElementById('theme-toggle-light-icon');

// On page load or when changing themes, best to add inline in `head` to avoid FOUC
if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    document.documentElement.classList.add('dark');
    themeToggleDarkIcon.classList.remove('hidden');
    turnstileWidget.setAttribute('data-theme', 'dark');
  } else {
    document.documentElement.classList.remove('dark');
    themeToggleLightIcon.classList.remove('hidden');
    turnstileWidget.setAttribute('data-theme', 'light');
  }
  
  var themeToggleBtn = document.getElementById('theme-toggle');
  
  themeToggleBtn.addEventListener('click', function() {
  
      // toggle icons inside button
      themeToggleDarkIcon.classList.toggle('hidden');
      themeToggleLightIcon.classList.toggle('hidden');
  
      // if set via local storage previously
      if (localStorage.getItem('theme')) {
          if (localStorage.getItem('theme') === 'light') {
              document.documentElement.classList.add('dark');
              localStorage.setItem('theme', 'dark');
              turnstileWidget.setAttribute('data-theme', 'dark');
          } else {
              document.documentElement.classList.remove('dark');
              localStorage.setItem('theme', 'light');
              turnstileWidget.setAttribute('data-theme', 'light');
          }
  
      // if NOT set via local storage previously
      } else {
          if (document.documentElement.classList.contains('dark')) {
              document.documentElement.classList.remove('dark');
              localStorage.setItem('theme', 'light');
              turnstileWidget.setAttribute('data-theme', 'light');
          } else {
              document.documentElement.classList.add('dark');
              localStorage.setItem('theme', 'dark');
              turnstileWidget.setAttribute('data-theme', 'dark');
          }
      }
      turnstile.render(turnstileWidget)
      turnstile.remove(turnstileWidget)
      
  });