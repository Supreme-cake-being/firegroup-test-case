import axios from "axios";
import { useState } from "react";

export const useBlogs = () => {
  const [data, setData] = useState<Record<string, any> | null>(null);
  const [loading, setLoading] = useState(false);

  const handleFetch = async () => {
    try {
      const response = await axios.get(process.env.NEXT_PUBLIC_API as string);
      setData(response);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return { blogs: data?.data, loading, handleFetch };
};
