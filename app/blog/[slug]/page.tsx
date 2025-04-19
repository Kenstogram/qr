import Navbar from '@/components/NavbarDark';
import { Suspense } from "react";
import fs from 'fs';
import path from 'path';
import { marked } from 'marked';
import matter from 'gray-matter';
import { notFound } from 'next/navigation';

// Path to the `blog` directory where markdown files are stored
const blogDirectory = path.join(process.cwd(), 'app/blog');

interface BlogPostProps {
  content: string;
  title: string;
  date: string;
}

export default async function BlogPost({ params }: { params: { slug: string } }) {
  const { slug } = params;

  try {
    // Ensure the slug matches a markdown file
    const filePath = path.join(blogDirectory, `${slug}.md`);
    
    // Check if the file exists before reading it
    if (!fs.existsSync(filePath)) {
      notFound(); // Return 404 if post file not found
    }

    // Read the markdown file corresponding to the slug
    const fileContent = fs.readFileSync(filePath, 'utf8');

    // Use `gray-matter` to parse front matter and Markdown content
    const { data, content } = matter(fileContent);

    // Check if front matter is present and valid
    if (!data.title || !data.date) {
      notFound(); // Return 404 if title or date is missing
    }

    // Convert Markdown to HTML using `marked`
    const htmlContent = marked(content);

    // Return the blog post content as props
    return (
      <>
      <Suspense fallback={
        <div className="my-2 h-10 w-full rounded-md border border-stone-200 bg-stone-100 dark:border-stone-700 dark:bg-stone-300" />
              }>
        <Navbar />
        </Suspense>
      <div className="pt-40 pb-40 max-w-3xl mx-auto p-6 space-y-6">
        {/* Blog Title */}
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-50">{data.title}</h1>

        {/* Blog Date */}
        <p className="text-sm text-gray-500 dark:text-gray-400">{data.date}</p>

        {/* Blog Content */}
        <div
          className="prose dark:prose-dark mt-6"
          dangerouslySetInnerHTML={{ __html: htmlContent }}
        />

        {/* Optional: Add a Back Button */}
        <div className="mt-6">
          <a
            href="/blog"
            className="text-blue-500 hover:text-blue-700 font-medium"
          >
            &larr; Back to all posts
          </a>
        </div>
      </div>
      </>
    );
  } catch (err) {
    console.error(err);
    notFound(); // Return 404 if there's an issue
  }
}
