import Link from "next/link";

type props = {
  tags?: string[];
};

export function PostTags({ tags = [] }: props) {
  return (
    <div className="flex flex-wrap max-w-2xl mx-auto space-x-2">
      {tags?.map((tag) => (
        <Link
          key={tag}
          className="bg-black hover:bg-white hover:text-black border border-black text-white font-bold p-1 duration-200 transition-colors"
          href={`/categories/${tag}`}
        >
          {tag}
        </Link>
      ))}
    </div>
  );
}
