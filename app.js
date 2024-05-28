const express = require("express");
const mongoose = require("mongoose");
const cors = require('cors') 
const bodyParser = require("body-parser"); // body를 object 형태로 바로 바꿔주는 라이브러리
const indexRouter = require("./routes/index") // router 가져오기
require('dotenv').config()

const app = express();
const MONGODB_URI_PROD = process.env.MONGODB_URI_PROD
//console.log("mogoouri", MONGODB_URI_PROD)
app.use(bodyParser.json());
app.use(cors());
app.use("/api",indexRouter); // indexRouter 사용할 수 있도록 설정

const mongoURI = MONGODB_URI_PROD;

// restful API => 주소 + http 명령어
// 1. 할 일을 추가할 수 있다. C /tasks post
// 2. 할 일 리스트를 볼 수 있다. R /tasks get
// 3. 할 일에 대해서 끝남 안끝남 표시를 할 수 있다. U /tasks/:id put id => 어떤 할 일? id 값 붙여주기
// 4. 할 일을 삭제할 수 있다. D /task/:id delete => 어떤걸 삭제할건데? id부여

mongoose     //useNewUrlParser:true => node.js version 4.0.0 부터는 사용 안해도 됨
  .connect(mongoURI, {}) // mongoose uri 옛주소, 현주소 모두 잘 사용할 수 있도록 도와줘..
  .then(() => {
    console.log("mongoose connected");
  })
  .catch((err) => {
    console.log("DB connection fail", err);
  });

  app.listen(process.env.PORT || 5000, () => { // process.env.PORT || 5000, () => {}
    console.log("server on 5000");
  });

  // 2. 로그인
  // 이메일 패스워드를 입력해서 보냄
  // 데이터베이스에 해당 이메일과 패스워드를 가진 유저가 있는지 확인
  // 없으면 로그인 실패
  // 있다면? 유저 정보 + 토큰
  // 프론트엔드에서는 이 정보를 저장

  // 1. 라우터 설정 => 주소값 알려주기
  // 2. 이메일 패스워드 정보 읽어오기
  // 3. 이메일을 가지고 유저정보 가져오기 
  // 4. 이 유저에 디비에 있는 패스워드와 프론트엔드가 보낸 패스워드가 같은지 비교
  // 5. 맞다? 그러면 토큰발행
  // 6. 틀리면? 에러메세지 보냄
  // 7. 응답으로 유저정보 + 토큰 보냄