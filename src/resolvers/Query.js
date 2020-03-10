// test user before implementing database
const testUsers = [{
  id: 'id-0',
  username: 'John Doe',
  password: 'pass',
  email: 'john@mail.com'
}]

function info() {
  return "This is GraphQL server for Life Logger project"
}

function allUsers(root, args, context, info) {
  return context.prisma.users();
}

module.exports = {
  allUsers,
  info,
}