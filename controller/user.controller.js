const User = require("../model/User")
const bcrypt = require("bcrypt")
const saltRounds = 10; // 암호 숫자 지정

const userController = {}

userController.createUser = async (req,res) => {
    try {
        const {email, name , password} = req.body
        const user = await User.findOne({email: email})
        if(user) {
            throw new Error("이미 가입된 유저입니다.")
        }
        // 패스워드 암호화
        const salt = bcrypt.genSaltSync(saltRounds);
        const hash = bcrypt.hashSync(password, salt); // 암호화 작업
        console.log("hash", hash);
        const newUser = new User ({email, name, password : hash});
        await newUser.save()
        res.status(200).json({ status : "success"});

    } catch(error) {
        res.status(400).json({ status: "fail", error});
        
    }
};

userController.loginWithEmail = async (req,res) => {
    try{
        const {email, password} = req.body
        const user = await User.findOne({ email }, "-createAt -updatedAt -__v") // 하나만 찾으면 된다. 시간이 걸리기 떄문에 await 사용
        if(user) { // 비밀번호가 같은지 비교
            // password ===  // 유저가 입력한 그 자체
            // user.password // 암호화된 패스워드  즉, 위 두 개와 비교 불가능
            const isMath = bcrypt.compareSync(password, user.password)
            if(isMath){ // 맞으면 토큰 발행 (but,, 어떻게? 토큰 발행 라이브러리 => jsonwebtoken)
                const token = user.generateToken();
                return res.status(200).json({ status : "success" , user, token})
            }
        }
        throw new Error("아이디 또는 비밀번호가 일치하지 않습니다.")
    }catch(error) {
        res.status(400).json({ status : "fail", error })
    }
}

module.exports = userController