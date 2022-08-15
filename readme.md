# Nodejs后端接口项目

## README相关

### 建议

+ 下载`nodemon`以便接口改变之后热更新。

```shell
npm i nodemon -g
```

### 使用

+ 下载相关依赖

```shell
npm install
```

+ 运行

> 如果下载了`nodemon`

```js
nodemon app.js
```

> 如果没下载

```js
node app.js
```

### 测试方法

+ `posterman`

> 一定记得，当你访问非`api`开头的接口时，发送请求一定要携带`Authorization`，否则你将没有权限处理。

## 项目分析

### 项目结构

- `app.js`
- `config.js`
- `package-lock.json`
- `package.json`
- `router_handler`
  - `user.js`
  - `userinfo.js`
  - `artcate.js`
- `router`
  - `user.js`
  - `userinfo.js`
  - `artcate.js`
- `schema`
  - `user.js`
  - `artcate.js`
- `db`
  - `index.js`

### 项目重点

#### 1. 组件模块化

> `app.js`是入口文件，`config.js`是全局配置文件，`router_handler`是方法文件，`router`是导航文件，`schema`是用来存导入验证规则的包的相关配置文件。

#### 2. 前置配置

+ `cors()`跨域

```js
const cors = require('cors')
app.use(cors())
```

+ 封装`res.send()`发送错误消息，在前面封装一个中间件，这样能够简化代码。

```js
app.use((req, res, next) => {
  // 默认 status 为 1 , 也就是有错误
  res.cc = function(err, status = 1) {
    res.send({
      status,
      message: err instanceof Error ? err.message : err
    })
  }
  next()
})
```

+ 封装数据库

```js
const mysql = require('mysql')

const db = mysql.createPool({
  host: '127.0.0.1',
  user: 'root',
  password: 'admin123',
  database: 'my_db_01'
})
```

+ `bcryptjs`用来给密码加密的

```js
// 导入 bcryptjs
const bcrypt = require('bcryptjs')
// 加密
userInfo.password = bcrypt.hashSync(userInfo.password)
// 判断密码是否合法
const compareResult = bcrypt.compareSync(userInfo.password, result[0].password)
```

+ 生成token的包

```js
const jWT = reqire('jsonwebtoken')
const tokenStr = jWT.sign(user, config.jwtSecretKey, {expiresIn: config.expires})
// 前面一般要加上 Bearer
res.send({
  status: 0,
  message: '登录成功',
  token: 'Bearer ' + tokenStr
})
```

+ `@escook/express-joi`与`joi`

> 用来做表单验证的

```js
/* scheme */
// 导入定义规则的包
const Joi = require('joi')
const username = Joi.string().alphanum().min(1).max(10).required()
const password = Joi.string()
                .pattern(/^[\S]{6,12}$/)
                .required()
// define a rule
exports.reg_login_schema = {
    // 都在body里存着
    body: {
        username: username,
        password: password,
    }
}



/* router */
const express = require('express');
const router = express.Router()
const user_handler = require('../router_handler/user')

// 1. 导入验证数据的中间件
const expressJoi = require('@escook/express-joi')
// 2. 导入需要的验证规则对象
const { reg_login_schema } = require('../schema/user')
// 可以复用这个校验规则
router.post('/login', expressJoi(reg_login_schema), user_handler.login)

module.exports = router
+ + + + + + + + // 是如下使用的 
router.post('/login', expressJoi(reg_login_schema), user_handler.login)
```

### 3. 数据库相关语法

#### 数据库的创建

```js
const mysql = require('mysql')

const db = mysql.createPool({
  host: '127.0.0.1',
  user: 'root',
  password: 'admin123',
  database: 'my_db_01'
})
```

> 这里的用户是`root`，密码是`admin123`，数据库是`my_db_01`，端口用在了`127.0.0.1`。

#### SQL相关操作

#### 增删改查

1. **增**

```sql
insert into users (username, password) values ('tony stark', '098123');
```

> 这个是正常的写法，只是当数据量极大的时候，括号里面的东西很难填完，所以我们需要有简化的写法。

```sql
insert into 数据表 set ?
-- Example
const sqlStr2 = "insert into ev_users set ?"
db.query(sqlStr2,{username: userInfo.username, password: userInfo.password}, () => {})
```

> 问号表示这里放要插入的东西，`set`是简化写法

2. **删**

```sql
delete from 数据表 where 标记地点
delete from users where id=4 -- Example
```

3. **改**

```sql
update 表名称 set 列名称 = 新值 where 列名称 = 某值
```

> 下面是简化写法&实际用法

```sql
const sql = `update ev_users set ? where id=?`
db.query(sql, [req.body, req.body.id], () => {})
```

4. **查**

```js
select * from users where id=2
const sql = `select * from ev_article_cate where name=? or alias=?`
```

> `*`代表选择所有满足条件的

#### 一些其他

+ `where`用来限定我要增删改查啥。
+ `and`和`or`用来在`where`中进行细节的处理和分析。
+ `order by xxx`用来排序

> 其中有`asc`和`desc`分别表示正序排列和逆序排列。

### 主要业务逻辑梳理

可以看到，项目中主要分为了三个部分:

1. `user`
2. `userinfo`
3. `artcate`

其中，`user`是用来注册和登录的；`userinfo`是用来更改用户信息的，`artcate`是用来获取和更新文章及其分类的相关信息的。

### 项目源码

+ [api_server](https://github.com/18062706139fcz/big-thing-api_server)