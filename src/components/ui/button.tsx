import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

const buttonVariants = cva("focus-ring inline-flex items-center justify-center rounded-full font-bold transition-colors disabled:pointer-events-none disabled:opacity-50", { variants: { variant: { default: "bg-[#287a55] text-white hover:bg-[#1e6243]", outline: "border border-[#aac5b5] bg-white hover:bg-[#eff7f1]", ghost: "hover:bg-[#eff7f1]" }, size: { default: "h-11 px-6", sm: "h-9 px-4 text-sm", lg: "h-13 px-8" } }, defaultVariants: { variant: "default", size: "default" } });
export function Button({ className, variant, size, asChild = false, ...props }: ButtonHTMLAttributes<HTMLButtonElement> & VariantProps<typeof buttonVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "button"; return <Comp className={cn(buttonVariants({ variant, size }), className)} {...props} />;
}
