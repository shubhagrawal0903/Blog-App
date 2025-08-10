import gqlClient from "@/services/gqlClient";
import { gql } from "graphql-request";

const GET_BLOGS =gql`
query Blogs($blogId: String) {
  blog(id: $blogId) {
    id
    title
    content
    imageUrl
  }
}
`
export default async function Page({params} : {
    params: Promise<{ id: string }>
}){
    const p = await params;
    const id = p.id;
    const data = await gqlClient.request(GET_BLOGS, { blogId: id }) as any;
    const blog = data?.blog;

    return(
        <div>
          <h1>{blog.title}</h1>
          <p>{blog.content}</p>
          {blog.imageUrl && <img src={blog.imageUrl} alt={blog.title} />}
        </div>
    );
}