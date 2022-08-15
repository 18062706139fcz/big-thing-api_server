/*
 * @Author: 18062706139 2279549769@qq.com
 * @Date: 2022-08-15 11:11:39
 * @LastEditors: 18062706139 2279549769@qq.com
 * @LastEditTime: 2022-08-15 11:14:30
 * @FilePath: /api_server/schema/artcate.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
const Joi = require('joi')

const name = Joi.string().required()
const alias = Joi.string().alphanum().required()

module.exports.add_cate_schema = {
    body: {
        name,
        alias
    }
}