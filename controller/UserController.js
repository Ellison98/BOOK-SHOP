const conn = require('../mariadb');  // db 연결
const {StatusCodes} = require('http-status-codes');  // status code 모듈
const jwt = require('jsonwebtoken');  // jwt 모듈
const dotenv = require('dotenv');  // dotenv 모듈
dotenv.config();  // dotenv 설정

const join = (req, res) => {
    const { email, password } = req.body;

    let sql = 'INSERT INTO users (email, password) VALUES (?, ?)';
    let values = [email, password];

    conn.query(sql, values,
        (err, result) => {
            if (err) {
                console.log(err);
                return res.status(StatusCodes.BAD_REQUEST).end();
            } 

            return res.status(StatusCodes.CREATED).json(result);
        })
};

const login = (req, res) => {
    const { email, password } = req.body;

    let sql = 'SELECT * FROM users WHERE email = ?';
    conn.query(sql, values,
        (err, result) => {
            if (err) {
                console.log(err);
                return res.status(StatusCodes.BAD_REQUEST).end();
            }

            const loginUser = result[0];
            if (loginUser && loginUser.password === password) {
                const token = jwt.sign({ 
                    email : loginUser.email,
                }, process.env.PRIVATE_KEY, {
                    expiresIn : '5m',
                    issuer : 'songa'
                });

                // 토큰 쿠기에 담기
                res.cookie('token', token, {
                    httpOnly : true,
                });
                console.log(token);

                return res.status(StatusCodes.OK).json(result);
            } else {
                return res.status(StatusCodes.UNAUTHORIZED).end();
            }
        }
    )
};

const requestPasswordReset = (req, res) => {
    res.json('비밀번호 초기화 요청');
};

const passwordReset = (req, res) => {
    res.json('비밀번호 초기화');
};

module.exports = { join, login, requestPasswordReset, passwordReset };