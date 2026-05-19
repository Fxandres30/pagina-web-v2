interface ValidateAmountProps {

  selectedAmount: number;

  minAmount: number;

  maxAmount: number;

  availableNumbers: number;

}

export function validarCantidad({

  selectedAmount,

  minAmount,

  maxAmount,

  availableNumbers

}: ValidateAmountProps) {

  // 🔥 SIN DISPONIBLES

  if (availableNumbers <= 0) {

    return "⚠️ Todos los números fueron vendidos";

  }

  // 🔥 SIN CANTIDAD

  if (selectedAmount <= 0) {

    return "⚠️ Selecciona una cantidad";

  }

  // 🔥 MÁS DE LOS DISPONIBLES

  if (selectedAmount > availableNumbers) {

    return `⚠️ Solo quedan ${availableNumbers} números disponibles`;

  }

  // 🔥 SI QUEDAN MENOS
  // QUE LA COMPRA MÍNIMA

  if (availableNumbers < minAmount) {

    // ✅ PERMITIR COMPRAR
    // LO QUE QUEDE

    if (
      selectedAmount >
      availableNumbers
    ) {

      return `⚠️ Solo quedan ${availableNumbers} números disponibles`;

    }

  }

  // 🔥 VALIDAR MÍNIMO NORMAL

  else if (
    selectedAmount < minAmount
  ) {

    return `⚠️ La compra mínima es de ${minAmount}`;

  }

  // 🔥 VALIDAR MÁXIMO

  if (selectedAmount > maxAmount) {

    return `⚠️ Máximo ${maxAmount} números`;

  }

  return null;

}