function toggleMenu() {
  const menu = document.getElementById("menu");
  menu.classList.toggle("open");
}

function buscar() {
  const query = document.getElementById("query").value.trim();
  const resultados = document.getElementById("resultados");

  if (!query) {
    resultados.innerHTML = "<p>Por favor, escribe un nombre o clave.</p>";
    return;
  }

  resultados.innerHTML = "<p>Buscando resultados para: <b>" + query + "</b>...</p>";

  // Simulación temporal
  setTimeout(() => {
    resultados.innerHTML = `<p>No se encontraron resultados para "<b>${query}</b>".</p>`;
  }, 1200);
}
