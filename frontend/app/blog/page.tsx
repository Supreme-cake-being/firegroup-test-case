export default async function BlogPage() {
  const res = await fetch(process.env.NEXT_PUBLIC_API as string);
  const blogs = await res.json();

  return (
    <main>
      {blogs.map(({ _id, title, text }: Record<string, any>) => (
        <div key={_id}>
          <h1>{title}</h1>
          <p>{text}</p>
        </div>
      ))}
    </main>
  );
}
