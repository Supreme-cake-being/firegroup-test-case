"use client";

import { BlogList } from "@/src/components/BlogList";
import { useBlogs } from "@/src/hooks/useBlogs";
import { createContext, useEffect } from "react";

export const HandleFetchContext = createContext(() => Promise.resolve());

export default function BlogPage() {
  const { blogs, loading, handleFetch } = useBlogs();

  useEffect(() => {
    handleFetch();
  }, []);

  return (
    <HandleFetchContext value={handleFetch}>
      <BlogList blogs={blogs} />
    </HandleFetchContext>
  );
}
