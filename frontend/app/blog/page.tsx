"use client";

import { BlogList } from "@/src/components/BlogList";
import { HandleFetchContext } from "@/src/contexts/handleFecthContext";
import { useBlogs } from "@/src/hooks/useBlogs";
import { useEffect } from "react";

export default function BlogPage() {
  const { blogs, loading, handleFetch } = useBlogs();

  useEffect(() => {
    handleFetch();
  }, []);

  return (
    <HandleFetchContext value={handleFetch}>
      <BlogList blogs={blogs} loading={loading} />
    </HandleFetchContext>
  );
}
