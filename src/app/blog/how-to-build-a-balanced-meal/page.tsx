import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { BookOpen, Clock } from "lucide-react";
import { getSiteUrl } from "@/lib/site-url";

const title = "How to Build a Balanced Meal Without Overthinking It";
const description = "Use this flexible, practical framework to build balanced everyday meals with vegetables, protein, grains, and satisfying flavor.";
const publishedAt = "2026-09-09";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/blog/how-to-build-a-balanced-meal" },
  openGraph: {
    type: "article",
    title,
    description,
    publishedTime: publishedAt,
    images: [{
      url: "/images/lemon-herb-chicken-bowl.png",
      width: 1584,
      height: 1024,
      alt: "Balanced bowl with chicken, quinoa, and colorful vegetables",
    }],
  },
};

export default function BalancedMealArticle() {
  const siteUrl = getSiteUrl();
  const articleUrl = `${siteUrl}/blog/how-to-build-a-balanced-meal`;
  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    datePublished: publishedAt,
    dateModified: publishedAt,
    author: { "@type": "Organization", name: "FreshTable", url: siteUrl },
    publisher: { "@id": `${siteUrl}/#organization` },
    image: `${siteUrl}/images/lemon-herb-chicken-bowl.png`,
    mainEntityOfPage: articleUrl,
  };

  return (
    <article>
      <header className="container-site max-w-4xl py-12 sm:py-16">
        <nav aria-label="Breadcrumb" className="text-xs font-bold text-[#6e8177]">
          <Link href="/">Home</Link> <span aria-hidden> / </span>
          <Link href="/blog">Guides</Link> <span aria-hidden> / </span>
          Balanced meals
        </nav>
        <p className="eyebrow mt-10">Healthy eating basics</p>
        <h1 className="display mt-4 text-5xl font-bold sm:text-6xl">{title}</h1>
        <p className="mt-6 max-w-3xl text-xl leading-8 text-[#526a5f]">
          A useful meal does not need perfect ratios or specialty ingredients. Start with a few flexible building blocks, then adjust them for your appetite, budget, culture, and routine.
        </p>
        <div className="mt-7 flex flex-wrap gap-x-5 gap-y-2 text-sm text-[#60746a]">
          <span>By <strong className="text-[#16352b]">FreshTable Editorial Team</strong></span>
          <time dateTime={publishedAt}>September 9, 2026</time>
          <span className="flex items-center gap-1.5"><Clock size={16} /> 6 min read</span>
        </div>
      </header>

      <div className="container-site max-w-5xl">
        <Image
          src="/images/lemon-herb-chicken-bowl.png"
          alt="Balanced bowl with chicken, quinoa, and colorful vegetables"
          width={1584}
          height={1024}
          priority
          className="aspect-[8/5] w-full rounded-lg object-cover"
        />
      </div>

      <div className="container-site grid max-w-5xl gap-12 py-12 lg:grid-cols-[minmax(0,700px)_240px] lg:justify-between">
        <div className="prose-recipe">
          <p>
            “Balanced” can sound like a meal has to pass a test. In everyday cooking, it is more helpful to treat balance as a repeatable starting point: include produce, a protein source, an energy-rich carbohydrate, and enough flavor to make the meal enjoyable.
          </p>

          <h2>Start with vegetables or fruit</h2>
          <p>
            Produce brings color, texture, and variety. The USDA MyPlate framework encourages making half your plate fruits and vegetables, but that visual is a guide rather than a requirement for every single meal. Fresh, frozen, canned, and dried options can all be useful.
          </p>
          <p>
            For dinner, try roasted broccoli, a chopped salad, frozen mixed vegetables, or sliced tomatoes. At breakfast, berries, banana, spinach, or leftover roasted vegetables can fill the same role.
          </p>

          <h2>Add a protein you enjoy</h2>
          <p>
            Protein foods can make a meal more substantial. Chicken, fish, eggs, yogurt, tofu, tempeh, beans, peas, and lentils are all practical choices. Choose what fits the meal and what you will realistically cook.
          </p>
          <p>
            A protein does not have to be the centerpiece. Beans stirred into a grain bowl, an egg over vegetables, or yogurt alongside oats can complete a meal without adding much work.
          </p>

          <h2>Choose an energy-giving carbohydrate</h2>
          <p>
            Rice, potatoes, oats, pasta, bread, tortillas, and other grains give a meal structure and staying power. Whole-grain options can add fiber, but balance still leaves room for foods you like and ingredients your household already uses.
          </p>

          <h2>Finish with fat, sauce, or crunch</h2>
          <p>
            This is often what turns separate ingredients into a meal. Try olive oil, avocado, nuts, seeds, cheese, pesto, tahini sauce, salsa, or a simple vinaigrette. Herbs, citrus, spices, and pickled vegetables can add impact without making the recipe complicated.
          </p>

          <h2>A simple formula to remember</h2>
          <div className="my-7 border-l-4 border-[#43a56f] bg-[#f1f5ed] px-6 py-5">
            <p className="m-0 font-bold text-[#16352b]">Produce + protein + carbohydrate + flavor</p>
          </div>
          <p>Here are three ways that formula can look:</p>
          <ul>
            <li>Roasted vegetables + chicken + quinoa + lemon-herb dressing</li>
            <li>Spinach and tomatoes + eggs + whole-grain toast + avocado</li>
            <li>Frozen vegetables + tofu + rice + peanut-lime sauce</li>
          </ul>

          <h2>Make the easiest choice the default</h2>
          <p>
            Balance becomes sustainable when the ingredients are convenient. Keep two or three quick options from each building block on hand: frozen vegetables, canned beans, eggs, microwaveable grains, and one sauce you genuinely like. Repeating reliable combinations is a strength, not a failure of creativity.
          </p>

          <h2>Let the meal fit your life</h2>
          <p>
            Appetite and nutrition needs vary. Your plate may look different based on activity, health needs, age, preferences, or culture. This framework is general information, not an individualized meal prescription. A registered dietitian or qualified clinician can help when you need personal guidance.
          </p>

          <div className="mt-12 rounded-lg border border-[#dbe5dc] p-6">
            <div className="flex items-center gap-2 text-[#287a55]"><BookOpen size={20} /><h2 className="!m-0 !font-sans !text-base !tracking-normal">Sources and editorial note</h2></div>
            <p className="mb-0 mt-4 text-sm">
              This guide was reviewed against public guidance from the <a href="https://www.myplate.gov/" target="_blank" rel="noopener noreferrer">USDA MyPlate program</a> and the <a href="https://www.dietaryguidelines.gov/" target="_blank" rel="noopener noreferrer">Dietary Guidelines for Americans</a>. See our <Link href="/editorial-policy">Editorial Policy</Link> for how FreshTable develops and updates content.
            </p>
          </div>
        </div>

        <aside className="h-fit border-t-4 border-[#43a56f] bg-[#f1f5ed] p-6 lg:sticky lg:top-6">
          <p className="eyebrow">Try it tonight</p>
          <h2 className="display mt-3 text-2xl font-bold">Lemon Herb Chicken Quinoa Bowls</h2>
          <p className="mt-3 text-sm leading-6 text-[#5c7166]">A practical example of the balanced-meal formula in one colorful bowl.</p>
          <Link className="mt-5 inline-block font-bold text-[#287a55] underline" href="/recipes/lemon-herb-chicken-quinoa-bowls">Get the recipe</Link>
        </aside>
      </div>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }} />
    </article>
  );
}
