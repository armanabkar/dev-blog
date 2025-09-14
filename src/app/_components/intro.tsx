import { SITE_TITLE, CATEGORIES } from "@/lib/constants";
import Link from "next/link";

export function Intro() {
  return (
    <section className="flex-col md:flex-row flex items-center md:justify-between mt-16 mb-16 md:mb-12">
      <h1 className="text-5xl md:text-8xl font-bold tracking-tighter leading-tight md:pr-8">
        {SITE_TITLE}.
      </h1>
      <div>
        <h4 className="text-center md:text-left text-lg mt-5 md:pl-8">
          Notizen & Ideen aus der Welt der Webentwicklung.
        </h4>{" "}
        {CATEGORIES.length > 0 && (
          <div className="text-center md:text-left mt-5 md:pl-8 space-x-2">
            {["Alle", ...CATEGORIES].map((category) => (
              <Link
                key={category}
                href={category === "Alle" ? "/" : `/categories/${category}`}
                title={category}
                className="bg-black hover:bg-white hover:text-black border border-black text-white font-bold p-1 duration-200 transition-colors"
              >
                {category}
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
