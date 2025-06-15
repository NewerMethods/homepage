
import React, { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { fetchBlogPost } from '@/services/blogApi';
import { ContentBlock } from '@/components/reports/ContentBlock';
import { Skeleton } from '@/components/ui/skeleton';
import PageHeader from '@/components/PageHeader';
import { format } from 'date-fns';
import { ReportLayout } from '@/components/reports/ReportLayout';
import type { ReportContentBlock } from '@/types/reports';

const PostPage = () => {
  const { postSlug } = useParams<{ postSlug: string }>();

  const { data: post, isLoading, error } = useQuery({
    queryKey: ['blogPost', postSlug],
    queryFn: () => fetchBlogPost(postSlug!),
    enabled: !!postSlug,
  });

  const sections = useMemo(() => {
    if (!post?.content) return [];
    return post.content
      .filter(
        (block): block is ReportContentBlock & { type: 'heading'; id: string; content: string } =>
          block.type === 'heading' && !!block.id && !!block.content
      )
      .map((block) => ({
        id: block.id,
        title: block.content,
      }));
  }, [post]);

  if (isLoading) {
    return (
      <div className="container mx-auto py-8">
        <header className="mb-8">
            <Skeleton className="h-12 w-3/4 mb-4" />
            <Skeleton className="h-6 w-1/4" />
        </header>
        <div className="flex">
            <div className="w-56 hidden md:block mr-8">
                <Skeleton className="h-48 w-full" />
            </div>
            <div className="flex-1">
                <Skeleton className="h-8 w-1/2 mb-4" />
                <Skeleton className="h-48 w-full mb-8" />
                <Skeleton className="h-8 w-1/2 mb-4" />
                <Skeleton className="h-64 w-full" />
            </div>
        </div>
      </div>
    );
  }

  if (error || !post) {
    return <div>Error loading post. It may not exist or there was a problem fetching it.</div>;
  }

  return (
    <div className="container mx-auto py-8">
      <header className="mb-8">
        <PageHeader title={post.title} />
        <p className="text-muted-foreground mt-2 text-lg">
          {format(new Date(post.date), 'MMMM d, yyyy')}
        </p>
      </header>
      <ReportLayout sections={sections}>
        <article>
          {post.content.map((block, index) => (
            <ContentBlock key={index} block={block} />
          ))}
        </article>
      </ReportLayout>
    </div>
  );
};

export default PostPage;
