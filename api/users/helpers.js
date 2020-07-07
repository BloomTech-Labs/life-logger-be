const db = require("../../data/KnexConfig");

const GetByEmail = email => {
  return db("users").where(email).first()
};


const getUserByfilter = filter => {
  return db("users")
    .select(
      "username",
      "email",
      "id"
    )
    .where(filter);
};

const addUser = userObj => {
    console.log("user", userObj)
  return (
    db("users")
      .insert(userObj, "id")
      //destructure out of the array as an array
      .then(([id]) => {
        //destructure out of the object to pass to filter
        return getUserByfilter({ id });
      })
  );
};
// by email or ID
const deleteUser = filter => {
  return db("users").where(filter).del()
}
const updateUser = (id, changes) => {
  return db("users").where({id}).update(changes, "id")
}
const allUsers = () => {
  return db("users")
}
const GetByUsername = username => {
    return db("users").where(username).first()
  };
module.exports = {
  getUserByfilter,
  addUser,
  GetByEmail,
  deleteUser,
  updateUser,
  allUsers,
  GetByUsername
};