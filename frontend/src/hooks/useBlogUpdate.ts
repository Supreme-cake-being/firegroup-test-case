import axios from "axios";
import { useState } from "react";

interface IBlogUpdate {
  title: string;
  text: string;
  image?: any;
}

export const useBlogUpdate = () => {
  const [loading, setLoading] = useState(false);

  const handleUpdate = async (values: IBlogUpdate, id: string) => {
    setLoading(true);
    try {
      await axios.put(process.env.NEXT_PUBLIC_API + `/${id}`, values, {
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

  return { loading, handleUpdate };
};
