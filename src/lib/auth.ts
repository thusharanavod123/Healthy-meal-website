import { cache } from "react";
import { redirect } from "next/navigation";
import { createClient, hasSupabaseConfig } from "@/lib/supabase/server";
export const getAdmin = cache(async () => {
  if (!hasSupabaseConfig()) return null;
  const supabase = await createClient(); const { data: { user } } = await supabase.auth.getUser(); if (!user) return null;
  const { data } = await supabase.from("admin_users").select("user_id, display_name").eq("user_id", user.id).maybeSingle();
  return data ? { user, profile: data } : null;
});
export async function requireAdmin() { const admin = await getAdmin(); if (!admin) redirect("/admin/login"); return admin; }
