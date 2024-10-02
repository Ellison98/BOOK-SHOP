const express = require('express');  // express 모듈을 가져온다.
const router = express.Router();
const conn = require('../mariadb');  // db 연결
const {
    join,
    login, 
    requestPasswordReset,
    passwordReset 
} = require('../controller/UserController');  // 회원가입 컨트롤러

router.use(express.json());

// 회원가입
router.post('/join', join);

// 로그인
router.post('/login', login);

// 비밀번호 초기화 요청
router.post('/reset', requestPasswordReset);

// 비밀번호 초기화
router.put('/reset', passwordReset);

module.exports = router;