import type { InputHTMLAttributes } from "react";
import { cn } from "@/lib/utils";
export function Input({ className, ...props }: InputHTMLAttributes<HTMLInputElement>) { return <input className={cn("focus-ring h-11 w-full rounded-lg border border-[#cbd9cf] bg-white px-3", className)} {...props} />; }
