/*
 * @Author: 18062706139 2279549769@qq.com
 * @Date: 2022-08-15 09:04:02
 * @LastEditors: 18062706139 2279549769@qq.com
 * @LastEditTime: 2022-08-15 10:34:49
 * @FilePath: /api_server/router_handler/userinfo.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
// 导入
const db = require('../db/index')

const bcrypt = require('bcryptjs')

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
    const sql = `update ev_users set ? where id=?`
    db.query(sql, [req.body, req.body.id], (err, result) => {
        // 执行 sql 语句失败
        if(err) return res.cc(err)
        if(result.affectedRows !== 1) return res.cc('更新数据失败')
        res.cc('更新用户信息成功', 0)
    })
    
}

exports.updatePassword = (req, res) => {
    // 根据 id 查询用户信息
    const sql = `select * from ev_users where id=?`

    db.query(sql, req.user.id, (err, result) => {
        if(err) return res.cc(err)
        if(result.length !== 1) return res.cc('用户不存在！')
        // 判断用户输入的旧密码是否正确
        const body = req.body
        const compareResult = bcrypt.compareSync(body.oldPwd, result[0].password)
        if(!compareResult) res.cc('旧密码输入错误')
        const sqlStr = `update ev_users set password=? where id=?`
        // 忘记加密了
        const newPwd = bcrypt.hashSync(body.newPwd, 10)
        db.query(sqlStr, [newPwd ,req.user.id], (err, result) => {
            if(err) return res.cc(err)
            if(result.affectedRows !== 1) return res.cc('修改用户密码失败')
            res.cc('密码修改成功', 0)
        })
    })
}

exports.updateAvatar = (req, res) => {
    const sql = `update ev_users set user_pic=? where id=?`
    db.query(sql, [req.body.avatar, req.user.id], (err, result) => {
        if(err) return res.cc(err)
        if(result.affectedRows !== 1) return res.cc('更新头像信息失败')
        return res.cc('更新成功', 0)
    })
}