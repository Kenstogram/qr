import Navbar from '@/components/NavbarDark';
import { Suspense } from 'react';
import fs from 'fs';
import path from 'path';
import { promisify } from 'util';
import matter from 'gray-matter';
import Link from 'next/link';
import { marked } from 'marked';  // Import marked

// Path to the `blog` directory where markdown files are stored
const blogDirectory = path.join(process.cwd(), 'app/blog');

// Promisify fs.readdir to read the files asynchronously
const readdir = promisify(fs.readdir);

interface BlogPost {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
}

export default async function BlogPage() {
  try {
    // Get all markdown files in the blog directory
    const files = await readdir(blogDirectory);

    // Filter out non-md files and read the markdown content
    const posts: BlogPost[] = await Promise.all(
      files
        .filter((file) => file.endsWith('.md'))
        .map(async (file) => {
          const filePath = path.join(blogDirectory, file);
          const fileContent = fs.readFileSync(filePath, 'utf8');

          // Use gray-matter to parse front matter and markdown content
          const { data, content } = matter(fileContent);

          // Return the slug, title, date, and an excerpt (first 100 characters)
          return {
            slug: file.replace('.md', ''),
            title: data.title || 'Untitled',
            date: data.date || 'Unknown date',
            excerpt: content.substring(0, 200) + '...', // Use more characters for the excerpt
          };
        })
    );

    // Sort posts by date (newest first)
    posts.sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return dateB.getTime() - dateA.getTime(); // Sort in descending order
    });

    // Render the list of blog posts
    return (
      <>
        <Suspense fallback={
          <div className="my-2 h-10 w-full rounded-md border border-stone-200 bg-stone-100 dark:border-stone-700 dark:bg-stone-300" />
        }>
          <Navbar />
        </Suspense>
        <div className="pt-20 pb-40 max-w-3xl mx-auto p-6 space-y-6">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-50 mb-4">QR Blog</h1>

          {posts.length === 0 ? (
            <p className="text-lg text-gray-500 dark:text-gray-400">No blog posts available.</p>
          ) : (
            <ul className="space-y-4">
              {posts.map((post) => (
                <li key={post.slug} className="border-b pb-4">
                  <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-50">
                    <Link href={`/blog/${post.slug}`} className="hover:text-blue-500">
                      {post.title}
                    </Link>
                  </h2>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{post.date}</p>

                  {/* Render the excerpt as HTML */}
                  <div
                    className="mt-2 text-gray-600 dark:text-gray-400"
                    dangerouslySetInnerHTML={{ __html: marked(post.excerpt) }}  // Render Markdown as HTML
                  />
                </li>
              ))}
            </ul>
          )}
        </div>
      </>
    );
  } catch (err) {
    console.error('Error fetching blog posts:', err);
    return (
      <div className="max-w-3xl mx-auto p-6 space-y-6">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-50 mb-4">Blog</h1>
        <p className="text-lg text-red-500">Error loading blog posts.</p>
      </div>
    );
  }
}
