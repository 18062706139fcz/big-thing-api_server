/*
 * @Author: 18062706139 2279549769@qq.com
 * @Date: 2022-08-14 15:01:37
 * @LastEditors: 18062706139 2279549769@qq.com
 * @LastEditTime: 2022-08-14 15:19:01
 * @FilePath: /api_server/schema/user.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
// 导入定义验证规则的包
const Joi = require('joi')


// 定义用户和密码的验证规则
const username = Joi.string().alphanum().min(1).max(10).required()
const password = Joi.string()
                .pattern(/^[\S]{6,12}$/)
                .required()
// \S 非空字符


// define a rule
exports.reg_login_schema = {
    // 都在body里存着
    body: {
        username: username,
        password: password,
    }
}