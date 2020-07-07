
const helper = require("./helpers");

const validateRegistration = (req, res, next) => {
  const user = {
    username: req.body.username,
    password: req.body. password,
    email: req.body.email,
  };
  if (
    !user.username ||
    !user.password ||
    !user.email 
  ) {
    res.status(400).json({
      message: "must include username, password, , and email"
    });
  }

  next();
};

const validateLogin = (req, res, next) => {
  const { password, username} = req.body;
  if (!password) {
    res.status(400).json({
      message: "most include Password"
    });
  } else if (!username) {
    res.status(400).json({
      message: "most include Email"
    });
  } else {
    next();
  }
};

const validateID = (req, res, next) => {
  const { id } = req.params;
  helper.getUserByfilter({ id }).then(([user]) => {
    if (!user) {
      res.status(400).json({ message: "user with this ID does not exist" });
    } else next();
  });
};

const validateIsEmailTaken = (req, res, next) => {
  const {email} = req.body
  helper.GetByEmail({email})
  .then(x => {
    if(x){
      res.status(400).json({message: "Email is already in use"})
    }
    else next()
  })
  .catch(err => res.status(400).json({message: err}))

}

const validateIsuserNameTaken = (req, res, next) => {
    const {username} = req.body
    helper.GetByUsername({username})
    .then(x => {
      if(x){
        res.status(400).json({message: "username is already in use"})
      }
      else next()
    })
    .catch(err => res.status(400).json({message: err}))
  
  }


const validateDeleteByEmail = (req, res, next) => {
  const {email} = req.body
  helper.GetByEmail({email})
  .then(x => {
    if(!x){
      res.status(400).json({message: "email does not match account email"})
    }
    else next()
  })
  .catch(err => res.status(400).json({message: err}))

}
module.exports = {
  validateRegistration,
  validateLogin,
  validateID,
  validateIsEmailTaken,
  validateDeleteByEmail,
  validateIsuserNameTaken
};