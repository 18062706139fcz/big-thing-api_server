/*
 * @Author: 18062706139 2279549769@qq.com
 * @Date: 2022-08-16 09:38:32
 * @LastEditors: 18062706139 2279549769@qq.com
 * @LastEditTime: 2022-08-16 09:43:21
 * @FilePath: /api_server/router/article.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
const express = require('express');

const router = express.Router();

const article = require('../router_handler/article')

router.post('/add', article.addArticle)

module.exports = router