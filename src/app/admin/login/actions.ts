"use server";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
export async function login(formData: FormData) { const supabase = await createClient(); const email = String(formData.get("email") || ""); const password = String(formData.get("password") || ""); const next = String(formData.get("next") || "/admin"); const { data, error } = await supabase.auth.signInWithPassword({ email, password }); if (error || !data.user) redirect(`/admin/login?error=${encodeURIComponent(error?.message || "Login failed")}`); const { data: admin } = await supabase.from("admin_users").select("user_id").eq("user_id", data.user.id).maybeSingle(); if (!admin) { await supabase.auth.signOut(); redirect("/admin/login?error=This+account+is+not+an+approved+admin"); } redirect(next.startsWith("/admin") ? next : "/admin"); }
export async function logout() { const supabase = await createClient(); await supabase.auth.signOut(); redirect("/admin/login"); }
