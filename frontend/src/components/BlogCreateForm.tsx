"use client";

import { Button, Divider, Input, Spinner } from "@heroui/react";
import { useState } from "react";
import { ImageInput } from "./ImageInput";
import { useRouter } from "next/navigation";
import { useBlogCreate } from "@/src/hooks/useBlogCreate";

export const BlogCreateForm = () => {
  const [title, setTitle] = useState<string>("");
  const [text, setText] = useState<string>("");
  const [image, setImage] = useState<string | { url: string } | File | null>(
    null
  );

  const { push } = useRouter();
  const handleBack = () => push("/blog");

  const { loading, handleCreate } = useBlogCreate();

  const handleSudmit = async (e: any) => {
    e.preventDefault();

    const shouldUpdateImage = image instanceof File;

    const data = {
      image: shouldUpdateImage ? image : null,
      title: title as string,
      text: text as string,
    };

    await handleCreate(data);
    handleBack();
  };

  if (loading)
    return (
      <div className="flex justify-center items-center w-full h-full">
        <Spinner label="Loading..." variant="wave" size="lg" />
      </div>
    );

  return (
    <>
      <h4 className="text-medium font-medium">Create post</h4>
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
          <Button color="danger" onPress={handleBack}>
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
