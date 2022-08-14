/*
 * @Author: 18062706139 2279549769@qq.com
 * @Date: 2022-08-14 13:01:10
 * @LastEditors: 18062706139 2279549769@qq.com
 * @LastEditTime: 2022-08-14 13:36:31
 * @FilePath: /api_server/app.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
const express = require('express');

const app = express()

const cors = require('cors')
app.use(cors())

const userRouter = require('./router/user');

app.use(express.urlencoded({extended: false}))

app.use('/api', userRouter)



app.listen(3007,() => {
    console.log('api_server running at http://127.0.0.1:3007')
})