// Efecto fade entre páginas (2s)
window.addEventListener("DOMContentLoaded", () => {
  document.body.classList.add("loaded");

  // Interceptar clicks en enlaces para fade (no aplica a enlaces externos target="_blank")
  document.querySelectorAll("a[href]").forEach(link => {
    if (link.getAttribute("target") === "_blank") return;
    link.addEventListener("click", e => {
      const href = link.getAttribute("href");
      if (href && !href.startsWith("#")) {
        e.preventDefault();
        // remover clase para iniciar fade out
        document.body.classList.remove("loaded");
        // esperar la duración de la transición (2000ms) y luego navegar
        setTimeout(() => window.location.href = href, 2000);
      }
    });
  });
});

// Menú responsive
function toggleMenu() {
  const menu = document.getElementById("menu");
  if (menu) menu.classList.toggle("show");
}

/* BUSCADOR */
// Nota: sustituye TU_SCRIPT_ID por tu ID real de Google Apps Script
function buscar() {
  const queryInput = document.getElementById("query");
  if (!queryInput) return;
  const query = queryInput.value.trim();
  const resultadosDiv = document.getElementById("resultados");
  if (!resultadosDiv) return;

  resultadosDiv.innerHTML = "<p>Buscando...</p>";

  fetch("https://script.google.com/macros/s/TU_SCRIPT_ID/exec?q=" + encodeURIComponent(query))
    .then(res => {
      if (!res.ok) throw new Error("Error en la respuesta");
      return res.json();
    })
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

/* FORMULARIO DE CONTACTO -> Envío a WhatsApp (intento de envío y cierre automático) */
function enviarMensaje(event) {
  if (event) event.preventDefault();

  const nombreEl = document.getElementById("nombre");
  const telefonoEl = document.getElementById("telefono");
  const mensajeEl = document.getElementById("mensaje");
  const form = document.getElementById("contactoForm");

  const nombre = nombreEl ? nombreEl.value.trim() : "";
  const telefono = telefonoEl ? telefonoEl.value.trim() : "";
  const mensaje = mensajeEl ? mensajeEl.value.trim() : "";

  if (!nombre || !telefono || !mensaje) {
    alert("Por favor completa todos los campos antes de enviar.");
    return;
  }

  // Construir texto (codificado para URL)
  const texto = encodeURIComponent(
    `Mensaje desde ReMexTTa:\n👤 Nombre: ${nombre}\n📞 Teléfono: ${telefono}\n💬 Mensaje: ${mensaje}`
  );

  const numero = "525638006978"; // número destino sin + ni espacios
  const url = `https://wa.me/${numero}?text=${texto}`;

  // Intento de abrir en nueva ventana y cerrarla automáticamente
  // Algunos navegadores bloquearán popups; aquí hacemos el mejor intento.
  let win = null;
  try {
    // Abrir ventana sin referer y con menor posibilidad de bloqueo
    win = window.open(url, "_blank", "noopener,noreferrer");
  } catch (e) {
    console.warn("No se pudo abrir ventana directamente:", e);
    win = null;
  }

  // Si se pudo abrir la ventana, intentar cerrarla después de un tiempo corto
  if (win) {
    // Tiempo corto para permitir que Whatsapp procesé la petición (mostrará la interfaz por un momento)
    setTimeout(() => {
      try {
        win.close();
      } catch (e) {
        // algunos navegadores no permiten cerrar ventanas abiertas por scripts si hay navegación cross-origin
        console.warn("No se pudo cerrar la ventana automáticamente:", e);
      }
    }, 1200); // 1.2s
  } else {
    // Fallback: si la ventana fue bloqueada, navegamos temporalmente en la misma pestaña
    // para garantizar el envío; luego intentamos regresar al sitio (siempre visible para el usuario).
    // NOTA: esto navegará al enlace wa.me si el popup fue bloqueado.
    const abrirFallback = () => {
      window.location.href = url;
    };
    // Intentamos abrir en la misma pestaña tras un breve retraso para no interrumpir inmediatamente.
    setTimeout(abrirFallback, 200);
  }

  // Mostrar confirmación al usuario (texto pedido)
  alert("Tu mensaje ha sido enviado, nos pondremos en contacto cuanto antes.");

  // Limpiar formulario
  if (form) form.reset();
}
