'use client'
import { Blog } from "@/generated/prisma";
import gqlClient from "@/services/gqlClient";
import prismaClient from "@/services/prisma";
import { gql } from "graphql-request";
import UpdateBlogBtn from "../buttons/updateBlogBtn";


const DELETE_BLOG = gql`
mutation DeleteBlog($deleteBlogId: String!) {
  deleteBlog(id: $deleteBlogId)
}
`
export default function BlogCard({blog} : {
    blog : Blog
}){
    async function handleDelete(){
        try{
            const data: { deleteBlog : boolean } = await gqlClient.request(DELETE_BLOG , {
                deleteBlogId : blog.id
            })

            if(data.deleteBlog){
                alert("Blog deleted successfully")
            } else {
              alert("Failed to delete blog")
            }
        } catch (err){
            alert("error in code")
        }
    }
  return(
    <div className="mb-10">
      <a href={'/blog/' + blog.id}>
        <h3>{blog.title}</h3>
        <p>{blog.content}</p>
        {blog.imageUrl && <img src={blog.imageUrl} alt={blog.title} />}
      </a>
      <button onClick={handleDelete} className="bg-red-500 text-white p-2 mt-2">
        Delete
      </button>
      <UpdateBlogBtn blog={blog} />
    </div>
  );
}