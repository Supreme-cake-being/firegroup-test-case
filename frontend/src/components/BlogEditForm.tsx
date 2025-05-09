"use client";

import { Button, Divider, Input, Spinner } from "@heroui/react";
import { useEffect, useState } from "react";
import { ImageInput } from "./ImageInput";
import { useRouter } from "next/navigation";
import { useBlogById } from "@/src/hooks/useBlogById";
import { useBlogUpdate } from "@/src/hooks/useBlogUpdate";

interface IBlogEditForm {
  id: string;
}

export const BlogEditForm = ({ id }: IBlogEditForm) => {
  const [title, setTitle] = useState<string>();
  const [text, setText] = useState<string>();
  const [image, setImage] = useState<string | { url: string } | File | null>(
    null
  );

  const { blog, loading } = useBlogById(id);
  const { loading: loadingUpdate, handleUpdate } = useBlogUpdate();

  const { push } = useRouter();
  const handleBackButtonClick = () => push("/blog");

  const handleSudmit = async (e: any) => {
    e.preventDefault();

    const shouldUpdateImage =
      image instanceof File ||
      (typeof image !== "string" && blog.image?.url !== image?.url);

    const data = {
      image: shouldUpdateImage ? image : null,
      title: title as string,
      text: text as string,
    };

    await handleUpdate(data, id);
  };

  useEffect(() => {
    if (blog) {
      setTitle(blog.title);
      setText(blog.text);
      setImage(blog.image);
    }
  }, [blog]);

  if (loading || loadingUpdate)
    return (
      <div className="flex justify-center items-center w-full h-full">
        <Spinner label="Loading..." variant="wave" size="lg" />
      </div>
    );
  if (!blog) return <p>Blog not found</p>;

  return (
    <>
      <h4 className="text-medium font-medium">Edit post</h4>
      <Divider className="mt-1 mb-2 " />
      <form onSubmit={handleSudmit} className="flex flex-col gap-4">
        <ImageInput image={image} setImage={setImage} />

        <Input
          name="title"
          label="Title "
          placeholder="Enter title"
          value={title}
          isRequired
          onValueChange={setTitle}
        />

        <Input
          name="text"
          label="Text "
          placeholder="Enter text"
          value={text}
          isRequired
          onValueChange={setText}
        />

        <div className="flex justify-end  gap-4">
          <Button color="danger" onPress={handleBackButtonClick}>
            Back
          </Button>
          <Button color="primary" type="submit">
            Submit
          </Button>
        </div>
      </form>
    </>
  );
};
