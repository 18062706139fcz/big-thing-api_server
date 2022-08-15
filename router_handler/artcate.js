/*
 * @Author: 18062706139 2279549769@qq.com
 * @Date: 2022-08-15 10:48:18
 * @LastEditors: 18062706139 2279549769@qq.com
 * @LastEditTime: 2022-08-15 11:47:50
 * @FilePath: /api_server/router_handler/artcate.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
const db = require('../db/index')


exports.getArticleCates = (req, res) => {
    // sql
    const sql = `select * from ev_article_cate where id_delete=0 order by id asc`
    db.query(sql, (err, result) => {
        if(err) return res.cc(err)
        res.send({
            status: 0,
            message: '获取文章分类数据成功',
            data: result
        })
    })
}

exports.addArticleCates = (req, res) => {
    // 查重
    const sql = `select * from ev_article_cate where name=? or alias=?`
    db.query(sql, [req.body.name, req.body.alias], (err, result) => {
        if(err) return res.cc(err)
        if(result.length == 2) res.cc('分类名称与分类别名被占用，请更换或重试！')
        if(result.length == 1 && result[0].name === req.body.name && result[0].alias === req.body.alias) return res.cc('分类名称与分类别名被占用，请更换或重试！')
        if(result.length == 1 && result[0].name === req.body.name) return res.cc('分类名称被占用，请更换或重试！') 
        if(result.length == 1 && result[0].alias === req.body.alias) return res.cc('分类别名被占用，请更换或重试！') 
        // 开始插入数据了
        const sqlStr = `insert into ev_article_cate set ?`
        db.query(sqlStr, req.body, (err, result) => {
            if(err) return res.cc(err)
            if(result.affectedRows !== 1) return res.cc('新增文章分类失败')
            res.cc('新增文章分类成功', 0)
        })
    })
}
