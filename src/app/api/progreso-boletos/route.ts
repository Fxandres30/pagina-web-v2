// app/api/progreso-boletos/route.ts

import { NextResponse } from "next/server";

import { createClient } from "@supabase/supabase-js";

// VARIABLES
const supabaseUrl =
  process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";

const supabaseAnonKey =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";

// CLIENTE
const supabase = createClient(
  supabaseUrl,
  supabaseAnonKey
);

export async function GET() {

  try {

    // VALIDAR VARIABLES
    if (!supabaseUrl || !supabaseAnonKey) {

      return NextResponse.json(
        {
          error:
            "Variables de entorno faltantes",
        },
        {
          status: 500,
        }
      );

    }

    // TOTAL BOLETOS
    const {
      count: totalBoletos,
      error: totalError,
    } = await supabase
      .from("boletos")
      .select("*", {
        count: "exact",
        head: true,
      });

    if (totalError) {

      return NextResponse.json(
        {
          error:
            "Error contando boletos",
        },
        {
          status: 500,
        }
      );

    }

    // BOLETOS VENDIDOS
    const {
      count: boletosVendidos,
      error: vendidosError,
    } = await supabase
      .from("boletos")
      .select("*", {
        count: "exact",
        head: true,
      })
      .eq("estado", "vendido");

    if (vendidosError) {

      return NextResponse.json(
        {
          error:
            "Error contando vendidos",
        },
        {
          status: 500,
        }
      );

    }

    // BOLETOS DISPONIBLES
    const {
      count: boletosDisponibles,
      error: disponiblesError,
    } = await supabase
      .from("boletos")
      .select("*", {
        count: "exact",
        head: true,
      })
      .eq("estado", "disponible");

    if (disponiblesError) {

      return NextResponse.json(
        {
          error:
            "Error contando disponibles",
        },
        {
          status: 500,
        }
      );

    }

    // CALCULAR %
    let porcentaje =
      (
        (
          (boletosVendidos ?? 0) /
          (totalBoletos ?? 1)
        ) * 100
      );

    // SI YA NO HAY DISPONIBLES
    if (
      boletosDisponibles === 0
    ) {

      porcentaje = 100;

    }

    porcentaje =
      Number(
        porcentaje.toFixed(2)
      );

    // RESPUESTA
    return NextResponse.json({

      porcentaje,

      boletosVendidos:
        boletosVendidos ?? 0,

      boletosDisponibles:
        boletosDisponibles ?? 0,

      totalBoletos:
        totalBoletos ?? 0,

    });

  } catch (error) {

    console.error(error);

    return NextResponse.json(
      {
        error:
          "Error interno del servidor",
      },
      {
        status: 500,
      }
    );

  }

}