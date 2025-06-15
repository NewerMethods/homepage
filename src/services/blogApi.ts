
import type { BlogPost, BlogListItem } from '@/types/blog';

// Import JSON data
import blogList from '@/data/blog/blog-list.json';
import post1 from '@/data/blog/hello-world.json';
import post2 from '@/data/blog/exciting-new-tech.json';
import post3 from '@/data/blog/thoughts-on-remote-work.json';

const posts: Record<string, BlogPost> = {
  'hello-world': post1 as BlogPost,
  'exciting-new-tech': post2 as BlogPost,
  'thoughts-on-remote-work': post3 as BlogPost,
};

export const fetchBlogList = async (): Promise<BlogListItem[]> => {
  return Promise.resolve(blogList as BlogListItem[]);
};

export const fetchBlogPost = async (slug: string): Promise<BlogPost> => {
  const post = posts[slug];
  if (post) {
    return Promise.resolve(post);
  }
  return Promise.reject(new Error(`Blog post with slug "${slug}" not found.`));
};
