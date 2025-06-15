
import React, { useState, useMemo } from 'react';
import { Link } from "react-router-dom";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import PageHeader from "@/components/PageHeader";
import { useQuery } from "@tanstack/react-query";
import { fetchBlogList } from "@/services/blogApi";
import { Skeleton } from "@/components/ui/skeleton";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { format } from 'date-fns';

const Blog = () => {
  const [sortOrder, setSortOrder] = useState<'newest' | 'oldest'>('newest');
  const { data: posts, isLoading, error } = useQuery({
    queryKey: ['blogList'],
    queryFn: fetchBlogList
  });

  const sortedPosts = useMemo(() => {
    if (!posts) return [];
    return [...posts].sort((a, b) => {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      return sortOrder === 'newest' ? dateB - dateA : dateA - dateB;
    });
  }, [posts, sortOrder]);

  const handleSortChange = (value: string) => {
    setSortOrder(value as 'newest' | 'oldest');
  };

  return (
    <div className="container mx-auto py-8">
      <header className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <PageHeader title="Blog" description="My thoughts on tech, development, and everything in between." />
        <Select onValueChange={handleSortChange} defaultValue={sortOrder}>
          <SelectTrigger className="w-full md:w-[180px]">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="newest">Newest first</SelectItem>
            <SelectItem value="oldest">Oldest first</SelectItem>
          </SelectContent>
        </Select>
      </header>
      
      {isLoading && (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <Card key={i} className="h-full flex flex-col">
              <CardHeader>
                <Skeleton className="h-6 w-3/4 mb-2" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-2/3 mt-1" />
              </CardHeader>
              <CardContent className="flex-grow flex items-end justify-between">
                 <Skeleton className="h-6 w-24" />
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {error && <div className="text-red-500">Could not load posts. Please try again later.</div>}

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {sortedPosts?.map((post) => (
          <Link to={`/blog/${post.slug}`} key={post.slug} className="group">
            <Card className="h-full flex flex-col transition-all duration-300 group-hover:border-primary">
              <CardHeader className="flex-grow">
                <CardTitle>{post.title}</CardTitle>
                <p className="text-sm text-muted-foreground pt-2">{format(new Date(post.date), 'MMMM d, yyyy')}</p>
                <CardDescription className="pt-2">{post.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex-shrink-0 flex items-end justify-between">
                <span className="text-sm font-medium text-primary">Read Post</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Blog;
