// test user before implementing database
const testUsers = [{
  id: 'id-0',
  username: 'John Doe',
  password: 'pass',
  email: 'john@mail.com'
}]


function allUsers() {
  return context.prisma.users();
  // return testUsers
}

module.exports = {
  allUsers,
}




const resolvers = {
  Query: {
    info: () => `This is the API of a Hackernews Clone`,
    feed: (root, args, context, info) => {
      return context.prisma.links()
    },
  },
  Mutation: {
    post: (root, args, context) => {
      return context.prisma.createLink({
        url: args.url,
        description: args.description,
      })
    },
  },
}