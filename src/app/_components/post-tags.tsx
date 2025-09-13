type props = {
  tags?: string[]
};

export function PostTags({ tags = [] }: props) {
  return (
    <div className="flex flex-wrap max-w-2xl mx-auto space-x-2">
      {tags?.map((tag) => (
        <span
          key={tag}
          className="p-1 my-1 rounded-md bg-neutral-50 dark:bg-slate-800 font-bold border border-neutral-200"
        >
          {tag}
        </span>
      ))}
    </div>
  );
}
