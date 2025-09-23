import Container from "@/app/_components/container";
import { GITHUB_REPOSITORY } from "@/lib/constants";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-neutral-50 border-t border-neutral-200 dark:bg-slate-800">
      <Container>
        <div className="py-24 flex flex-col lg:flex-row items-center">
          <div className="lg:w-1/2 lg:pr-4 text-center lg:text-left mb-10 lg:mb-0">
            <h3 className="text-4xl lg:text-[2.5rem] font-bold tracking-tighter leading-tight">
              Notizen für Webentwickler.
            </h3>
            <p className="mt-2 text-sm text-neutral-500 dark:text-slate-400">
              © {year} Arman. Alle Rechte vorbehalten.
            </p>
          </div>

          <div className="flex flex-col lg:flex-row justify-end items-center lg:pl-4 lg:w-1/2">
            <a
              href={GITHUB_REPOSITORY}
              target="_blank"
              className="mx-3 bg-black hover:bg-white hover:text-black border border-black text-white font-bold py-3 px-12 lg:px-8 duration-200 transition-colors mb-6 lg:mb-0 rounded"
            >
              Auf GitHub ansehen
            </a>
          </div>
        </div>
      </Container>
    </footer>
  );
}

export default Footer;
