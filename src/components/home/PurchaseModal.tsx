"use client";

import { useState } from "react";

import "@/styles/PurchaseModal.css";

import { enviarComprobante }
from "@/services/enviarComprobante";

import {

  X,
  Ticket,
  User,
  Phone,
  Mail,
  Wallet,
  Building2,
  Copy,
  ImagePlus,
  Rocket,
  Check

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

  const [name, setName] =
    useState("");

  const [phone, setPhone] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [method, setMethod] =
    useState("nequi");

  const [receipt, setReceipt] =
    useState<File | null>(null);

  // ENVIAR COMPROBANTE

  async function handleEnviarComprobante() {

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

      alert(
        "✅ Comprobante enviado"
      );

    } catch (error) {

      console.error(error);

      alert(
        "❌ Error enviando"
      );
    }
  }

  // COPIAR

  const copyText = async (
    text: string
  ) => {

    try {

      await navigator
        .clipboard
        .writeText(text);

      alert("✅ Copiado");

    } catch {

      alert("❌ Error al copiar");
    }
  };

  if (!open) return null;

  return (

    <div className="purchase-modal-overlay">

      <div className="purchase-modal">

        {/* CLOSE */}

        <button
          className="purchase-close"
          onClick={onClose}
        >

          <X size={20} />

        </button>

        {/* TITLE */}

        <h2 className="purchase-title">

          <Ticket size={24} />

          Finalizar compra

        </h2>

        <p>

          Completa tus datos
          para continuar.

        </p>

        {/* FORM */}

        <div className="purchase-form">

          <div className="input-group">

            <User size={18} />

            <input
              type="text"
              placeholder="Nombre completo"
              value={name}
              onChange={(e) =>
                setName(e.target.value)
              }
            />

          </div>

          <div className="input-group">

            <Phone size={18} />

            <input
              type="tel"
              placeholder="Teléfono"
              value={phone}
              onChange={(e) =>
                setPhone(e.target.value)
              }
            />

          </div>

          <div className="input-group">

            <Mail size={18} />

            <input
              type="email"
              placeholder="Correo"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
            />

          </div>

        </div>

        {/* SUMMARY */}

        <div className="purchase-summary">

          <span className="summary-numbers">

            <Ticket size={16} />

            {amount} números

          </span>

          <strong>

            $
            {total.toLocaleString("es-CO")}

          </strong>

        </div>

        {/* METHODS */}

        <div className="payment-methods">

          <button
            type="button"
            className={`
              payment-method
              ${
                method === "nequi"
                  ? "active"
                  : ""
              }
            `}
            onClick={() =>
              setMethod("nequi")
            }
          >

            <Wallet size={18} />

            Nequi

          </button>

          <button
            type="button"
            className={`
              payment-method
              ${
                method === "bancolombia"
                  ? "active"
                  : ""
              }
            `}
            onClick={() =>
              setMethod("bancolombia")
            }
          >

            <Building2 size={18} />

            Bancolombia

          </button>

        </div>

        {/* PAYMENT INFO */}

        <div className="payment-info">

          {method === "nequi" && (

            <>

              <strong className="payment-title">

                <Wallet size={18} />

                Nequi

              </strong>

              <span>
                3014123951
              </span>

              <small>
                Andres Mercado
              </small>

              <button
                type="button"
                className="copy-button"
                onClick={() =>
                  copyText("3014123951")
                }
              >

                <Copy size={16} />

                Copiar número

              </button>

            </>

          )}

          {method === "bancolombia" && (

            <>

              <strong className="payment-title">

                <Building2 size={18} />

                Bancolombia

              </strong>

              <span>
                Ahorros: 123456789
              </span>

              <small>
                Andres Mercado
              </small>

              <button
                type="button"
                className="copy-button"
                onClick={() =>
                  copyText("123456789")
                }
              >

                <Copy size={16} />

                Copiar cuenta

              </button>

            </>

          )}

        </div>

        {/* RECEIPT */}

        <div className="receipt-upload">

          <label>

            <ImagePlus size={18} />

            Subir comprobante

          </label>

          <input
            type="file"
            accept="image/*"
            onChange={(e) =>
              setReceipt(
                e.target.files?.[0] || null
              )
            }
          />

          {receipt && (

            <small className="receipt-success">

              <Check size={14} />

              {receipt.name}

            </small>

          )}

        </div>

        {/* FINAL BUTTON */}

        <button
          className="purchase-pay-button"
          onClick={
            handleEnviarComprobante
          }
        >

          <Rocket size={18} />

          Enviar comprobante

        </button>

      </div>

    </div>
  );
}