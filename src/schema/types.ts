import { IResolvers } from '@graphql-tools/utils';

export interface User {
    id: string;
    name: string;
    email: string;
    posts: Post[];
  }
  
  export interface Post {
    id: string;
    title: string;
    content: string;
    author: User;
    comments: Comment[];
  }
  
  export interface Comment {
    id: string;
    content: string;
    author: User;
  }
  
  export interface Resolvers extends IResolvers {
    Query: {
      users: () => User[];
      posts: () => Post[];
      post: (parent: any, args: { id: string }) => Post | undefined;
      user: (parent: any, args: { id: string }) => User | undefined;
    };
    Mutation: {
      createUser: (parent: any, args: { name: string; email: string }) => User;
      updateUser: (parent: any, args: { id: string; name: string }) => User | undefined;
      createPost: (parent: any, args: { title: string; content: string; authorId: string }) => Post;
      addComment: (parent: any, args: { postId: string; content: string; authorId: string }) => Comment;
    };
  }
  
  export default Resolvers;
  