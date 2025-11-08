function buscar() {
  const query = document.getElementById("query").value.trim();
  const resultadosDiv = document.getElementById("resultados");

  if (query === "") {
    resultadosDiv.innerHTML = "<p>Por favor, escribe un nombre o clave para buscar.</p>";
    return;
  }

  resultadosDiv.innerHTML = "<p>Buscando información, por favor espera...</p>";

  // ⚠️ Sustituye este enlace cuando publiques tu Google Apps Script (Paso 3)
  const url = "TU_URL_DE_GOOGLE_APPS_SCRIPT_AQUI"; 

  fetch(url + "?query=" + encodeURIComponent(query))
    .then(response => response.json())
    .then(data => {
      if (data.length > 0) {
        let html = "<table border='1'><tr><th>Nombre</th><th>Clave</th><th>Especialidad</th></tr>";
        data.forEach(row => {
          html += `<tr><td>${row.nombre}</td><td>${row.clave}</td><td>${row.especialidad}</td></tr>`;
        });
        html += "</table>";
        resultadosDiv.innerHTML = html;
      } else {
        resultadosDiv.innerHTML = "<p>No se encontraron resultados.</p>";
      }
    })
    .catch(error => {
      resultadosDiv.innerHTML = "<p style='color:red;'>No se pudo conectar con el servidor.</p>";
      console.error(error);
    });
}
