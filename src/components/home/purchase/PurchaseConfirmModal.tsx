"use client";

import "./PurchaseConfirmModal.css";

import {
  User,
  Mail,
  Smartphone,
  Ticket,
  Building2,
  ImageIcon,
  AlertTriangle,
  ShieldCheck
} from "lucide-react";

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

      <div className="purchase-header">

        <h3 className="purchase-final-title">
          <ShieldCheck size={24} />
          Finalizar compra
        </h3>

        <p className="purchase-subtitle">
          Revisa cuidadosamente la información antes de confirmar.
        </p>

      </div>

      <div className="purchase-final-info">

        <div className="purchase-row">
          <div className="purchase-label">
            <User size={18} />
            <span>Nombre</span>
          </div>

          <strong>{name}</strong>
        </div>

        <div className="purchase-row">
          <div className="purchase-label">
            <Mail size={18} />
            <span>Correo</span>
          </div>

          <strong>{email}</strong>
        </div>

        <div className="purchase-row">
          <div className="purchase-label">
            <Smartphone size={18} />
            <span>WhatsApp</span>
          </div>

          <strong>{phone}</strong>
        </div>

        <div className="purchase-row">
          <div className="purchase-label">
            <Ticket size={18} />
            <span>Cantidad</span>
          </div>

          <strong>
            {amount} números
          </strong>
        </div>

        <div className="purchase-total">

          <span>Total a pagar</span>

          <strong>
            $
            {total.toLocaleString(
              "es-CO"
            )}
          </strong>

        </div>

        <div className="purchase-row">

          <div className="purchase-label">
            <Building2 size={18} />
            <span>Método</span>
          </div>

          <div className="payment-badge">
            {method.toUpperCase()}
          </div>

        </div>

        {receipt && (

          <div className="purchase-proof-box">

            <div className="purchase-proof-title">

              <ImageIcon size={18} />

              <span>
                Comprobante cargado
              </span>

            </div>

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

          <AlertTriangle size={18} />

          <div>

            <strong>
              Verifica la información
            </strong>

            <p>
              Una vez validemos tu pago,
              tus números serán asignados
              automáticamente.
            </p>

          </div>

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
          <ShieldCheck size={18} />
          Confirmar compra segura
        </button>

      </div>

    </div>
  );
}