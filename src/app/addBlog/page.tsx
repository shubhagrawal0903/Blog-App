"use client";

import { Blog } from "@/generated/prisma";
import gqlClient from "@/services/gqlClient";
import { gql } from "graphql-request";
import { useState } from "react";

const CREATE_BLOG = gql`
mutation CreateBlog($title: String!, $content: String!, $imageUrl: String) {
  createBlog(title: $title, content: $content, imageUrl: $imageUrl) {
    id
    title
    content
    imageUrl
  }
}
`

export default function AddBlog() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const variables = {
      title,
      content,
      imageUrl: imageUrl || null,
    };

    try {
      const blogData = await gqlClient.request(CREATE_BLOG, variables) as {createBlog: Blog}
      
      console.log("Response from server:", blogData);

      if(blogData?.createBlog) {
        alert("Blog created successfully!");
        setTitle("");
        setContent("");
        setImageUrl("");
      } else {
        alert("Failed to create blog. Check console for details.");
        console.error("No blog data returned:", blogData);
      }
    } catch (error) {
      alert("Error creating blog. Check console for details.");
      console.error("Error creating blog:", error);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-4 border bg-white rounded-2xl">
      <h1 className="text-2xl font-bold mb-4 text-black">Add New Blog</h1>

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="title" className="block mb-2 text-black">
            Title
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 border text-black bg-white"
            placeholder="Enter blog title"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="content" className="block mb-2 text-black">
            Content
          </label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={5}
            className="w-full p-2 border text-black bg-white"
            placeholder="Enter blog content"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="imageUrl" className="block mb-2 text-black">
            Image URL (Optional)
          </label>
          <input
            type="url"
            id="imageUrl"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            className="w-full p-2 border text-black bg-white"
            placeholder="https://example.com/image.jpg"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 hover:bg-blue-600"
        >
          Add Blog
        </button>
      </form>
    </div>
  );
}
