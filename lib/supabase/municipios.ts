import { createClient } from "./server";

export async function getMunicipios() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("municipios")
    .select("*")
    .order("nome");

  if (error) {
    console.error(error);
    return [];
  }

  return data;
}