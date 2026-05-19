import { supabase }
from "@/lib/supabase";

export async function
obtenerDisponibles() {

  const { count, error } =

    await supabase

      .from("boletos")

      .select("*", {

        count: "exact",

        head: true

      })

      .eq(
        "estado",
        "disponible"
      );

  if (error) {

    console.error(error);

    return 0;

  }

  return count || 0;

}