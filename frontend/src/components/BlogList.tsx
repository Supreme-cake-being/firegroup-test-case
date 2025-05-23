"use client";

import { useRouter } from "next/navigation";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Image,
} from "@heroui/react";
import { EditButton } from "@/src/components/IconButtons";
import { DeleteModal } from "@/src/components/DeleteModal";
import { Loader } from "@/src/components/Loader";
import FallBackImage from "@/public/fallback.webp";

interface IBlogList {
  blogs: Record<string, any>[];
  loading: boolean;
}

export const BlogList = ({ blogs, loading }: IBlogList) => {
  const { push } = useRouter();

  const handleCreateButtonClick = () => push("/blog/create");

  return (
    <>
      <div className="flex justify-end">
        <Button color="primary" onPress={handleCreateButtonClick}>
          Create Post
        </Button>
      </div>

      <div className="pt-4 columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
        {blogs
          ?.sort(
            (a, b) =>
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          )
          .map(
            ({ _id, title, text, image, createdAt }: Record<string, any>) => (
              <Card key={_id} className="w-full md:w-[236px] lg:w-[300px]">
                <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                  <h4 className="font-bold text-large">{title}</h4>
                  <p>{text}</p>
                </CardHeader>
                <CardBody className="overflow-visible py-2">
                  <Image
                    alt={title}
                    src={image ? image.url : FallBackImage.src}
                    className="w-full h-auto"
                    width={0}
                    height={0}
                  />
                </CardBody>
                <CardFooter className="flex justify-between">
                  <p>
                    {new Intl.DateTimeFormat("en-GB", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    }).format(new Date(createdAt))}
                  </p>

                  <div className="flex gap-1">
                    <DeleteModal id={_id} title={title} />
                    <EditButton
                      text="Edit post"
                      onPress={() => push(`/blog/edit/${_id}`)}
                    />
                  </div>
                </CardFooter>
              </Card>
            )
          )}
      </div>

      {loading && <Loader />}
    </>
  );
};
