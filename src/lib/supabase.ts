import { createClient } from "@supabase/supabase-js";

if (!supabaseUrl || !supabaseKey) {
  throw new Error("❌ Supabase URL y Key son requeridos");
}

export const supabase = createClient(supabaseUrl, supabaseKey);
