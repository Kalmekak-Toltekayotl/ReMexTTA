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

// Buscador con App Script
function buscar() {
  const query = document.getElementById("query").value.trim();
  const resultadosDiv = document.getElementById("resultados");
  resultadosDiv.innerHTML = "<p>Buscando...</p>";

  fetch("https://script.google.com/macros/s/https://script.google.com/macros/s/AKfycbyWl8RDKlrw_YXsuYAUWgsQN5YR1xbd4paIbpH33L1EF5fW46nC4Uel916WYsJkeNqljg/exec/exec?q=" + encodeURIComponent(query))
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
      resultadosDiv.innerHTML = "<p>Error al buscar. Intenta de nuevo.</p>";
    });
}
const appScriptURL = "https://script.google.com/macros/s/AKfycby3U-k6JifI8i72uuQ9yyzBOIYOJJtSwzTvuYq0UsNL1ewwUCLkf9kHz7crn0Eco4Y3OA/exec";

function buscar() {
  const input = document.getElementById("searchInput");
  const resultadosDiv = document.getElementById("resultados");
  const termino = input.value.trim();

  if (termino === "") {
    resultadosDiv.innerHTML = "<p>Por favor escribe un nombre o clave.</p>";
    return;
  }

  resultadosDiv.innerHTML = "<p>Buscando...</p>";

  fetch(appScriptURL, {
    method: "POST",
    body: JSON.stringify({ search: termino }),
    headers: { "Content-Type": "application/json" }
  })
    .then(res => res.json())
    .then(data => {
      if (data.length === 0) {
        resultadosDiv.innerHTML = "<p>No se encontraron registros.</p>";
        return;
      }

      let html = "<table><tr><th>Nombre</th><th>Clave</th><th>Especialidad</th><th>Registro</th><th>Estatus</th></tr>";
      data.forEach(row => {
        html += `<tr>
          <td>${row[0]}</td>
          <td>${row[1]}</td>
          <td>${row[2]}</td>
          <td>${row[3]}</td>
          <td>${row[4]}</td>
        </tr>`;
      });
      html += "</table>";
      resultadosDiv.innerHTML = html;
    })
    .catch(err => {
      resultadosDiv.innerHTML = "<p>Error al conectar con la base de datos.</p>";
      console.error(err);
    });
}
