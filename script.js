const DESTINO = "kalmekaktoltekayotl@gmail.com"; // ← correo al que se enviarán los mensajes

function doPost(e) {
  try {
    // Leer datos del formulario (FormData)
    const datos = e.parameter;
    const nombre = (datos.nombre || "").trim();
    const telefono = (datos.telefono || "").trim();
    const mensaje = (datos.mensaje || "").trim();

    // Validar que haya datos
    if (!nombre || !telefono || !mensaje) {
      return ContentService
        .createTextOutput("ERROR: faltan campos")
        .setMimeType(ContentService.MimeType.TEXT);
    }

    // Crear correo
    const subject = `📩 Nuevo mensaje de ${nombre}`;
    const body = `Has recibido un nuevo mensaje desde el formulario de contacto:\n\n` +
                 `👤 Nombre: ${nombre}\n📞 Teléfono: ${telefono}\n\n📝 Mensaje:\n${mensaje}\n\n` +
                 `----------------------------------\nSitio web: remextta.com`;

    // Enviar correo
    MailApp.sendEmail({
      to: DESTINO,
      subject: subject,
      body: body,
    });

    // Responder al navegador
    return ContentService
      .createTextOutput("OK")
      .setMimeType(ContentService.MimeType.TEXT);

  } catch (error) {
    return ContentService
      .createTextOutput("ERROR: " + error)
      .setMimeType(ContentService.MimeType.TEXT);
  }
}
