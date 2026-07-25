import { createClient } from "./server";

export async function getUsuarios() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("profiles")
    .select(`
      id,
      nome,
      cargo,
      status,
      created_at
    `)
    .order("nome");

  if (error) {
    console.error(error);
    return [];
  }

  return data;
}