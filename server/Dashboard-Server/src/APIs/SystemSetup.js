const express = require("express")
const router = express.Router();

const Auth = require("../middleware/Auth")
const { encrypt, decrypt } = require("../middleware/encrypt-decrypt")
const { Get_Validator, Post_Validator, Put_Validator } = require("../middleware/Validate")
const {  UserMaster_Add, UserMasterId_Get } = require("../controller/SystemSetupController")
const {  Sch_UserMaster_Add, Sch_UserMasterId_Get } = require('../Validator/SystemSetup.Schema');


router.post('/AddUserMaster', decrypt,  Post_Validator(Sch_UserMaster_Add), UserMaster_Add, encrypt)

router.get('/GetUserMasterId', Get_Validator(Sch_UserMasterId_Get), UserMasterId_Get, encrypt)

module.exports = router