import { BlogEditForm } from "@/src/components/BlogEditForm";

interface IProps {
  params: Promise<{ blogId: string }>; // NEW: treat params as a Promise
}

export default async function BlogEditPage({ params }: IProps) {
  const resolvedParams = await params; // NEW: unwrap the Promise
  return <BlogEditForm id={resolvedParams.blogId} />;
}
