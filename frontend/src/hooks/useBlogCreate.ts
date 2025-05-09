import axios from "axios";
import { useState } from "react";

interface IBlogCreate {
  title: string;
  text: string;
  image?: any;
}

export const useBlogCreate = () => {
  const [loading, setLoading] = useState(false);

  const handleCreate = async (values: IBlogCreate) => {
    setLoading(true);
    try {
      await axios.post(process.env.NEXT_PUBLIC_API as string, values, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return { loading, handleCreate };
};
