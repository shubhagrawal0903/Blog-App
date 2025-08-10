import gqlClient from "@/services/gqlClient";
import { gql } from "graphql-request";
import Link from "next/link";

const SEARCH_QUERY = gql`
query Blogs($q: String) {
  blogs(q: $q) {
    id
    title
    content
    imageUrl
  }
}
`;

export default async function SearchPage({ searchParams }: {
    searchParams: Promise<{ q: string }>
}) {
    const query = await searchParams;
    const searchQuery = query.q;

    const data = await gqlClient.request(SEARCH_QUERY, { q: searchQuery }) as any;
    type Blog = {
        id: string;
        title: string;
        content: string;
        imageUrl?: string;
    };

    const blogs: Blog[] = data?.blogs ?? [];
    return (
        <div>
            {
            blogs.map((elem: Blog) => {
                return <div key={elem.id}>
                <Link href={"/blog/" + elem.id}>
                <h2>{elem.title}</h2>
                <p>{elem.content}</p>
                </Link>
                </div>
            })
            }
        </div>
    );
}
