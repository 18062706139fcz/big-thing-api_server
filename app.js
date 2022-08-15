/*
 * @Author: 18062706139 2279549769@qq.com
 * @Date: 2022-08-14 13:01:10
 * @LastEditors: 18062706139 2279549769@qq.com
 * @LastEditTime: 2022-08-15 08:56:32
 * @FilePath: /api_server/app.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
const express = require('express');

const app = express()

const cors = require('cors')
app.use(cors())

const userRouter = require('./router/user');
// @hapi不可用了
const Joi = require('joi');

app.use(express.urlencoded({extended: false}))
// 封装一个函数
app.use((req, res, next) => {
    // status 默认值为1,表示失败的情况
    // err 的值，可能是一个错误对象，也可能是一个错误的描述字符串
    res.cc = function(err, status = 1) {
        res.send({
            status,
            message: err instanceof Error ? err.message : err
        })
    }
    next()
})

// 在路由之前配置解析 Token 的中间件
const expressJWT = require('express-jwt')
const config = require('./config')

app.use(expressJWT({secret: config.jwtSecretKey}).unless({path: [/^\/api\//]}))

app.use('/api', userRouter)

const userinfoRouter = require('./router/userinfo')

app.use('/my', userinfoRouter)

app.use((err, req, res, next) => {
    // 验证失败导致的错误
    if(err instanceof Joi.ValidationError) return res.cc(err)
    // 身份认证失败后的错误
    if(err.name === 'UnauthorizedError') return res.cc('身份认证失败')
    // 未知错误
    res.cc(err)
})


app.listen(3007,() => {
    console.log('api_server running at http://127.0.0.1:3007')
})