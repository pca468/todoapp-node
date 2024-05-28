const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const jwt = require("jsonwebtoken");
require("dotenv").config(); // env파일 불러오기
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

const userSchema = Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timeStamps: true }
); // 언제 유저가 생성됐는지 나타냄.
userSchema.methods.toJSON = function () { //toJSON  Object를 프론트엔드로 보낼 때 JSON을 사용
    const obj = this._doc   // this만 입력하면 모든 정보 다 나옴
    delete obj.password; // doc 안에 객체 중 password 빼기
    delete obj.updatedAt;
    delete obj.__v;

    return obj

};

userSchema.methods.generateToken = function () {
  const token = jwt.sign({ _id: this._id }, JWT_SECRET_KEY, {
    expiresIn: "1d",
  }); // token은 유통기한이 있다.
  // 계속 같은 token을 사용하면 token 훔쳐질 수 있기 때문에 기한을 둠
  return token;
};
const User = mongoose.model("User", userSchema);

module.exports = User;
