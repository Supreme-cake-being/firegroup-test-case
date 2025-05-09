import { Dispatch, SetStateAction } from "react";
import { Image, Input } from "@heroui/react";
import FallBackImage from "@/public/fallback.webp";

interface IImageInput {
  image: string | { url: string } | File | null;
  setImage: Dispatch<SetStateAction<string | { url: string } | File | null>>;
}

export function ImageInput({ image, setImage }: IImageInput) {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
    }
  };

  const imageUrl = () => {
    if (!image) return FallBackImage.src;
    if (typeof image === "string") return image;
    if (image instanceof File) return URL.createObjectURL(image);
    if ("url" in image) return image.url;
    return FallBackImage.src;
  };

  return (
    <div className="flex flex-col gap-2 w-[300px]">
      <label className="block text-medium font-medium text-gray-700">
        Upload Image
      </label>

      <Image alt="Preview" src={imageUrl()} width={300} height={300} />

      <Input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4
                     file:rounded-md file:border-0
                     file:text-sm file:font-semibold
                     file:bg-indigo-50 file:text-indigo-700
                     hover:file:bg-indigo-100"
      />
    </div>
  );
}
