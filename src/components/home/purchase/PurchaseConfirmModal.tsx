"use client";

interface Props {
  open: boolean;
  onBack: () => void;
  onConfirm: () => void;

  name: string;
  email: string;
  phone: string;
  amount: number;
  total: number;
  method: string;

  receipt: File | null;
}

export default function PurchaseConfirmModal({
  open,
  onBack,
  onConfirm,
  name,
  email,
  phone,
  amount,
  total,
  method,
  receipt
}: Props) {

if (!open) return null;

return (

<div className="purchase-final-step">

  <h3 className="purchase-final-title">
    📋 Verifica tu compra
  </h3>

  <div className="purchase-final-info">

    <div className="purchase-row">
      <span>👤 Nombre</span>
      <strong>{name}</strong>
    </div>

    <div className="purchase-row">
  <span>📧 Correo</span>
  <strong>{email}</strong>
</div>

    <div className="purchase-row">
      <span>📱 WhatsApp</span>
      <strong>{phone}</strong>
    </div>

    <div className="purchase-row">
      <span>🎟️ Cantidad</span>
      <strong>
        {amount} números
      </strong>
    </div>

    <div className="purchase-row">
      <span>💰 Total</span>
      <strong>
        $
        {total.toLocaleString(
          "es-CO"
        )}
      </strong>
    </div>

    <div className="purchase-row">
      <span>🏦 Método</span>
      <strong>
        {method}
      </strong>
    </div>

    {receipt && (

      <div className="purchase-proof-box">

        <h4>
          📷 Comprobante
        </h4>

        <img
          src={URL.createObjectURL(
            receipt
          )}
          alt="Comprobante"
          className="purchase-proof-preview"
        />

      </div>

    )}

    <div className="purchase-warning">

      ⚠️ Verifica que toda la
      información sea correcta
      antes de confirmar la compra.

    </div>

  </div>

  <div className="purchase-final-actions">

    <button
      type="button"
      className="purchase-back-btn"
      onClick={onBack}
    >
      Editar
    </button>

    <button
      type="button"
      className="purchase-confirm-btn"
      onClick={onConfirm}
    >
      ✅ Confirmar compra
    </button>

  </div>

</div>

);

}
