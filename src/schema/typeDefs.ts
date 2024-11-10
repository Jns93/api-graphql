import { gql } from "apollo-server";

const typeDefs = gql`
  type User {
    id: ID!
    name: String!
    email: String!
    posts: [Post]
  }

  type Post {
    id: ID!
    title: String!
    content: String!
    author: User!
    comments: [Comment]
  }

  type Comment {
    id: ID!
    content: String!
    author: User!
  }

  type Query {
    users: [User!]!
    posts: [Post!]!
    post(id: ID!): Post
    user(id: ID!): User
  }

  type Mutation {
    createUser(name: String!, email: String!): User!
    updateUser(id: ID!, name: String!): User!
    createPost(title: String!, content: String!, authorId: ID!): Post!
    addComment(postId: ID!, content: String!, authorId: ID!): Comment!
  }
`;

export default typeDefs;
