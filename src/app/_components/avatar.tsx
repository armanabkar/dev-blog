import Link from "next/link";

type Props = {
  name: string;
  picture: string;
};

const Avatar = ({ name, picture }: Props) => {
  return (
    <Link href={`/authors/${name}`} aria-label={name}>
      <div className="flex items-center hover:underline">
        <img
          src={picture}
          className="shadow-sm w-12 h-12 rounded-full mr-4 hover:shadow-lg transition-shadow duration-200 border border-neutral-50 dark:border-slate-800"
          alt={name}
        />
        <div className="text-xl font-bold">{name}</div>
      </div>
    </Link>
  );
};

export default Avatar;
