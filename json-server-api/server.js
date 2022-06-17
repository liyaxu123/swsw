const jsonServer = require("json-server");
const server = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();
const axios = require('axios')
const https = require('https')
const {config} = require('./config')

// 解决axios发送请求报错
const ax = axios.create({
    httpsAgent: new https.Agent({keepAlive: true, rejectUnauthorized: false})
});
// 为了让Github的 access_token 数据以对象的形式返回
ax.defaults.headers.common['Accept'] = 'application/json';

// To handle POST, PUT and PATCH you need to use a body-parser
// You can use the one used by JSON Server
server.use(jsonServer.bodyParser);

// Set default middlewares (logger, static, cors and no-cache)
server.use(middlewares);

// 在 JSON Server 路由器之前添加自定义路由
server.post("/login", async (req, res) => {
    // console.log("+++++++++++++++++", req.body);
    try {
        // 1、获取Github的 access_token 令牌
        let {data} = await ax({
            method: 'post',
            url: 'https://github.com/login/oauth/access_token',
            data: {
                client_id: config.client_id,
                client_secret: config.client_secret,
                code: req.body.code
            }
        })
        // console.log('&&&&&&&&&&&&&&&&&&', data)

        // 2、使用 access_token 令牌获取Github用户信息
        let {data: userInfo} = await ax({
            method: 'get',
            url: 'https://api.github.com/user',
            headers: {
                'Authorization': `token ${data.access_token}`,
            }
        })
        // console.log('UUUUUUUUUUUUUUU', userInfo)

        // 3、将Github的用户信息返回给前端
        res.status(200).jsonp({
            data: userInfo,
            code: 200,
            message: "请求成功",
        });
    } catch (e) {
        console.log(e)
    }
});

// 自定义中间件
// server.use((req, res, next) => {
//   console.log(req.url.includes("/users"));
//   if (req.url.includes("/users")) {
//     next();
//   } else {
//     console.log('不让过~~');
//     res.sendStatus(401);
//   }
//   // if (isAuthorized(req)) {
//   //   // add your authorization logic here
//   //   next(); // continue to JSON Server router
//   // } else {
//   //   res.sendStatus(401);
//   // }
// });

// server.use((req, res, next) => {
//   if (req.method === "POST") {
//     req.body.createdAt = Date.now();
//   }
//   // Continue to JSON Server router
//   next();
// });

// In this example, returned resources will be wrapped in a body property
// router.render = (req, res) => {
//   res.jsonp({
//     body: res.locals.data
//   })
// }

// In this example we simulate a server side error response
router.render = (req, res) => {
    res.status(200).jsonp({
        data: res.locals.data,
        code: 200,
        message: "请求成功",
    });
    // res.status(500).jsonp({
    //   error: "error message here"
    // })
};

// Use default router
server.use(router);
server.listen(3005, () => {
    console.log("JSON Server is running，http://localhost:3005");
});
