const express = require("express");
const router = express.Router();
const userController = require("../controller/user");
const auth = require("../middlewares/auth");

router.get("/", auth, userController.getUser);
router.get("/:id", userController.getUserById);
router.post("/", userController.addUser);
router.put("/:id", userController.updateUser);
router.delete("/:id", userController.deleteUser);

module.exports = router;
