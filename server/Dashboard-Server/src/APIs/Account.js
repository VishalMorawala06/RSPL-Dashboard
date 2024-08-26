const express = require("express");
const router = express.Router();
const { UserLogin, UserRegistration, UpdateUser } = require("../controller/AccountController");
const Auth = require("../middleware/Auth");
const { encrypt, decrypt } = require("../middleware/encrypt-decrypt");
const { Get_Validator, Post_Validator, Put_Validator, Delete_Validator } = require("../middleware/Validate");
const { Sch_UserLogin_Get } = require("../Validator/Account.Schema");

router.get("/UserLogin", Get_Validator(Sch_UserLogin_Get), UserLogin, encrypt);
router.post("/UserRegistration", UserRegistration);
router.put("/UpdateUser", UpdateUser);

module.exports = router;