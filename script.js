// Transición suave entre páginas (fade-out)
document.addEventListener("DOMContentLoaded", () => {
  const links = document.querySelectorAll(".fade-link");

  links.forEach(link => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      document.body.classList.add("fade-out");
      setTimeout(() => {
        window.location = link.href;
      }, 600);
    });
  });
});

// Fade-in al cargar la página
window.addEventListener("pageshow", () => {
  document.body.classList.add("fade-in");
});

// Envío simulado del formulario de contacto
const form = document.getElementById("contactoForm");
if (form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    document.getElementById("confirmacion").textContent =
      "Has enviado correctamente tu mensaje. Te responderemos lo antes posible.";
    form.reset();
  });
}
