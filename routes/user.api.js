const express = require('express')
const router = express.Router();
const userController = require('../controller/user.controller')

// 1. 회원가입 endPoint
// router.post("/", (req,res) => { //user post => create user
//     res.send("create user controller will be here");
// }); 

router.post("/", userController.createUser);
router.post("/login", userController.loginWithEmail); // why? post? => 이메일 패스워드를 보내려면 url을 보내야하는데 패스워드를 넣으면 안된다. (get을 사용하지 않는 이유)


module.exports = router;