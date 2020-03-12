function info() {
  return "This is GraphQL server for Life Logger project"
}

function allUsers(root, args, context, info) {
  return context.prisma.users();
}

function user(root, args, context, info) {
  return context.prisma.user({id: args.id});
}

module.exports = {
  allUsers,
  user,
  info,
}