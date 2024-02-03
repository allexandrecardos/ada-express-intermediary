// routes/users.js

const express = require("express");
const UserController = require("../controllers/UserController");
const router = express.Router();

const userController = new UserController()

router.get("/", userController.getAllUsers);

router.get("/:id", userController.getUserById);
 
router.put("/:id", userController.updateUser);
 
router.delete("/:id", userController.deleteUser);

module.exports = router;