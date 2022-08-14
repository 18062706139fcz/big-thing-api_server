/*
 * @Author: 18062706139 2279549769@qq.com
 * @Date: 2022-08-14 13:02:33
 * @LastEditors: 18062706139 2279549769@qq.com
 * @LastEditTime: 2022-08-14 13:11:09
 * @FilePath: /api_server/router/user.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
const express = require('express');
const router = express.Router()
const user_handler = require('../router_handler/user')


router.post('/login', user_handler.login)

router.post('/reguser', user_handler.regUser)

module.exports = router