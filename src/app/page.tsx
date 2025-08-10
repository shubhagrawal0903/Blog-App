import gqlClient from "@/services/gqlClient";
import { gql } from "graphql-request";
import Link from "next/link";
import BlogCard from "@/components/cards/blogCard";

const GET_BLOGS = gql`
  query {
    blogs {
      id
      title
      content
      imageUrl
    }
  }
`;

export default async function Home() {
  const blogs = await gqlClient.request(GET_BLOGS) as any;
  return (
    <div>
      <form action={"/search"}>
        <input type="text" name="q" placeholder="Search for your favourite blogs..." className="h-16 w-80" />
        <button>Submit</button>
      </form>
      <Link href={"/myBlogs"}>
        My Blogs
      </Link>
      <h1>Welcome to the Blog</h1>
      <p>Explore our latest posts</p>
      {
        <div>
          {blogs.blogs?.map((blog: any) => (
            <BlogCard key={blog.id} blog={blog} />
          ))}
        </div>
      }
    </div>
  );
}

