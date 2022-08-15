/*
 * @Author: 18062706139 2279549769@qq.com
 * @Date: 2022-08-15 10:48:11
 * @LastEditors: 18062706139 2279549769@qq.com
 * @LastEditTime: 2022-08-15 11:14:42
 * @FilePath: /api_server/router/artcate.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
const express = require('express');

const router = express.Router()

const artcate_handler = require('../router_handler/artcate')

// 1. 导入验证数据的中间件
const expressJoi = require('@escook/express-joi')
// 2. 导入需要的验证规则对象
const { add_cate_schema } = require('../schema/artcate')

router.get('/cates', artcate_handler.getArticleCates)
// 新增文章分类的路由
router.post('/addcates', expressJoi(add_cate_schema),artcate_handler.addArticleCates)

module.exports = router