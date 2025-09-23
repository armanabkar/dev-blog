import { Post } from "@/interfaces/post";
import fs from "fs";
import matter from "gray-matter";
import { join } from "path";

const postsDirectory = join(process.cwd(), "_posts");

export function getPostSlugs() {
  return fs.readdirSync(postsDirectory);
}

export function getPostBySlug(slug: string) {
  const decodedSlug = decodeURIComponent(slug);
  const realSlug = decodedSlug.replace(/\.md$/, "");
  const fullPath = join(postsDirectory, `${realSlug}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  return { ...data, slug: realSlug, content } as Post;
}

export function getAllPosts(): Post[] {
  const slugs = getPostSlugs();
  const posts = slugs
    .map((slug) => getPostBySlug(slug))
    // sort posts by date in descending order
    .sort((post1, post2) => (post1.date > post2.date ? -1 : 1));
  return posts;
}

export function getPostsByTag(
  posts: Post[],
  slugParam: string | string[] | undefined
) {
  const slug = getNormalizedSlug(slugParam);
  return slug
    ? posts.filter((post) => post.tags?.some((tag) => slugify(tag) === slug))
    : [];
}

export function getPostsByAuthor(
  posts: Post[],
  slugParam: string | string[] | undefined
) {
  const slug = getNormalizedSlug(slugParam);
  return slug ? posts.filter((post) => slugify(post.author.name) === slug) : [];
}

/**
 * Normalizes a slug parameter by decoding and slugifying it.
 *
 * This function is useful for handling slugs from Next.js dynamic routes,
 * which can be a string, an array of strings, or undefined. It ensures
 * the slug is URL-decoded and converted to a clean, normalized format.
 *
 * @param slugParam - The slug parameter from the route (string, array, or undefined).
 * @returns The normalized slug string, or null if the parameter is invalid.
 *
 * @example
 * getNormalizedSlug("My Blog Post") // returns "my-blog-post"
 * getNormalizedSlug(["My Blog Post"]) // returns "my-blog-post"
 */
function getNormalizedSlug(slugParam: string | string[] | undefined) {
  if (!slugParam) return null;
  const rawSlug = Array.isArray(slugParam) ? slugParam[0] : slugParam;
  return slugify(decodeURIComponent(rawSlug));
}

/**
 * Converts a string into a URL-friendly slug.
 *
 * - Converts the text to lowercase.
 * - Trims whitespace from both ends.
 * - Replaces spaces with hyphens (`-`).
 * - Removes all non-alphanumeric characters except for hyphens.
 *
 * @param text - The input string to slugify.
 * @returns A clean, URL-friendly slug.
 *
 * @example
 * slugify("Hello World!") // returns "hello-world"
 * slugify("  Clean Text  ") // returns "clean-text"
 */
function slugify(text: string) {
  return text
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-") // spaces → hyphens
    .replace(/[^\w-]+/g, ""); // remove non-word chars except hyphen
}
