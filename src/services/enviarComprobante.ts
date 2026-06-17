export async function enviarComprobante(
  data: any
) {

  const formData =
    new FormData();

  formData.append(
    "nombre",
    data.nombre
  );

  formData.append(
    "telefono",
    data.telefono
  );

  formData.append(
    "correo",
    data.correo
  );

  formData.append(
    "metodo",
    data.metodo
  );

  formData.append(
    "total",
    String(data.total)
  );

  formData.append(
    "cantidad",
    String(data.cantidad)
  );

  formData.append(
    "comprobante",
    data.comprobante
  );

  const response =
    await fetch(
      "/api/enviar-comprobante",
      {
        method: "POST",
        body: formData,
      }
    );

  if (!response.ok) {

    throw new Error(
      "Error enviando comprobante"
    );

  }

  return response.json();

}