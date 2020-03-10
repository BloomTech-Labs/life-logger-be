function createUser(root, args, context, info) {
  return context.prisma.createUser({
    username: args.username,
    password: args.password,
    email: args.email,
  });
}

function createEvent(root, args, context, info) {
  return context.prisma.createEvent({
    title: args.title,
    description: args.description,
    createdBy: { connect: { id: args.userId}}
  })
}


module.exports = {
  createUser,
  createEvent
}