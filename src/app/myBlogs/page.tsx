'use client'
import { Blog } from "@/generated/prisma";
import gqlClient from "@/services/gqlClient";
import { gql } from "graphql-request";
import { useEffect, useState } from "react";
import { currentUserBlogs } from "../api/graphql/resolvers/user";
import BlogCard from "@/components/cards/blogCard";

const CUURRENT_USER_BLOGS = gql`
query CurrentUser {
  currentUserBlogs {
    id
    title
    content
  }
}
`

export default function MyBlogs() {   
    const [userBlogs , setUserBlogs]= useState<Blog[]>([]);

    useEffect(()=>{
        async function getCurrentUserBlogs(){
            try{
                const data: {currentUserBlogs : Blog[]} = await gqlClient.request(CUURRENT_USER_BLOGS);
                if(data?.currentUserBlogs){
                    setUserBlogs(data?.currentUserBlogs)
                }
            } catch (err){
                alert("something went wrong")
            }
        }
        getCurrentUserBlogs();
    }, []); // Add empty dependency array

return (
    <main>
        {
            userBlogs.map((blog)=>{
                return <BlogCard key={blog.id} blog={blog}/>
            })
        }

    </main>
)
}