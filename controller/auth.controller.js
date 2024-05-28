const authController = {};
const jwt = require("jsonwebtoken")
require("dotenv").config()  // node.js에서 env 파일을 읽이 위해 필요한 함수
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY

authController.authenticate = (req,res,next) => { // next를 통해 미들웨어 실행
    try{
        const tokenString = req.headers.authorization // Bearer ~~~
        if (!tokenString) {
            throw new Error("invalid token")
        }
        const token = tokenString.replace("Bearer ", ""); // jwt가 토큰 유통기한 값이 만료됐는지 유무를 확인해준다.s
        jwt.verify(token, JWT_SECRET_KEY, (error, payload) => {}) // 일반 토큰값만 넣어주는 것이 아닌 암호화된 키도 같이 넘겨준다.
        if(error) {
            throw new Error("invalid token")
        }
       // res.status(200).json({status: "success", userId: payload._id })
       req.userId = payload._id
       next();
        

    }catch(error) {
        res.status(400).json({status:"fail", message: error.message})
    }
}

module.exports = authController;

// 미들웨어
