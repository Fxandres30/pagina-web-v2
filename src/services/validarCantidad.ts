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

  if (availableNumbers <= 0) {
    return "⚠️ Todos los números fueron vendidos";
  }

  if (selectedAmount <= 0) {
    return "⚠️ Selecciona una cantidad";
  }

  if (selectedAmount > availableNumbers) {
    return `⚠️ Solo quedan ${availableNumbers} números disponibles`;
  }

  // 🔥 SI QUEDAN MENOS DEL MÍNIMO

  if (
    availableNumbers >= minAmount &&
    selectedAmount < minAmount
  ) {
    return `⚠️ La compra mínima es de ${minAmount}`;
  }

  if (selectedAmount > maxAmount) {
    return `⚠️ Máximo ${maxAmount} números`;
  }

  return null;
}