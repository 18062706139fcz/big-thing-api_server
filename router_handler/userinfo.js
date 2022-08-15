/*
 * @Author: 18062706139 2279549769@qq.com
 * @Date: 2022-08-15 09:04:02
 * @LastEditors: 18062706139 2279549769@qq.com
 * @LastEditTime: 2022-08-15 09:33:32
 * @FilePath: /api_server/router_handler/userinfo.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
// 导入
const db = require('../db/index')
// 获取用户基本信息的处理函数
exports.getUserInfo = (req, res) => {
    // 写 SQL
    const sql = 'select id, username, nickname, email, user_pic from ev_users where id=?'
    db.query(sql, req.user.id, (err, result) => {
        if(err) return res.cc(err)
        // 执行 SQL 语句成功，但是查询的结果可能为空
        if(result.length !== 1) return res.cc('获取用户信息失败')
        res.send({
            status:0,
            message: '获取用户信息成功',
            data: result[0]
        })
    })
}

// 更新用户基本信息的初等函数
exports.updateUserInfo = (req, res) => {
    res.send('ok')
}