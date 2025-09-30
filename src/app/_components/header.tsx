import { SITE_TITLE } from "@/lib/constants";
import Link from "next/link";

const Header = () => {
  return (
    <h2 className="text-2xl md:text-4xl font-bold tracking-tight md:tracking-tighter leading-tight mb-16 mt-8 flex items-center">
      <Link href="/" className="hover:underline">
        {SITE_TITLE}
      </Link>
      .
    </h2>
  );
};

export default Header;
