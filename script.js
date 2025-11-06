function toggleMenu() {
  document.getElementById("menu").classList.toggle("show");
}

function buscar() {
  const query = document.getElementById("query").value.trim();
  const resultadosDiv = document.getElementById("resultados");
  resultadosDiv.innerHTML = "<p>Buscando...</p>";

  fetch("https://script.google.com/macros/s/TU_SCRIPT_ID/exec?q=" + encodeURIComponent(query))
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
