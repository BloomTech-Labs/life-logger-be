const Helper = require("./helpers");
const hash = require("../../utils/hashPass");
const compare = require("../../utils/compareHash");
const generateToken = require("../../utils/generateToken");

const register = (req, res) => {
  req.body.password = hash(req.body.password);
  const user = {
    username: req.body.username,
    email: req.body.email,
    password: req.body.password 

  };

  Helper.addUser(user)
    .then(([user]) => {
      token = generateToken(user);
      res.status(200).json({ data: { token, user } });
    })
    .catch(err => res.status(500).json({ message: err }));
};

const logIn = (req, res) => {
  const { username, password } = req.body;

  Helper.GetByUsername({ username })
    .then(x => {
      const bool = compare(password, x.password);
      if (x && bool) {
        token = generateToken(x);
        Helper.getUserByfilter({ username: req.body.username })
          .then(user => {
            res.status(200).json({ data: { token, user } });
          })
          .catch(err => res.status(500).json({ message: err }));
      } else {
        res.status(400).json({ message: "invalid credential" });
      }
    })
    .catch(err => res.status(500).json({ message: err }));
};

const delUserByID = (req, res) => {
  const { id} = req.params;
  Helper.deleteUser({ id })
    .then(() => res.status(201).end())
    .catch(err => res.status(500).json({ message: err }));
};



const delUserByEmail = (req, res) => {
  const { email } = req.body;
  Helper.deleteUser({ email })
    .then(() => res.status(201).end())
    .catch(err => res.status(500).json({ message: err }));
};

const updateUser = (req, res) => {
  req.body.password = hash(req.body.password);
  const { id } = req.params;
  const user = {
    username: req.body.username,
    password: req.body.password,
    email: req.body.email
  };

  Helper.updateUser(id, user)
    .then(() => {
      Helper.getUserByfilter({ id }).then(([user]) => {
        res.status(200).json({ data: { user } });
      });
    })
    .catch(err => res.status(500).json({ message: err }));
};
const getUser = (req, res) => {
  const { id } = req.params;
  Helper.getUserByfilter({ id })
    .then(([user]) => {
      res.status(200).json({ data: { user } });
    })
    .catch(err => res.status(500).json({ message: err }));
};
const getUsers = (req, res) => {
  Helper.allUsers().then(users => res.json({ data: { users } }));
};

module.exports = {
  register,
  logIn,
  delUserByID,
  delUserByEmail,
  updateUser,
  getUser,
  getUsers

};