import { v4 as uuidv4 } from 'uuid';
import { User, Post, Comment } from './types';
import { Resolvers } from './types';
import { users, posts, comments } from '../data/fakeData'; 

const resolvers: Resolvers = {
  Query: {
    users: (): User[] => users,
    posts: (): Post[] => posts,
    post: (_, { id }: { id: string }): Post | undefined => posts.find((post) => post.id === id),
    user: (_, { id }: { id: string }): User | undefined => users.find((user) => user.id === id),
  },

  Mutation: {
    createUser: (_, { name, email }: { name: string; email: string }): User => {
      const newUser: User = { id: uuidv4(), name, email, posts: [] };
      users.push(newUser);
      return newUser;
    },
    updateUser: (_, { id, name }: { id: string; name: string }): User | undefined => {
      const user = users.find((user) => user.id === id);
      if (!user) throw new Error('User not found');
      user.name = name;
      return user;
    },
    createPost: (_, { title, content, authorId }: { title: string; content: string; authorId: string }): Post => {
      const author = users.find((user) => user.id === authorId);
      if (!author) throw new Error('Author not found');
      const newPost: Post = { id: uuidv4(), title, content, author, comments: [] };
      posts.push(newPost);
      author.posts.push(newPost);
      return newPost;
    },
    addComment: (_, { postId, content, authorId }: { postId: string; content: string; authorId: string }): Comment => {
      const post = posts.find((post) => post.id === postId);
      const author = users.find((user) => user.id === authorId);
      if (!post || !author) throw new Error('Post or author not found');
      const newComment: Comment = { id: uuidv4(), content, author };
      comments.push(newComment);
      post.comments.push(newComment);
      return newComment;
    },
  },
};

export default resolvers;
