'use client'
import { Blog } from "@/generated/prisma";
import { Dialog, Flex, TextField, Text, Button } from "@radix-ui/themes";
import { useState } from "react";
import gqlClient from "@/services/gqlClient";
import { gql } from "graphql-request";

const UPDATE_BLOG = gql`
mutation UpdateBlog($updateBlogId: String!, $title: String, $content: String, $imageUrl: String) {
  updateBlog(id: $updateBlogId, title: $title, content: $content, imageUrl: $imageUrl)
}
`;


export default function UpdateBlogBtn({ blog }: {
    blog: Blog
}) {
      const [title, setTitle] = useState(blog.title);
      const [content, setContent] = useState(blog.content);
      const [imageUrl, setImageUrl] = useState(blog.imageUrl || "");

      const handleUpdate = async () => {
        try {
          const response = await gqlClient.request(UPDATE_BLOG, {
            updateBlogId: blog.id,
            title,
            content,
            imageUrl: imageUrl || null
          }) as { updateBlog: boolean };
          if (response.updateBlog) {
            alert("Blog updated successfully");
          } else {
            alert("Failed to update blog");
          }
        } catch (error) {
          console.error("Error updating blog:", error);
          alert("Error updating blog");
        }
      };
    return (
        <Dialog.Root>
            <Dialog.Trigger>
                <Button className="flex">Edit Blog</Button>
            </Dialog.Trigger>

            <Dialog.Content maxWidth="450px">
                <Dialog.Title>Edit Blog</Dialog.Title>
                <Dialog.Description size="2" mb="4">
                    Make changes to your blog.
                </Dialog.Description>

                <Flex direction="column" gap="3">
                    <label>
                        <Text as="div" size="2" mb="1" weight="bold">
                            Title
                        </Text>
                        <TextField.Root
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Enter blog title"
                        />
                    </label>
                    <label>
                        <Text as="div" size="2" mb="1" weight="bold">
                            Content
                        </Text>
                        <TextField.Root
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            placeholder="Enter blog content"
                        />
                    </label>
                    <label>
                        <Text as="div" size="2" mb="1" weight="bold">
                            Image URL
                        </Text>
                        <TextField.Root
                            value={imageUrl}
                            onChange={(e) => setImageUrl(e.target.value)}
                            placeholder="Enter image URL (optional)"
                        />
                    </label>
                </Flex>

                <Flex gap="3" mt="4" justify="end">
                    <Dialog.Close>
                        <Button variant="soft" color="gray">
                            Cancel
                        </Button>
                    </Dialog.Close>
                    <Dialog.Close>
                        <Button onClick={handleUpdate}>Save</Button>
                    </Dialog.Close>
                </Flex>
            </Dialog.Content>
        </Dialog.Root>

    )
}    