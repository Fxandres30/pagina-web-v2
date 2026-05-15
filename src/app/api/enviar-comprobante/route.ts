import { NextResponse }
from "next/server";

export async function POST(
  req: Request
) {

  try {

    const formData =
      await req.formData();

    const nombre =
      formData.get("nombre");

    const telefono =
      formData.get("telefono");

    const total =
      formData.get("total");

    const numeros =
      formData.get("numeros");

    const comprobante =
      formData.get("comprobante");

    console.log({

      nombre,

      telefono,

      total,

      numeros,

      comprobante,

    });

    return NextResponse.json({

      success: true,

    });

  } catch (error) {

    return NextResponse.json(
      {
        error:
          "Error interno",
      },
      {
        status: 500,
      }
    );

  }

}