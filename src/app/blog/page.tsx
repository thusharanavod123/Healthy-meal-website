import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";

export const metadata: Metadata = {
  title: "Healthy Eating Guides",
  description: "Practical FreshTable guides for balanced meals, easier meal prep, and everyday healthy cooking.",
  alternates: { canonical: "/blog" },
};

export default function BlogPage() {
  return (
    <div className="container-site py-16">
      <p className="eyebrow">From the FreshTable kitchen</p>
      <h1 className="display mt-3 text-5xl font-bold sm:text-6xl">Healthy eating guides</h1>
      <p className="mt-5 max-w-2xl text-lg leading-8 text-[#5d7168]">
        Clear, practical ideas that make planning, cooking, and eating well feel easier.
      </p>

      <article className="mt-12 grid max-w-5xl gap-7 border-t border-[#dce5dc] pt-8 md:grid-cols-[minmax(280px,420px)_1fr] md:items-center">
        <Link href="/blog/how-to-build-a-balanced-meal" className="focus-ring block overflow-hidden rounded-lg bg-[#edf3ed]">
          <Image
            src="/images/lemon-herb-chicken-bowl.png"
            alt="Balanced bowl with chicken, quinoa, and colorful vegetables"
            width={720}
            height={450}
            priority
            className="aspect-[8/5] w-full object-cover transition duration-500 hover:scale-[1.03]"
          />
        </Link>
        <div>
          <p className="eyebrow">Healthy eating basics</p>
          <h2 className="display mt-3 text-3xl font-bold sm:text-4xl">
            <Link className="hover:text-[#287a55]" href="/blog/how-to-build-a-balanced-meal">
              How to Build a Balanced Meal Without Overthinking It
            </Link>
          </h2>
          <p className="mt-4 leading-7 text-[#5d7168]">
            A flexible, everyday framework for combining vegetables, protein, grains, and satisfying flavor.
          </p>
          <div className="mt-5 flex flex-wrap items-center gap-4 text-sm font-bold text-[#61766c]">
            <span>September 9, 2026</span>
            <span className="flex items-center gap-1.5"><Clock size={16} /> 6 min read</span>
          </div>
          <Link className="mt-6 inline-flex items-center gap-2 font-bold text-[#287a55] hover:underline" href="/blog/how-to-build-a-balanced-meal">
            Read the guide <ArrowRight size={17} />
          </Link>
        </div>
      </article>
    </div>
  );
}
