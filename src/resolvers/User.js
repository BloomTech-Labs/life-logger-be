function events(parent, args, context) {
  return context.prisma.user({ id: parent.id }).events()
}

module.exports = {
  events,
}