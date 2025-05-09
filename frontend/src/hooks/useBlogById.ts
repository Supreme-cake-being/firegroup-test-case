import axios from "axios";
import { useCallback, useEffect, useState } from "react";

export const useBlogById = (id: string) => {
  const [data, setData] = useState<Record<string, any> | null>(null);
  const [loading, setLoading] = useState(false);

  const handleFetch = useCallback(async () => {
    try {
      const response = await axios.get(process.env.NEXT_PUBLIC_API + `/${id}`);
      setData(response);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    setData(null);
    setLoading(true);
    handleFetch();
  }, [id]);

  return { blog: data?.data[0], loading };
};
