/* ---------------------------
   ReMexTTa - script.js
   - buscar() -> consulta Apps Script
   - contacto modal -> envío por WhatsApp + confirmación
   ---------------------------*/

/* ------------- BUSCADOR -------------- */
document.getElementById('buscarBtn')?.addEventListener('click', buscar);
document.getElementById('query')?.addEventListener('keydown', function(e){
  if(e.key === 'Enter') buscar();
});

function buscar() {
  const query = document.getElementById("query").value.trim();
  const resultadosDiv = document.getElementById("resultados");
  resultadosDiv.innerHTML = "<p style='color:#bfbfbf'>Buscando...</p>";

  // IMPORTANT: reemplaza TU_SCRIPT_ID por el id/URL de tu Apps Script desplegado (exec)
  const scriptUrl = "https://script.google.com/macros/s/TU_SCRIPT_ID/exec?q=" + encodeURIComponent(query);

  fetch(scriptUrl)
    .then(res => res.json())
    .then(data => {
      if (!data || data.length === 0) {
        resultadosDiv.innerHTML = "<p style='color:#d0d0d0'>No se encontraron resultados.</p>";
        return;
      }
      resultadosDiv.innerHTML = data.map(item => `
        <div class="registro">
          <h3>${escapeHtml(item.nombre || '—')}</h3>
          <p><strong>Especialidad:</strong> ${escapeHtml(item.especialidad || '—')}</p>
          <p><strong>Clave:</strong> ${escapeHtml(item.clave || '—')}</p>
        </div>
      `).join('');
    })
    .catch(err => {
      console.error(err);
      resultadosDiv.innerHTML = "<p style='color:#f08'>Error al buscar. Intenta de nuevo.</p>";
    });
}

/* Simple escape para prevenir inyección si viniera contenido extraño */
function escapeHtml(text) {
  return String(text).replace(/[&<>"']/g, function(m){ return ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'})[m]; });
}

/* ------------- MODAL CONTACTO -------------- */
const openBtn = document.getElementById('openContact');
const modal = document.getElementById('contactModal');
const closeBtn = document.getElementById('closeModal');
const cancelBtn = document.getElementById('cancelContact');
const contactForm = document.getElementById('contactForm');

if (openBtn && modal) {
  openBtn.addEventListener('click', () => {
    modal.setAttribute('aria-hidden', 'false');
  });
}
if (closeBtn) closeBtn.addEventListener('click', () => modal.setAttribute('aria-hidden', 'true'));
if (cancelBtn) cancelBtn.addEventListener('click', () => modal.setAttribute('aria-hidden', 'true'));

/* Envío: arma el texto y abre wa.me con el mensaje (número fijo en el código) */
contactForm?.addEventListener('submit', function(e) {
  e.preventDefault();
  const nombre = document.getElementById('c_nombre').value.trim();
  const telefono = document.getElementById('c_telefono').value.trim();
  const mensaje = document.getElementById('c_mensaje').value.trim();

  if (!nombre || !telefono || !mensaje) {
    alert('Por favor completa todos los campos.');
    return;
  }

  const texto = `Nuevo contacto desde ReMexTTa:%0A%0ANombre: ${encodeURIComponent(nombre)}%0ATeléfono: ${encodeURIComponent(telefono)}%0A%0AMensaje:%0A${encodeURIComponent(mensaje)}`;
  // Número de WhatsApp (mismo que en la cabecera): sin símbolos, empezando con código de país (ej: 52...)
  const waNumber = "527731538233"; // <- si cambias número, actualiza aquí también

  const waUrl = `https://wa.me/${waNumber}?text=${texto}`;

  // Abrir en nueva pestaña para enviar (usuario no ve el número en la UI del formulario)
  window.open(waUrl, "_blank");

  // Cierre modal y confirmación
  modal.setAttribute('aria-hidden', 'true');
  contactForm.reset();
  // Mensaje de confirmación visible
  setTimeout(()=> {
    alert("Has enviado correctamente tu mensaje y te responderemos lo antes posible.");
  }, 200);
});

/* Optional: close modal on ESC */
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape' && modal.getAttribute('aria-hidden') === 'false') {
    modal.setAttribute('aria-hidden', 'true');
  }
});
