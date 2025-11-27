// prosty skrypt: toggle nav, update year, prosty handling formularza
document.addEventListener('DOMContentLoaded', function() {
  // year in footer
  const y = new Date().getFullYear();
  document.getElementById('year').textContent = y;

  // mobile nav
  const navToggle = document.getElementById('navToggle');
  const mainNav = document.querySelector('.main-nav');
  navToggle.addEventListener('click', () => {
    const shown = mainNav.style.display === 'flex';
    mainNav.style.display = shown ? 'none' : 'flex';
    navToggle.textContent = shown ? '☰' : '✕';
  });

  // simple AJAX submit for Formspree (improves UX)
  const form = document.getElementById('contactForm');
  const status = document.querySelector('.form-status');
  if (form) {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      const data = new FormData(form);
      const action = form.getAttribute('action');
      status.textContent = 'Wysyłanie...';
      fetch(action, {
        method: 'POST',
        body: data,
        headers: { 'Accept': 'application/json' }
      }).then(response => {
        if (response.ok) {
          status.textContent = 'Dzięki! Wiadomość wysłana.';
          form.reset();
        } else {
          response.json().then(data => {
            if (data && data.errors) {
              status.textContent = data.errors.map(err => err.message).join(', ');
            } else {
              status.textContent = 'Wystąpił błąd — spróbuj ponownie.';
            }
          }).catch(() => {
            status.textContent = 'Wystąpił błąd — spróbuj ponownie.';
          });
        }
      }).catch(() => {
        status.textContent = 'Brak połączenia — sprawdź internet.';
      });
    });
  }
});