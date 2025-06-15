
import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { fetchBlogPost } from '@/services/blogApi';
import { ContentBlock } from '@/components/reports/ContentBlock';
import { Skeleton } from '@/components/ui/skeleton';
import PageHeader from '@/components/PageHeader';
import { format } from 'date-fns';

const PostPage = () => {
  const { postSlug } = useParams<{ postSlug: string }>();

  const { data: post, isLoading, error } = useQuery({
    queryKey: ['blogPost', postSlug],
    queryFn: () => fetchBlogPost(postSlug!),
    enabled: !!postSlug,
  });

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto">
        <Skeleton className="h-12 w-3/4 mb-4" />
        <Skeleton className="h-6 w-1/4 mb-8" />
        <Skeleton className="h-24 w-full mb-8" />
        <Skeleton className="h-8 w-1/2 mb-4" />
        <Skeleton className="h-48 w-full" />
      </div>
    );
  }

  if (error || !post) {
    return <div>Error loading post. It may not exist or there was a problem fetching it.</div>;
  }

  return (
    <article className="max-w-4xl mx-auto py-8">
      <header className="mb-8 border-b pb-4">
        <PageHeader title={post.title} />
        <p className="text-muted-foreground mt-2 text-lg">
          {format(new Date(post.date), 'MMMM d, yyyy')}
        </p>
      </header>
      <div className="prose prose-lg max-w-none dark:prose-invert">
        {post.content.map((block, index) => (
          <ContentBlock key={index} block={block} />
        ))}
      </div>
    </article>
  );
};

export default PostPage;
