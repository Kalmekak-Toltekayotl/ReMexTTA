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

// Buscador conectado a tu Google App Script
function buscar() {
  const query = document.getElementById("query").value.trim();
  const resultadosDiv = document.getElementById("resultados");

  if (!query) {
    resultadosDiv.innerHTML = "<p>Por favor escribe un nombre o clave.</p>";
    return;
  }

  resultadosDiv.innerHTML = "<p>Buscando...</p>";

  fetch("https://script.google.com/macros/s/AKfycbxpD5gQeN2qM-IKxs5GfaRiuM2eTDPJ4zLrnu2kRXEjWhS-JQgmlUkZdkJnSo789a1CBg/exec?q=" + encodeURIComponent(query))
    .then(res => res.json())
    .then(data => {
      if (!data || data.length === 0) {
        resultadosDiv.innerHTML = "<p>No se encontraron resultados.</p>";
        return;
      }

      resultadosDiv.innerHTML = data.map(item => `
        <div class="registro">
          <h3>${item.nombre}</h3>
          <ul class="valores">
            <li><strong>Especialidad:</strong> ${item.especialidad}</li>
            <li><strong>Clave:</strong> ${item.clave}</li>
          </ul>
        </div>
      `).join('');
    })
    .catch(err => {
      console.error(err);
      resultadosDiv.innerHTML = "<p>Error al conectar con el servidor. Intenta de nuevo más tarde.</p>";
    });
}
