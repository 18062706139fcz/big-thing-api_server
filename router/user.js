/*
 * @Author: 18062706139 2279549769@qq.com
 * @Date: 2022-08-14 13:02:33
 * @LastEditors: 18062706139 2279549769@qq.com
 * @LastEditTime: 2022-08-14 15:26:59
 * @FilePath: /api_server/router/user.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
const express = require('express');
const router = express.Router()
const user_handler = require('../router_handler/user')

// 1. 导入验证数据的中间件
const expressJoi = require('@escook/express-joi')
// 2. 导入需要的验证规则对象
const { reg_login_schema } = require('../schema/user')
// 可以复用这个校验规则
router.post('/login', expressJoi(reg_login_schema),user_handler.login)
// 3. 传入 expressJoi(reg_login_schema)
router.post('/reguser', expressJoi(reg_login_schema),user_handler.regUser)

module.exports = router