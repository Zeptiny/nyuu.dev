document.addEventListener("translationsComplete", () => {
  const elements = document.querySelectorAll('.ease-animation');
  
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("opacity-100", "translate-y-0");
        observer.unobserve(entry.target); // Optional: Stop observing after animation
      }
    });
  }, { threshold: 0.2 });

  elements.forEach(element => observer.observe(element));
});