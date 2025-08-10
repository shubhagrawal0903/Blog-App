import { getUserFromCookies } from "@/helper";
import prismaClient from "@/services/prisma";

const blogARR = [
  {
    id: 1,
    title: "First Post 1",
    content: "Hello!"
  },
  {
    id: 2,
    title: "Second Post 2",
    content: "Hello!"
  },
  {
    id: 3,
    title: "Third Post 2",
    content: "Hello!"
  },
  {
    id: 4,
    title: "Another Post",
    content: "More content here.",
    imageUrl: "www.pinterest.com"
  }
];

export async function getBlogById(x: any, args: any) {
  const id = args.id
  const blog = await prismaClient.blog.findUnique({
    where: { id }
  })
  return blog
}


export async function getBlogs(x: any, args: any) {
  const q = args.q || "";
  const blogs = await prismaClient.blog.findMany({
    where: {
      title: {
        contains: q,
        mode: "insensitive"
      }
    }
  })
  return blogs;
}

export async function createBlog(x: any, args: {
  title: string,
  content: string,
  imageUrl: string,
}) {

  const user = await getUserFromCookies();
  if(!user ) return null;
  
  const dataToSave = {
    title: args.title,
    content: args.content,
    imageUrl: args.imageUrl,
    user_id: user.id,
  };
  try {
    const blog = await prismaClient.blog.create({ data: dataToSave });
    return blog;
  } catch (error) {
    console.error("Error creating blog:", error);
    return null;
  }
}

export async function deleteBlog(x: any, args: {
  id: string
}) {
  try {
    const blog = await prismaClient.blog.delete({
      where: {
        id: args.id
      }
    });
    return true;
  } catch (error) {
    console.error("Error deleting blog:", error);
    return null;
  }
}

export async function updateBlog(x: any, args: {
  id: string,
  title?: string,
  content?: string,
  imageUrl?: string

}) {
  const dataToUpdate: Record<string, any> = {};
  if (typeof args.title !== "undefined") dataToUpdate.title = args.title;
  if (typeof args.content !== "undefined") dataToUpdate.content = args.content;
  if (typeof args.imageUrl !== "undefined") dataToUpdate.imageUrl = args.imageUrl;

  try {
    const blog = await prismaClient.blog.update({
      where: { id: args.id },
      data: dataToUpdate
    });
    return true;
  } catch (err) {
    console.error("Error updating blog:", err);
    return false;
  }
} 