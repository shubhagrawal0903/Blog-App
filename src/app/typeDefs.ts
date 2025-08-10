import { gql } from "graphql-request";


const typeDefs = gql`
  type Query {
    blog(id: String): Blog
    blogs(q: String): [Blog]
    currentUser: User,
    currentUserBlogs: [Blog]
  }

  type Mutation {
    createBlog(title: String!, content: String!, imageUrl: String): Blog,
    deleteBlog(id: String!): Boolean!,
    updateBlog(id: String!, title: String, content: String, imageUrl: String): Boolean!
    signUpUser(name: String!, email: String!, password: String!): Boolean!
    loginUser(email: String!, password: String!): Boolean!
  }

  type User {
    id: String,
    name: String,
    email: String
  }

  type Blog {
    id: String,
    title: String,
    content: String,
    imageUrl: String
  }
`;

export default typeDefs;