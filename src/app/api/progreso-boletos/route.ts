// app/api/progreso-boletos/route.ts

import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl =
  process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";

const supabaseAnonKey =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";

export async function GET() {

  try {

    if (
      !supabaseUrl ||
      !supabaseAnonKey
    ) {

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

    const supabase =
      createClient(
        supabaseUrl,
        supabaseAnonKey
      );

    const [
      totalResult,
      vendidosResult,
      disponiblesResult,
    ] = await Promise.all([

      supabase
        .from("boletos")
        .select("*", {
          count: "exact",
          head: true,
        }),

      supabase
        .from("boletos")
        .select("*", {
          count: "exact",
          head: true,
        })
        .eq(
          "estado",
          "vendido"
        ),

      supabase
        .from("boletos")
        .select("*", {
          count: "exact",
          head: true,
        })
        .eq(
          "estado",
          "disponible"
        ),

    ]);

    if (
      totalResult.error ||
      vendidosResult.error ||
      disponiblesResult.error
    ) {

      console.error(
        "ERROR PROGRESO:",
        {
          total:
            totalResult.error,
          vendidos:
            vendidosResult.error,
          disponibles:
            disponiblesResult.error,
        }
      );

      return NextResponse.json(
        {
          error:
            "Error obteniendo estadísticas",
        },
        {
          status: 500,
        }
      );

    }

    const totalBoletos =
      totalResult.count ?? 0;

    const boletosVendidos =
      vendidosResult.count ?? 0;

    const boletosDisponibles =
      disponiblesResult.count ?? 0;

    let porcentaje = 0;

    if (
      totalBoletos > 0
    ) {

      porcentaje =
        Number(
          (
            (
              boletosVendidos /
              totalBoletos
            ) * 100
          ).toFixed(2)
        );

    }

    if (
      boletosDisponibles === 0 &&
      totalBoletos > 0
    ) {

      porcentaje = 100;

    }

    return NextResponse.json({

      porcentaje,

      boletosVendidos,

      boletosDisponibles,

      totalBoletos,

    });

  } catch (error) {

    console.error(
      "ERROR API PROGRESO:",
      error
    );

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