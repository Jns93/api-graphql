import { ApolloServer } from "apollo-server";
import typeDefs from "./schema/typeDefs";
import resolvers from "./schema/resolvers";

// Initialize Apollo Server
const server = new ApolloServer({
    typeDefs,
    resolvers
});

// Start the server
server.listen({ port: 4000 }).then(({ url }) => {
    console.log(`Server started on => ${url}`);
});
