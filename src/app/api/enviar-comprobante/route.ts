import { NextResponse }
from "next/server";

import { supabase }
from "@/lib/supabase";

export async function POST(
  req: Request
) {

  try {

    const formData =
      await req.formData();

    const nombre =
      formData.get("nombre") as string;

      const correo =
  formData.get("correo") as string;

const metodo =
  formData.get("metodo") as string;

    const telefono =
      formData.get("telefono") as string;

    const total =
      formData.get("total") as string;

    const cantidad =
      formData.get("cantidad") as string;

    const comprobante =
      formData.get("comprobante") as File;

    // 🔥 convertir imagen
    const bytes =
      await comprobante.arrayBuffer();

    const buffer =
      Buffer.from(bytes);

    console.log({

      nombre,
      telefono,
      total,
      cantidad,
      comprobante

    });

    // 🔥 GUARDAR PEDIDO
    const {

      data,
      error

    } = await supabase

      .from("pedidos")

      .insert([{

        nombre,

        whatsapp:
          telefono,

        cantidad:
          Number(cantidad),

        total:
          Number(total),

        metodo_pago:
          "nequi",

        status:
          "pendiente"

      }])

      .select()

      .single();

    if (error) {

      console.log(error);

      throw new Error(
        "Error guardando pedido"
      );

    }

    // BOT DESACTIVADO TEMPORALMENTE
    // 🔥 ENVIAR AL BOT
    const responseBot =
      await fetch(

          "https://efaat.com/meta/enviar-comprobante",

        {

          method: "POST",

          headers: {

            "Content-Type":
              "application/json"

          },

          body: JSON.stringify({

  pedidoId: data.id,

  nombre,
  telefono,
  correo,
  metodo,

  total,
  cantidad,

  imagen:
    buffer.toString(
      "base64"
    )

})

        }

      );

    // 🔥 RESPUESTA BOT
    const dataBot =
      await responseBot.text();

    console.log(
      "RESPUESTA BOT:",
      dataBot
    );

    // 🔥 VALIDAR BOT
    if (!responseBot.ok) {

      throw new Error(
        "Bot respondió error"
      );

    }

    // 🔥 MARCAR MENSAJE ENVIADO
    await supabase

      .from("pedidos")

      .update({

        mensaje_recibido:
          true

      })

      .eq(
        "id",
        data.id
      );

    // 🔥 RESPUESTA FINAL
    return NextResponse.json({

      success: true

    });

  }

  catch (error: any) {

    console.log(
      "ERROR REAL:",
      error
    );

    return NextResponse.json(

      {

        error:
          error.message

      },

      {

        status: 500

      }

    );

  }

}