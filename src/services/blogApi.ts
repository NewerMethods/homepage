
import type { BlogPost, BlogListItem } from '@/types/blog';
import { parseMarkdownFile, extractBlogListItem } from '@/lib/markdown';

// Import markdown files as raw text
import helloWorldMd from '@/data/blog/hello-world.md?raw';
import excitingNewTechMd from '@/data/blog/exciting-new-tech.md?raw';
import thoughtsOnRemoteWorkMd from '@/data/blog/thoughts-on-remote-work.md?raw';
import webDevelopmentTrendsMd from '@/data/blog/web-development-trends.md?raw';
import buildingBetterApisMd from '@/data/blog/building-better-apis.md?raw';

const markdownFiles: Record<string, string> = {
  'hello-world': helloWorldMd,
  'exciting-new-tech': excitingNewTechMd,
  'thoughts-on-remote-work': thoughtsOnRemoteWorkMd,
  'web-development-trends': webDevelopmentTrendsMd,
  'building-better-apis': buildingBetterApisMd,
};

export const fetchBlogList = async (): Promise<BlogListItem[]> => {
  const blogList: BlogListItem[] = [];
  
  for (const [slug, content] of Object.entries(markdownFiles)) {
    try {
      const listItem = extractBlogListItem(content);
      blogList.push(listItem);
    } catch (error) {
      console.error(`Error parsing blog list item for ${slug}:`, error);
    }
  }
  
  return blogList;
};

export const fetchBlogPost = async (slug: string): Promise<BlogPost> => {
  const markdownContent = markdownFiles[slug];
  
  if (!markdownContent) {
    throw new Error(`Blog post with slug "${slug}" not found.`);
  }
  
  try {
    const post = await parseMarkdownFile(markdownContent);
    return post;
  } catch (error) {
    console.error(`Error parsing blog post ${slug}:`, error);
    throw new Error(`Failed to parse blog post "${slug}".`);
  }
};
