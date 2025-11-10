// Efecto fade entre páginas
window.addEventListener("DOMContentLoaded", () => {
  document.body.classList.add("loaded");

  document.querySelectorAll("a[href]").forEach(link => {
    if (link.getAttribute("target") === "_blank") return;
    link.addEventListener("click", e => {
      const href = link.getAttribute("href");
      if (href && !href.startsWith("#")) {
        e.preventDefault();
        document.body.classList.remove("loaded");
        setTimeout(() => window.location.href = href, 2000);
      }
    });
  });
});

// Menú responsive
function toggleMenu() {
  document.getElementById("menu").classList.toggle("show");
}

// 🔍 Buscador conectado con Google Apps Script
function buscar() {
  const query = document.getElementById("query").value.trim();
  const resultadosDiv = document.getElementById("resultados");

  if (!query) {
    resultadosDiv.innerHTML = "<p>Por favor, escribe un nombre o clave.</p>";
    return;
  }

  resultadosDiv.innerHTML = "<p>Buscando...</p>";

  fetch("https://script.google.com/macros/s/AKfycbxRuVYWYS2u-KL3YAjGmzF3Gk_JJOef7D0Sq8VwjFH2cyUf7chfu7YuMqyXr1CMXRGLzw/exec?q=" + encodeURIComponent(query))
    .then(res => res.json())
    .then(data => {
      if (!data || data.length === 0) {
        resultadosDiv.innerHTML = "<p>No se encontraron resultados.</p>";
        return;
      }

      resultadosDiv.innerHTML = data.map(item => `
        <div class="registro">
          <h3>${item.nombre}</h3>
          <p><strong>Especialidad:</strong> ${item.especialidad}</p>
          <p><strong>Clave:</strong> ${item.clave}</p>
        </div>
      `).join('');
    })
    .catch(err => {
      console.error(err);
      resultadosDiv.innerHTML = "<p>Error al buscar. Intenta más tarde.</p>";
    });
}
