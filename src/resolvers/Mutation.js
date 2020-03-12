const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { APP_SECRET, getUserId } = require('../utils')

// this is old implementation:
// function createUser(root, args, context, info) {
//   return context.prisma.createUser({
//     username: args.username,
//     password: args.password,
//     email: args.email,
//   });
// }

async function signup(parent, args, context, info) {
  // hash password first
  const password = await bcrypt.hash(args.password, 10)
  //insert user to database
  const user = await context.prisma.createUser({
    ...args,
    password
  })
  // generate token:
  const token = jwt.sign({ userId: user.id }, APP_SECRET)

  return {
    token,
    user,
  }
}

async function login(parent, args, context, info) {
  // get user from DB
  const user = await await context.prisma.user({ email: args.email })
  // if user doesnt exists, throw error
  if (!user) {
    throw new Error('No such user fount')
  }

  // validate password:
  const valid = await bcrypt.compare(args.password, user.password)
  if (!valid) {
    throw new Error('Invalid password')
  }

  const token = jwt.sign({ userId: user.id }, APP_SECRET)

  return {
    token,
    user,
  }
}

function createEvent(root, args, context, info) {
  const userId = getUserId(context)
  return context.prisma.createEvent({
    title: args.title,
    description: args.description,
    createdBy: { connect: { id: userId } },
  })
}


module.exports = {
  signup,
  login,
  createEvent,
}