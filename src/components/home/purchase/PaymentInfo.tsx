import {
  Wallet,
  Building2,
  Copy
} from "lucide-react";

interface Props {
  method: string;
  copyText: (text: string) => void;
}

export default function PaymentInfo({
  method,
  copyText
}: Props) {

  return (

    <div className="payment-info">

      {method === "nequi" && (

        <>
          <strong className="payment-title">
            <Wallet size={18} />
            Nequi
          </strong>

          <span className="payment-number">
            3014123951
          </span>

          <small>
            Titular: Andrés Mercado
          </small>

          <button
            type="button"
            className="copy-button"
            onClick={() => copyText("3014123951")}
          >
            <Copy size={16} />
            Copiar número
          </button>

          <p className="payment-note">
            Después de realizar el pago,
            envía el comprobante para validar
            tu participación.
          </p>
        </>

      )}

      {method === "bancolombia" && (

        <>
          <strong className="payment-title">
            <Building2 size={18} />
            Bancolombia
          </strong>

          <span className="payment-number">
            91299062380
          </span>

          <small>
            Cuenta de Ahorros
          </small>

          <small>
            Titular: Andrés Mercado
          </small>

          <button
            type="button"
            className="copy-button"
            onClick={() => copyText("91299062380")}
          >
            <Copy size={16} />
            Copiar cuenta
          </button>

          <p className="payment-note">
            Después de realizar el pago,
            envía el comprobante para validar
            tu participación.
          </p>

        </>

      )}

    </div>

  );
}