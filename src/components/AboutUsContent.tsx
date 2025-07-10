import React, { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const AboutUsContent: React.FC = () => {
  const [aboutUsText, setAboutUsText] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAboutUsContent = async () => {
      try {
        // Assuming your table is named 'about_us' and has a 'content' column
        // You might want to fetch a specific row, e.g., by an ID or a unique slug
        const { data, error } = await supabase
          .from('about_us')
          .select('content')
          .single(); // Use .single() if you expect only one row for 'about us'

        if (error) {
          throw error;
        }

        if (data && data.content) {
          setAboutUsText(data.content);
        } else {
          setAboutUsText('No "About Us" content found.');
        }
      } catch (err: any) {
        console.error('Error fetching About Us content:', err.message);
        setError('Failed to load "About Us" content. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchAboutUsContent();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading About Us content...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center py-8 text-destructive">
          <h2 className="text-2xl font-bold mb-4">Error Loading Content</h2>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Apply Tailwind's prose classes for nicely formatted Markdown */}
        <div className="prose prose-lg dark:prose-invert max-w-none mx-auto">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {aboutUsText}
          </ReactMarkdown>
        </div>
      </div>
    </div>
  );
};

export default AboutUsContent;