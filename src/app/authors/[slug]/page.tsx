import { Metadata } from "next";
import Container from "@/app/_components/container";
import { notFound } from "next/navigation";
import { MoreStories } from "@/app/_components/more-stories";
import { getAllPosts, getPostsByAuthor } from "@/lib/api";
import Header from "@/app/_components/header";

export default async function Author(props: Params) {
  const params = await props.params;
  const posts = getAllPosts();
  const postsByAuthor = getPostsByAuthor(posts, params.slug);
  const decodedName = decodeURIComponent(
    Array.isArray(params.slug) ? params.slug[0] : params.slug
  );

  if (postsByAuthor.length === 0) {
    return notFound();
  }

  return (
    <main>
      <Container>
        <Header />
        {postsByAuthor.length > 0 && (
          <MoreStories posts={postsByAuthor} title={decodedName} />
        )}
      </Container>
    </main>
  );
}

type Params = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateMetadata(props: Params): Promise<Metadata> {
  const params = await props.params;

  if (!params.slug) {
    return notFound();
  }

  const title = `${params.slug.replace(/^\w/, (c) =>
    c.toUpperCase()
  )} | Notizen & Ideen zur Webentwicklung`;

  return {
    title,
  };
}

export async function generateStaticParams() {
  const posts = getAllPosts();

  const allAuthors = posts.flatMap((post) => post.author.name || []);

  const uniqueAuthors = Array.from(new Set(allAuthors));

  return uniqueAuthors.map((slug) => ({
    slug,
  }));
}
