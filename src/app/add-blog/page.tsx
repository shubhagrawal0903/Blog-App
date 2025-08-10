'use client'
import { gql } from 'graphql-request'
import { FormEvent, useState } from 'react'
import gqlClient from '@/services/gql'
import { useRouter } from 'next/navigation'

const CREATE_BLOG = gql`
  mutation CreateBlog($title: String!, $content: String!, $imageUrl: String) {
    createBlog(data: {
      title: $title,
      content: $content,
      imageUrl: $imageUrl
    }) {
      id,
      content,
      imageUrl,
      title
    }
  }
`

export default function Page() {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const router = useRouter()

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()

    try {
       const blogData = await gqlClient.request(CREATE_BLOG, {
        title,
        content,
        imageUrl : imageUrl
      })
      router.push('/')
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-96 mx-auto mt-10">
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="border px-4 py-2"
        required
      />
      <textarea
        placeholder="Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="border px-4 py-2"
        required
      />
      <input
        type="text"
        placeholder="Image URL"
        value={imageUrl}
        onChange={(e) => setImageUrl(e.target.value)}
        className="border px-4 py-2"
      />
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2"
      >
        Create Blog
      </button>
    </form>
  )
}
