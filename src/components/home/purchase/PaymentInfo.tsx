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

          <span>3014123951</span>

          <small>
            Andres Mercado
          </small>

          <button
            type="button"
            className="copy-button"
            onClick={() => copyText("3014123951")}
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
            Ahorros: 223423235
          </span>

          <small>
            Andres Mercado
          </small>

          <button
            type="button"
            className="copy-button"
            onClick={() => copyText("123456789")}
          >
            <Copy size={16} />
            Copiar cuenta
          </button>
        </>

      )}

    </div>
  );
}