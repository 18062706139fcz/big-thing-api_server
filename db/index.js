/*
 * @Author: 18062706139 2279549769@qq.com
 * @Date: 2022-08-14 13:27:31
 * @LastEditors: 18062706139 2279549769@qq.com
 * @LastEditTime: 2022-08-14 13:30:08
 * @FilePath: /api_server/db/index.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
const mysql = require('mysql')

const db = mysql.createPool({
    host: '127.0.0.1',
    user: 'root',
    password: 'admin123',
    database: 'my_db_01'
})

module.exports = db