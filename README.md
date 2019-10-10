### 项目说明
这是一个电子商城的SPA应用，后端使用的是koa2和MongoDB，操作MongoDB使用的是mongoose库。前端使用vue+iview以及使用来自《模板之家》的一个商城模板。所以仅供参考
### 本地运行：
##### 启动MongoDB服务
```
mongod --dbpath '你存放数据库的路径' --logpath '你存放日志文件的路径'
// 将MongoDB服务器作为Windows服务运行
mongod --dbpath "d:\xxx" --logpath "d:\xxx" --serviceName "myMongodb" --serviceDisplayName "myMongodb" --install
```
##### 启动服务端
```
cd service
npm i or cnpm i

// 开发环境启动
npm start
// 启动后使用postman或其他接口测试工具访问以下：
http://localhost:3000/api/db/manyInsert 批量导入数据
http://localhost:3000/api/db/manyDelete 批量删除数据

// 生产环境启动（生产环境启动会自动导入准备好的数据，不用手动访问接口）
npm run build
```
##### 启动客户端
```
cd client/shop-client
npm i or cnpm i
npm run serve
```
> 关于模板 `侵删`

> 对于登录、登出功能使用的是jwt做的，所以逻辑不严谨。看看就行别在项目上用
