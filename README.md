#### 项目启动
```

// 启动MongoDB服务
mongod --dbpath '你存放数据库的路径' --logpath '你存放日志文件的路径'
// 将MongoDB服务器作为Windows服务运行
mongod --dbpath "d:\xxx" --logpath "d:\xxx" --serviceName "myMongodb" --serviceDisplayName "myMongodb" --install

// 服务端
cd service
npm i or cnpm i
npm start
// 启动后使用postman或其他接口测试工具访问：
http://localhost:3000/api/db/manyInsert 批量导入数据
http://localhost:3000/api/db/manyDelete 批量删除数据

// 客户端
cd client/shop-client
npm i or cnpm i
npm run serve
```