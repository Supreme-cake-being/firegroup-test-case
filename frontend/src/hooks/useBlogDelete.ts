import axios from "axios";
import { useState } from "react";

export const useBlogDelete = () => {
  const [loading, setLoading] = useState(false);

  const handleDelete = async (id: string) => {
    setLoading(true);
    try {
      await axios.delete(process.env.NEXT_PUBLIC_API + `/${id}`);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return { loading, handleDelete };
};
