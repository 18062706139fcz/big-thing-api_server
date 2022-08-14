/*
 * @Author: 18062706139 2279549769@qq.com
 * @Date: 2022-08-14 13:08:30
 * @LastEditors: 18062706139 2279549769@qq.com
 * @LastEditTime: 2022-08-14 15:12:01
 * @FilePath: /api_server/router_handler/user.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
// 导入数据库操作模块
const db = require('../db/index')

// 导入 bcryptjs
const bcrypt = require('bcryptjs')

// 注册新用户的处理函数
exports.login = (req, res) => {
    // 获取客户端提交到服务器的信息
    res.send('regUser ok')
}
// login的处理函数
exports.regUser = (req, res) => {
    // 对表单中的数据进行合法性校验
    const userInfo = req.body
    
    // if( !userInfo.username || !userInfo.password) {
    //     return res.send({status: 1, message: '用户名或密码不合法'})
    // }

    const sqlStr = "select * from ev_users where username=?"

    db.query(sqlStr, userInfo.username, (err, result) => {

        // fail
        if(err) {
            // return res.send({status: 1, message: err.message})
            return res.cc(err)
        }

        // success ｜ 
        if(result.length > 0) {
            // return res.send({status:1, message: '用户名被占用，请更换其他用户名'})
            return res.cc('用户名被占用，请更换其他用户名')
        }
        
        // TODO: 用户名可以使用咋搞
        // 调用 bcrypt.hashSync() 对密码进行加密
        // console.log(userInfo) // test
        userInfo.password = bcrypt.hashSync(userInfo.password, 10)
        // console.log(userInfo) // test
        const sqlStr2 = "insert into ev_users set ?"
        // 调用 db.query 执行sql
        db.query(sqlStr2,{username: userInfo.username, password: userInfo.password}, (err, request) => {
            if(err) {
                // return res.send({status: 1, message: err.message})
                return res.cc(err)
            }
            // 判断影响行数
            if(request.affectedRows !== 1) {
                // return res.send({status: 1, message: '注册用户失败， 请稍后再试'})
                return res.cc('注册用户失败， 请稍后再试')
            }
            // 注册用户成功
            // res.send({status: 0, message: '注册成功'})
            res.cc('注册成功', 0)
        })
    })
}