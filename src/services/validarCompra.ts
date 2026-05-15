interface ValidateData {

  name: string;

  phone: string;

  email: string;

  receipt: File | null;
}

export function validarCompra({

  name,
  phone,
  email,
  receipt

}: ValidateData) {

  // NOMBRE

  const cleanName =
    name.trim();

  if (!cleanName) {

    return "⚠️ Ingresa tu nombre";
  }

  if (cleanName.length < 5) {

    return "⚠️ Ingresa nombre y apellido";
  }

  const nameRegex =
    /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;

  if (!nameRegex.test(cleanName)) {

    return "⚠️ El nombre solo puede contener letras";
  }

  // TELÉFONO COLOMBIA

  const cleanPhone =
    phone.replace(/\s/g, "");

  const phoneRegex =
    /^3\d{9}$/;

  if (!phoneRegex.test(cleanPhone)) {

    return "⚠️ Ingresa un número colombiano válido";
  }

  // EMAIL

  const cleanEmail =
    email.trim().toLowerCase();

  const emailRegex =
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(cleanEmail)) {

    return "⚠️ Ingresa un correo válido";
  }

  // COMPROBANTE

  if (!receipt) {

    return "⚠️ Debes subir el comprobante";
  }

  // VALIDAR IMAGEN

  const allowedTypes = [

    "image/jpeg",
    "image/png",
    "image/webp"

  ];

  if (
    !allowedTypes.includes(
      receipt.type
    )
  ) {

    return "⚠️ El comprobante debe ser JPG, PNG o WEBP";
  }

  // VALIDAR PESO

  const maxSize =
    5 * 1024 * 1024;

  if (receipt.size > maxSize) {

    return "⚠️ La imagen supera 5MB";
  }

  return null;
}