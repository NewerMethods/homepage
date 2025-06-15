
import { useQuery } from "@tanstack/react-query";
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Terminal } from "lucide-react";
import { motion } from "framer-motion";
import type { SubstackPost } from "@/types";
import PageHeader from "@/components/PageHeader";

// NOTE: Replace this URL with your own Substack feed
const SUBSTACK_RSS_URL = "https://newermethods.substack.com/feed";

const fetchSubstackFeed = async (): Promise<SubstackPost[]> => {
  const res = await fetch(SUBSTACK_RSS_URL);
  if (!res.ok) {
    throw new Error("Network response was not ok");
  }
  const data = await res.json();
  if (data.status !== 'ok') {
    throw new Error("Failed to fetch RSS feed: " + data.message);
  }
  return data.items;
};

const Substack = () => {
  const { data: posts, isLoading, error } = useQuery({
    queryKey: ["substackFeed"],
    queryFn: fetchSubstackFeed,
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <header className="mb-12">
        <PageHeader title="Latest Posts" description="Thoughts and articles from my Substack." />
      </header>

      {error && (
        <Alert variant="destructive">
          <Terminal className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            Could not fetch posts. Please check the Substack URL or try again later.
          </AlertDescription>
        </Alert>
      )}

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {isLoading && Array.from({ length: 6 }).map((_, i) => (
          <Card key={i}>
            <CardHeader>
              <Skeleton className="h-6 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-20 w-full" />
            </CardContent>
            <CardFooter>
              <Skeleton className="h-10 w-28" />
            </CardFooter>
          </Card>
        ))}
        {posts?.map((post) => (
          <Card key={post.guid} className="flex flex-col">
            <CardHeader>
              <CardTitle>{post.title}</CardTitle>
              <CardDescription>{new Date(post.pubDate).toLocaleDateString()}</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              {/* The description from rss2json contains HTML, so we use dangerouslySetInnerHTML */}
              <div className="text-sm text-muted-foreground" dangerouslySetInnerHTML={{ __html: post.description.substring(0, 150) + '...' }}></div>
            </CardContent>
            <CardFooter>
              <Button asChild>
                <a href={post.link} target="_blank" rel="noopener noreferrer">Read More</a>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </motion.div>
  );
};

export default Substack;
