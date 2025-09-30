import Avatar from "./avatar";
import CoverImage from "./cover-image";
import DateFormatter from "./date-formatter";
import { PostTitle } from "@/app/_components/post-title";
import { type Author } from "@/interfaces/author";

type Props = {
  title: string;
  coverImage: string;
  excerpt: string;
  date: string;
  author: Author;
};

export function PostHeader({
  title,
  coverImage,
  date,
  author,
  excerpt,
}: Props) {
  return (
    <>
      <PostTitle title={title} excerpt={excerpt} />
      <div className="hidden md:block md:mb-12">
        <Avatar name={author.name} picture={author.picture} />
      </div>
      <div className="mb-8 md:mb-16 sm:mx-0">
        <CoverImage title={title} src={coverImage} />
      </div>
      <div className="max-w-2xl mx-auto">
        <div className="block md:hidden mb-6">
          <Avatar name={author.name} picture={author.picture} />
        </div>
        <div className="mb-6 text-lg text-neutral-500 dark:text-slate-500">
          <DateFormatter dateString={date} />
        </div>
      </div>
    </>
  );
}
