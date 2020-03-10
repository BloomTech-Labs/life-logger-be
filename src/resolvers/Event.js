function createdBy(parent, args, context) {
  return context.prisma.event({ id: parent.id }).createdBy()
}

module.exports = {
  createdBy,
}