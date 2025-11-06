// ======== EFECTO MENÚ RESPONSIVO ========
function toggleMenu() {
  const menu = document.getElementById("menu");
  menu.classList.toggle("active");
}

// ======== EFECTO FADE AL DESPLAZAR ========
const sections = document.querySelectorAll(".fade-section");

function mostrarSecciones() {
  const triggerBottom = window.innerHeight * 0.85;
  sections.forEach(sec => {
    const secTop = sec.getBoundingClientRect().top;
    if (secTop < triggerBottom) sec.classList.add("visible");
  });
}

window.addEventListener("scroll", mostrarSecciones);
window.addEventListener("load", mostrarSecciones);

// ======== BUSCADOR SIMULADO ========
function buscar() {
  const query = document.getElementById("query").value.toLowerCase();
  const resultados = document.getElementById("resultados");

  if (query === "") {
    resultados.innerHTML = "<p>Por favor, ingresa un nombre o especialidad.</p>";
    return;
  }

  // Simulación de resultados
  const terapeutas = [
    { nombre: "Rubí Ayala", especialidad: "Fitoterapia", clave: "KT-006" },
    { nombre: "María López", especialidad: "Masaje Holístico", clave: "KT-025" },
    { nombre: "José Pérez", especialidad: "Acupuntura", clave: "KT-104" }
  ];

  const encontrados = terapeutas.filter(t =>
    t.nombre.toLowerCase().includes(query) ||
    t.especialidad.toLowerCase().includes(query) ||
    t.clave.toLowerCase().includes(query)
  );

  if (encontrados.length === 0) {
    resultados.innerHTML = "<p>No se encontraron resultados.</p>";
    return;
  }

  resultados.innerHTML = encontrados.map(t => `
    <div class="tarjeta">
      <h3>${t.nombre}</h3>
      <p><strong>Especialidad:</strong> ${t.especialidad}</p>
      <p><strong>Clave:</strong> ${t.clave}</p>
    </div>
  `).join("");
}
// ======== FORMULARIO DE CONTACTO ========
function enviarFormulario(e) {
  e.preventDefault();
  const nombre = document.getElementById("nombre").value;
  const correo = document.getElementById("correo").value;
  const mensaje = document.getElementById("mensaje").value;

  if (!nombre || !correo || !mensaje) return;

  document.getElementById("confirmacion").textContent =
    "Gracias, " + nombre + ". Tu mensaje ha sido enviado correctamente.";
  e.target.reset();
}
