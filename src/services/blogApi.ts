
import type { BlogPost, BlogListItem } from '@/types/blog';

// Import JSON files directly
import helloWorldJson from '@/data/blog/hello-world.json';
import excitingNewTechJson from '@/data/blog/exciting-new-tech.json';
import thoughtsOnRemoteWorkJson from '@/data/blog/thoughts-on-remote-work.json';

const blogPosts: Record<string, BlogPost> = {
  'hello-world': helloWorldJson as BlogPost,
  'exciting-new-tech': excitingNewTechJson as BlogPost,
  'thoughts-on-remote-work': thoughtsOnRemoteWorkJson as BlogPost,
};

export const fetchBlogList = async (): Promise<BlogListItem[]> => {
  const blogList: BlogListItem[] = [];
  
  for (const [slug, post] of Object.entries(blogPosts)) {
    try {
      blogList.push({
        slug: post.slug,
        title: post.title,
        description: post.description,
        date: post.date
      });
    } catch (error) {
      console.error(`Error processing blog list item for ${slug}:`, error);
    }
  }
  
  return blogList;
};

export const fetchBlogPost = async (slug: string): Promise<BlogPost> => {
  const post = blogPosts[slug];
  
  if (!post) {
    throw new Error(`Blog post with slug "${slug}" not found.`);
  }
  
  return post;
};
