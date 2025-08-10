import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { ApolloServer } from "@apollo/server";
import { NextRequest } from "next/server";
import { createBlog, deleteBlog, getBlogById, getBlogs, updateBlog } from "./resolvers/blog";
import typeDefs from "@/app/typeDefs";
import { currentUserBlogs, loginUser, signUpUser } from "./resolvers/user";
import { getUserFromCookies } from "@/helper";


const resolvers = {
    Query: {
        blog: getBlogById,
        blogs: getBlogs,
        currentUser: getUserFromCookies,
        currentUserBlogs
    },
    Mutation: {
      createBlog,
      deleteBlog,
      updateBlog,
      signUpUser,
      loginUser
      
    }
};

const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
});

const handler = startServerAndCreateNextHandler<NextRequest>(apolloServer, {
    context: async req => ({ req }),
});

export { handler as GET, handler as POST };