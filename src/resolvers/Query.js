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