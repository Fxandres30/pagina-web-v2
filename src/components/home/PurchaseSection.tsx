"use client";

import {
  useEffect,
  useState
} from "react";

import { supabase }
from "@/lib/supabase";

import PurchaseModal
from "@/components/home/PurchaseModal";

import "@/styles/PurchaseSection.css";

interface ActiveRaffle {

  precio: number;

  cantidad_minima: number;

  cantidad_maxima: number;

  paquetes: number[];
}

export default function PurchaseSection() {

  const [price, setPrice] =
    useState(0);

  const [minAmount, setMinAmount] =
    useState(1);

  const [maxAmount, setMaxAmount] =
    useState(100);

  const [packages, setPackages] =
    useState<number[]>([]);

  const [selectedAmount, setSelectedAmount] =
    useState(0);

  const [showModal, setShowModal] =
    useState(false);

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
        Number(
          data.cantidad_minima || 1
        )
      );

      setMaxAmount(
        Number(
          data.cantidad_maxima || 100
        )
      );

      setPackages(
        Array.isArray(data.paquetes)
          ? data.paquetes
          : [5,10,20,50]
      );
    };

    fetchRaffle();

  }, []);

  // 🔥 TOTAL

  const total =
    selectedAmount * price;

  // 🔥 VALIDAR CUSTOM

  const handleCustomAmount = (
    value: number
  ) => {

    if (value > maxAmount) {

      setSelectedAmount(
        maxAmount
      );

      return;
    }

    setSelectedAmount(value);
  };

  // 🔥 VALIDAR MODAL

  const handleOpenModal = () => {

    if (
      selectedAmount < minAmount
    ) {

      alert(
        `La compra mínima es de ${minAmount} números`
      );

      return;
    }

    setShowModal(true);
  };

  return (

    <section className="purchase-section">

      <div className="purchase-box">

        {/* TITLE */}

        <h2 className="purchase-title">

          🎟️ Compra tus números

        </h2>

        <p className="purchase-description">

          Selecciona un paquete
          o elige tu cantidad.

        </p>

        {/* INFO */}

        <div className="purchase-info">

          <span>

            🔥 Compra mínima:
            {" "}
            <strong>
              {minAmount}
            </strong>

          </span>

          <span>

            🎟️ Máximo:
            {" "}
            <strong>
              {maxAmount}
            </strong>

          </span>

        </div>

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

                // 🔥 TOGGLE

                if (
                  selectedAmount === amount
                ) {

                  setSelectedAmount(0);

                  return;
                }

                setSelectedAmount(amount);
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
            onChange={(e) =>
              handleCustomAmount(
                Number(e.target.value)
              )
            }
          />

        </div>

      </div>

      {/* STICKY */}

      {selectedAmount > 0 && (

        <div className="purchase-sticky">

          <div>

            <span>

              🎟️ {selectedAmount} números

            </span>

            <strong>

              $
              {total.toLocaleString("es-CO")}

            </strong>

          </div>

          <button
            onClick={handleOpenModal}
          >

            Ir a pagar

          </button>

        </div>

      )}

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