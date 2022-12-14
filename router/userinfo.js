/*
 * @Author: 18062706139 2279549769@qq.com
 * @Date: 2022-08-15 08:54:08
 * @LastEditors: 18062706139 2279549769@qq.com
 * @LastEditTime: 2022-08-15 10:30:54
 * @FilePath: /api_server/router/userinfo.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
const express = require('express');

const router = express.Router();

const userinfo_handler =  require('../router_handler/userinfo')

// 1. 导入验证数据的中间件
const expressJoi = require('@escook/express-joi')
// 2. 导入需要的验证规则对象
const { update_userinfo_schema, update_password_schema, update_avatar_schema } = require('../schema/user')

router.get('/userinfo', userinfo_handler.getUserInfo)

router.post('/userinfo', expressJoi(update_userinfo_schema),userinfo_handler.updateUserInfo)

router.post('/updatepwd', expressJoi(update_password_schema),userinfo_handler.updatePassword)

router.post('/update/avatar', expressJoi(update_avatar_schema),userinfo_handler.updateAvatar)

module.exports = router