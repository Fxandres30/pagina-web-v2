import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(req: Request) {
try {
const formData = await req.formData();


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

// VALIDACIONES

if (!nombre) {
  throw new Error("Nombre requerido");
}

if (!telefono) {
  throw new Error("Teléfono requerido");
}

if (!comprobante) {
  throw new Error("Comprobante requerido");
}

// SUBIR COMPROBANTE

const bytes =
  await comprobante.arrayBuffer();

const buffer =
  Buffer.from(bytes);

const fileName =
  `pedido_${Date.now()}_${comprobante.name}`;

const {
  data: uploadData,
  error: uploadError
} = await supabase.storage

  .from("comprobantes")

  .upload(
    fileName,
    buffer,
    {
      contentType:
        comprobante.type,
    }
  );

if (uploadError) {

  console.log(uploadError);

  throw new Error(
    "Error subiendo comprobante"
  );

}


const {
  data: publicUrlData
} = supabase.storage

  .from("comprobantes")

  .getPublicUrl(
    fileName
  );

const comprobanteUrl =
  publicUrlData.publicUrl;

console.log({
  nombre,
  correo,
  telefono,
  metodo,
  total,
  cantidad,
  comprobanteUrl
});

// GUARDAR PEDIDO

const {
  data,
  error
} = await supabase
  .from("pedidos")
  .insert([{

  nombre,

  whatsapp:
    telefono,

  correo,

  cantidad:
    Number(cantidad),

  total:
    Number(total),

  metodo_pago:
    metodo,

  comprobante_url:
    comprobanteUrl,

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

// ENVIAR AL BOT

const responseBot =
  await fetch(
    "https://efaat.com/enviar-comprobante",
    {
      method: "POST",

      headers: {
        "Content-Type":
          "application/json"
      },

      body: JSON.stringify({

  pedidoId:
    data.id,

  nombre,

  telefono,

  correo,

  metodo,

  total,

  cantidad,

  comprobanteUrl

})
    }
  );

console.log(
  "STATUS BOT:",
  responseBot.status
);

const dataBot =
  await responseBot.text();

console.log(
  "RESPUESTA BOT:",
  dataBot
);

if (!responseBot.ok) {
  throw new Error(
    `Bot respondió ${responseBot.status}: ${dataBot}`
  );
}

// MARCAR MENSAJE ENVIADO

await supabase
  .from("pedidos")
  .update({
    mensaje_recibido: true
  })
  .eq(
    "id",
    data.id
  );

return NextResponse.json({
  success: true,
  pedidoId: data.id,
  comprobanteUrl
});


} catch (error: any) {
console.log(
"ERROR REAL:",
error
);


return NextResponse.json(
  {
    success: false,
    error:
      error?.message ||
      "Error interno"
  },
  {
    status: 500
  }
);


}
}
