"use client";

import {
  Ticket,
  Flame,
  Hash,
  Loader2,
  CreditCard,
  ShoppingCart
} from "lucide-react";

import { useEffect, useState } from "react";

import { supabase } from "@/lib/supabase";

import {
  validarCantidad
} from "@/services/validarCantidad";

import PurchaseModal from "@/components/home/PurchaseModal";




export default function PurchaseSection() {

  
  const [price, setPrice] = useState(0);

  const [minAmount, setMinAmount] = useState(1);

  const [maxAmount, setMaxAmount] = useState(100);

  const [packages, setPackages] =
    useState<number[]>([]);

  const [selectedAmount, setSelectedAmount] =
    useState(0);

  const [showModal, setShowModal] =
    useState(false);

  const [loading, setLoading] =
  useState(false);

  const [
    amountError,
    setAmountError
  ] = useState("");

  const [
    availableNumbers,
    setAvailableNumbers
  ] = useState(0);

  // 🔥 CARGAR EVENTO

  useEffect(() => {

    const fetchRaffle = async () => {

      const { data, error } =
        await supabase
          .from("sorteos")
          .select(`
            precio,
            cantidad_minima,
            cantidad_maxima,
            paquetes
          `)
          .eq("estado", "activo")
          .limit(1)
          .maybeSingle();

      if (error) {

        console.error(error);

        return;

      }

      if (!data) return;

      setPrice(
        Number(data.precio || 0)
      );

      setMinAmount(
        Number(data.cantidad_minima || 1)
      );

      setMaxAmount(
        Number(data.cantidad_maxima || 100)
      );

      setPackages(

        Array.isArray(data.paquetes)

          ? data.paquetes

          : [5, 10, 20, 50]

      );

    };

    fetchRaffle();

  }, []);

  // 🔥 TOTAL

  const total =
    selectedAmount * price;

  // 🔥 VALIDAR TIEMPO REAL

  const validarEnTiempoReal =
    async (
      cantidad: number
    ) => {

      try {

        const response =
          await fetch(
            "/api/progreso-boletos"
          );

        const data =
          await response.json();

        const disponibles =
          data.boletosDisponibles || 0;

        setAvailableNumbers(
          disponibles
        );

        const error =
          validarCantidad({

            selectedAmount:
              cantidad,

            minAmount,

            maxAmount,

            availableNumbers:
              disponibles

          });

        setAmountError(
          error || ""
        );

      }

      catch (error) {

        console.error(error);

      }

    };

  // 🔥 INPUT CUSTOM

const handleCustomAmount = (
  value: number
) => {

  // 🔥 EVITAR NEGATIVOS

  if (value < 0) {

    value = 0;

  }

  // 🔥 LIMITAR MÁXIMO

  if (value > maxAmount) {

    value = maxAmount;

  }

  setSelectedAmount(value);

  validarEnTiempoReal(value);

};

  // 🔥 VALIDAR MODAL

  const handleOpenModal =
  async () => {

    try {

      setLoading(true);

      const response =
        await fetch(
          "/api/progreso-boletos"
        );

      const data =
        await response.json();

      const disponibles =
        data.boletosDisponibles || 0;

      const error =
        validarCantidad({

          selectedAmount,

          minAmount,

          maxAmount,

          availableNumbers:
            disponibles

        });

      if (error) {

        alert(error);

        return;

      }

      setShowModal(true);

    }

    catch (error) {

      console.error(error);

      alert(
        "❌ Error verificando disponibilidad"
      );

    }

    finally {

      setLoading(false);

    }

  };

  return (

    <section className="purchase-section">

      <div className="purchase-box">

        {/* TITLE */}

        <h2 className="purchase-title">

  <ShoppingCart size={28} />

  Compra tus números

</h2>

        <p className="purchase-description">

          Selecciona un paquete
          o elige tu cantidad.

        </p>

        {/* INFO */}

        <div className="purchase-info">

<span>
          <Flame size={15} />
Compra mínima:

            <strong>
              {minAmount}
            </strong>

          </span>

          <span>

            <Hash size={15} />
Máximo:

            <strong>
              {maxAmount}
            </strong>

          </span>

        </div>

        {/* DISPONIBLES */}

        {/*<p className="purchase-available">

          🔥 {availableNumbers}
          números disponibles

        </p>*/}

        {/* PACKAGES */}

        <div className="purchase-packages">

          {packages.map((amount) => (

            <button

              key={amount}

              className={`
                purchase-card
                ${
                  selectedAmount === amount
                    ? "active"
                    : ""
                }
              `}

              onClick={() => {

                if (
                  selectedAmount === amount
                ) {

                  setSelectedAmount(0);

                  setAmountError("");

                  return;

                }

                setSelectedAmount(amount);

                validarEnTiempoReal(
                  amount
                );

              }}

            >

              <span>
                {amount}
              </span>

              <small>
                números
              </small>

              <strong>

                $
                {(amount * price)
                  .toLocaleString("es-CO")}

              </strong>

            </button>

          ))}

        </div>

        {/* CUSTOM */}

        <div className="purchase-custom">

          <label>

            Cantidad personalizada

          </label>

          <input

            type="number"

            min={minAmount}

            max={maxAmount}

            placeholder={`Mínimo ${minAmount}`}

            value={
              selectedAmount || ""
            }

            onChange={(e) => {

  const value =
    Number(e.target.value);

  handleCustomAmount(value);

}}

          />

          {

            amountError && (

              <p className="purchase-error">

                {amountError}

              </p>

            )

          }

        </div>

      </div>

      {/* STICKY */}

      {

        selectedAmount > 0 && (

          <div className="purchase-sticky">

            <div>

              <span>

                <span>

  <Ticket size={15} />

  {selectedAmount} números

</span>

              </span>

              <strong>

                $
                {total.toLocaleString(
                  "es-CO"
                )}

              </strong>

            </div>

            <button

  onClick={handleOpenModal}

  disabled={
    !!amountError ||
    loading
  }

>

  {
  loading ? (

    <>

      <Loader2
        size={16}
        className="spin"
      />

      Preparando pago...

    </>

  ) : (

    <>

      <CreditCard size={16} />

      Ir a pagar

    </>

  )
}

</button>

          </div>

        )

      }

      {/* MODAL */}

      <PurchaseModal

        open={showModal}

        onClose={() =>
          setShowModal(false)
        }

        amount={selectedAmount}

        total={total}

      />

    </section>

  );

}