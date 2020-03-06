const { GraphQLServer } = require('graphql-yoga');

// const resolvers = {
//   Query,
//   Mutation,
//   Subscription,
//   User,
//   Link,
//   Vote,
// }

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
  context: { prisma }
})

server.start(() => console.log(`Server is running on http://localhost:4000`))