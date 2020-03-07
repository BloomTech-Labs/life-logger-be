const { GraphQLServer } = require('graphql-yoga');

const Query = require('./src/resolvers/Query')
const Mutation = require('./src/resolvers/Mutation')
const User = require('./src/resolvers/User')
const Event = require('./src/resolvers/Event')

const resolvers = {
  Query,
  Mutation,
  User,
  Event,
}

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
  // context: { prisma }
})

server.start(() => console.log(`Server is running on http://localhost:4000`))