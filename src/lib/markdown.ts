import matter from 'gray-matter';
import { remark } from 'remark';
import remarkHtml from 'remark-html';
import remarkGfm from 'remark-gfm';
import { Buffer } from 'buffer';
import type { BlogPost, BlogListItem } from '@/types/blog';
import type { ReportContentBlock } from '@/types/reports';

// Polyfill Buffer for browser environment
if (typeof window !== 'undefined') {
  window.Buffer = Buffer;
}

// Configure remark processor
const processor = remark()
  .use(remarkGfm)
  .use(remarkHtml, { sanitize: false });

// Convert markdown content to ReportContentBlocks
export const parseMarkdownToBlocks = async (content: string): Promise<ReportContentBlock[]> => {
  const blocks: ReportContentBlock[] = [];
  
  // Split content by headers and process each section
  const lines = content.split('\n');
  let currentBlock: string[] = [];
  let blockType: 'paragraph' | 'heading' = 'paragraph';
  
  for (const line of lines) {
    // Check if line is a heading
    if (line.startsWith('## ')) {
      // Process previous block if exists
      if (currentBlock.length > 0) {
        const blockContent = currentBlock.join('\n').trim();
        if (blockContent) {
          const processedHtml = await processor.process(blockContent);
          blocks.push({
            type: blockType,
            content: String(processedHtml),
            ...(blockType === 'heading' && { id: generateId(blockContent) })
          });
        }
      }
      
      // Start new heading block
      currentBlock = [line];
      blockType = 'heading';
    } else if (line.startsWith('![Chart:')) {
      // Handle chart blocks - format: ![Chart:type](url "title")
      const chartMatch = line.match(/!\[Chart:(\w+)\]\(([^)]+)(?:\s+"([^"]+)")?\)/);
      if (chartMatch) {
        const [, chartType, dataUrl, title] = chartMatch;
        blocks.push({
          type: 'chart',
          chartType: chartType as 'line' | 'heatmap' | 'image',
          dataUrl,
          title,
          description: title
        });
      }
    } else {
      // Add line to current block
      if (line.trim() || currentBlock.length > 0) {
        currentBlock.push(line);
      }
      
      // If we were in a heading and hit content, switch to paragraph
      if (blockType === 'heading' && line.trim()) {
        blockType = 'paragraph';
      }
    }
  }
  
  // Process final block
  if (currentBlock.length > 0) {
    const blockContent = currentBlock.join('\n').trim();
    if (blockContent) {
      const processedHtml = await processor.process(blockContent);
      if (blockType === 'heading') {
        // Extract heading text (remove ##)
        const headingText = blockContent.replace(/^##\s+/, '');
        blocks.push({
          type: 'heading',
          content: headingText,
          id: generateId(headingText)
        });
      } else {
        blocks.push({
          type: 'paragraph',
          content: String(processedHtml)
        });
      }
    }
  }
  
  return blocks;
};

// Generate ID from heading text
const generateId = (text: string): string => {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
};

// Parse markdown file content
export const parseMarkdownFile = async (fileContent: string): Promise<BlogPost> => {
  const { data: frontmatter, content } = matter(fileContent);
  
  const blocks = await parseMarkdownToBlocks(content);
  
  return {
    slug: frontmatter.slug,
    title: frontmatter.title,
    description: frontmatter.description,
    date: frontmatter.date,
    content: blocks
  };
};

// Extract frontmatter for list items
export const extractBlogListItem = (fileContent: string): BlogListItem => {
  const { data: frontmatter } = matter(fileContent);
  
  return {
    slug: frontmatter.slug,
    title: frontmatter.title,
    description: frontmatter.description,
    date: frontmatter.date
  };
};
