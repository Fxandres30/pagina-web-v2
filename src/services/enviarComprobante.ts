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
    "total",
    data.total
  );

  formData.append(
  "cantidad",
  data.cantidad
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