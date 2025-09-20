import Link from "next/link";

type props = {
  tags?: string[];
};

export function PostTags({ tags = [] }: props) {
  return (
    <div className="flex flex-wrap max-w-2xl mx-auto space-x-2 space-y-auto">
      {tags?.map((tag) => (
        <Link
          key={tag}
          className="bg-black dark:bg-slate-800 dark:text-slate-400 hover:bg-white hover:text-black text-white font-bold p-1 duration-200 transition-colors border border-black my-1"
          href={`/categories/${tag}`}
        >
          {tag}
        </Link>
      ))}
    </div>
  );
}
