// ⚙️ Pega aquí la URL de tu aplicación web de Google Apps Script
const appScriptURL = "https://script.google.com/macros/s/AKfycbwKnXwl3CprZQRWvGbmYis0t7Gbc1doPj-eTg28EI8Y2eZC5DKqU3A1o8tAfq7MzXC2bA/exec";

function buscar() {
  const query = document.getElementById("query").value.trim();
  const resultadosDiv = document.getElementById("resultados");

  if (!query) {
    resultadosDiv.innerHTML = "<p>Por favor ingresa un nombre o clave para buscar.</p>";
    return;
  }

  resultadosDiv.innerHTML = "<p>Buscando...</p>";

  fetch(`${appScriptURL}?query=${encodeURIComponent(query)}`)
    .then(res => res.json())
    .then(data => {
      if (data.length === 0) {
        resultadosDiv.innerHTML = "<p>No se encontraron resultados.</p>";
      } else {
        let html = `
          <table class="tabla-resultados">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Clave</th>
                <th>Especialidad</th>
              </tr>
            </thead>
            <tbody>
        `;
        data.forEach(row => {
          html += `
            <tr>
              <td>${row.Nombre}</td>
              <td>${row.Clave}</td>
              <td>${row.Especialidad}</td>
            </tr>
          `;
        });
        html += "</tbody></table>";
        resultadosDiv.innerHTML = html;
      }
    })
    .catch(err => {
      console.error(err);
      resultadosDiv.innerHTML = "<p>Error al conectar con el servidor.</p>";
    });
}
