type Props = {
  title: string;
  excerpt: string;
};

export function PostTitle({ title, excerpt }: Props) {
  return (
    <div className="tracking-tighter leading-tight md:leading-none text-center md:text-left mb-10 space-y-8">
      <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold">{title}</h1>
      <p className="text-lg md:text-xl lg:text-2xl">{excerpt}</p>
    </div>
  );
}
