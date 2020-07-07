const express = require("express");
const router = express.Router();


const {
  register,
  logIn,
  delUserByID,
  delUserByEmail,
  updateUser,
  getUser,
  getUsers
} = require("./handlers");

const {
  validateIsEmailTaken,
  validateRegistration,
  validateLogin,
  validateID,
  validateDeleteByEmail,
  validateIsuserNameTaken
} = require("./validators");

router.get("/", getUsers);
router.post("/register", validateRegistration, validateIsuserNameTaken,  validateIsEmailTaken, register);
router.post("/login", validateLogin, logIn);
router.delete("/:id", validateID, delUserByID);
router.get("/:id", validateID, getUser);
router.put("/:id", validateID, updateUser);

module.exports = router;