"use client";

import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Image,
} from "@heroui/react";
import { EditButton } from "./IconButtons";
import { useRouter } from "next/navigation";
import { DeleteModal } from "./DeleteModal";
import FallBackImage from "@/public/fallback.webp";

interface IBlogList {
  blogs: Record<string, any>[];
}

export const BlogList = ({ blogs }: IBlogList) => {
  const { push } = useRouter();

  const handleCreateButtonClick = () => push("/blog/create");

  return (
    <>
      <Button color="primary" onPress={handleCreateButtonClick}>
        Create Post
      </Button>

      <div className="mt-2 flex justify-center gap-4 flex-wrap">
        {blogs?.map(({ _id, title, text, image }: Record<string, any>) => (
          <Card key={_id} className="py-4 w-full md:w-[320px] lg:w-[360px]">
            <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
              <h4 className="font-bold text-large">{title}</h4>
              <p className="text-ellipsis overflow-hidden w-full whitespace-nowrap">
                {text}
              </p>
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
            <CardFooter className="flex justify-end gap-1">
              <DeleteModal id={_id} title={title} />
              <EditButton
                text="Edit post"
                onPress={() => push(`/blog/edit/${_id}`)}
              />
            </CardFooter>
          </Card>
        ))}
      </div>
    </>
  );
};
