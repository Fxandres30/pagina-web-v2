"use client";

import { useState } from "react";

import "@/styles/PurchaseModal.css";

import { enviarComprobante } from "@/services/enviarComprobante";
import { validarCompra } from "@/services/validarCompra";

import PurchaseForm from "./purchase/PurchaseForm";
import PaymentInfo from "./purchase/PaymentInfo";
import ReceiptUpload from "./purchase/ReceiptUpload";

import {
  X,
  Ticket,
  Wallet,
  Building2,
  Rocket
} from "lucide-react";

interface Props {
  open: boolean;
  onClose: () => void;
  amount: number;
  total: number;
}

export default function PurchaseModal({
  open,
  onClose,
  amount,
  total
}: Props) {

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [method, setMethod] = useState("nequi");
  const [receipt, setReceipt] = useState<File | null>(null);

  async function handleEnviarComprobante() {

    const error = validarCompra({
      name,
      phone,
      email,
      receipt
    });

    if (error) {
      return alert(error);
    }

    try {

      await enviarComprobante({
        nombre: name,
        telefono: phone,
        correo: email,
        metodo: method,
        total,
        cantidad: amount,
        comprobante: receipt,
      });

      alert("✅ Comprobante enviado");

    } catch (error) {

      console.error(error);
      alert("❌ Error enviando");
    }
  }

  const copyText = async (text: string) => {

    try {

      await navigator.clipboard.writeText(text);
      alert("✅ Copiado");

    } catch {

      alert("❌ Error al copiar");
    }
  };

  if (!open) return null;

  return (

    <div className="purchase-modal-overlay">

      <div className="purchase-modal">

        <button
          className="purchase-close"
          onClick={onClose}
        >
          <X size={20} />
        </button>

        <h2 className="purchase-title">
          <Ticket size={24} />
          Finalizar compra
        </h2>

        <p>
          Completa tus datos para continuar.
        </p>

        <PurchaseForm
          name={name}
          setName={setName}
          phone={phone}
          setPhone={setPhone}
          email={email}
          setEmail={setEmail}
        />

        <div className="purchase-summary">

          <span className="summary-numbers">
            <Ticket size={16} />
            {amount} números
          </span>

          <strong>
            ${total.toLocaleString("es-CO")}
          </strong>

        </div>

        <div className="payment-methods">

          <button
            type="button"
            className={`payment-method ${method === "nequi" ? "active" : ""}`}
            onClick={() => setMethod("nequi")}
          >
            <Wallet size={18} />
            Nequi
          </button>

          <button
            type="button"
            className={`payment-method ${method === "bancolombia" ? "active" : ""}`}
            onClick={() => setMethod("bancolombia")}
          >
            <Building2 size={18} />
            Bancolombia
          </button>

        </div>

        <PaymentInfo
          method={method}
          copyText={copyText}
        />

        <ReceiptUpload
          receipt={receipt}
          setReceipt={setReceipt}
        />

        <button
          className="purchase-pay-button"
          onClick={handleEnviarComprobante}
        >
          <Rocket size={18} />
          Enviar comprobante
        </button>

      </div>

    </div>
  );
}