"use client";
import { useRef } from "react";
export function DeleteButton({ label = "Delete", message = "Delete this item? This cannot be undone." }: { label?: string; message?: string }) { const button = useRef<HTMLButtonElement>(null); return <button ref={button} type="submit" onClick={(e) => { if (!window.confirm(message)) e.preventDefault(); }} className="font-bold text-red-700">{label}</button>; }
