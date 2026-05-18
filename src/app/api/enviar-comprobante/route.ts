import { NextResponse }
from "next/server";

export async function POST(
  req: Request
) {

  try {

    const formData =
      await req.formData();

    const nombre =
      formData.get("nombre") as string;

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

    // 🔥 ENVIAR AL BOT
    const responseBot =
      await fetch(

        "http://localhost:3001/enviar-comprobante",

        {

          method: "POST",

          headers: {

            "Content-Type":
              "application/json"

          },

          body: JSON.stringify({

            nombre,
            telefono,
            total,
            cantidad,

            imagen:
              buffer.toString(
                "base64"
              )

          })

        }

      );

    // 🔥 VER RESPUESTA BOT
    const dataBot =
      await responseBot.text();

    console.log(
      "RESPUESTA BOT:",
      dataBot
    );

    // 🔥 SI FALLA
    if (!responseBot.ok) {

      throw new Error(
        "Bot respondió error"
      );

    }

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