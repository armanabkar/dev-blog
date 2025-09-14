import { Metadata } from "next";
import Container from "@/app/_components/container";
import { notFound } from "next/navigation";
import { Intro } from "@/app/_components/intro";
import { MoreStories } from "@/app/_components/more-stories";
import { getAllPosts, getPostsBySlug } from "@/lib/api";

export default async function Category(props: Params) {
  const params = await props.params;
  const posts = getAllPosts();
  const postsBySlug = getPostsBySlug(posts, params.slug);

  if (postsBySlug.length == 0) {
    return notFound();
  }

  return (
    <main>
      <Container>
        <Intro />
        {postsBySlug.length > 0 && (
          <MoreStories posts={postsBySlug} title={params.slug} />
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
