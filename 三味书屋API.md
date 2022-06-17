# 三味书屋API

## 第三方应用授权登录

**OAuth 2.0** 是目前流行的一种授权机制，用来**授权第三方应用**，获取用户数据。

> github授权登录流程: 1、A 网站让用户跳转到 GitHub。 2、GitHub 要求用户登录，然后询问"A 网站要求获得 xx 权限，你是否同意？" 3、用户同意，GitHub 就会重定向回 A 网站，同时发回一个授权码。 4、A 网站使用授权码，向 GitHub 请求令牌。 5、GitHub 返回令牌. 6、A 网站使用令牌，向 GitHub 请求用户数据。

![](.\public\images\第三方授权登录流程图.png)

> 项目要求：
>
> 技术栈：原生HTML + CSS/Less + JS/ES6/jQuery + axios + promise/async/await + Git项目管理工具 + Github远程仓库
>
> 插件自己找，不会的先问度娘（自己先想办法解决，不要依赖别人，锻炼自己的独自开发能力）

```js
baseUrl: http://localhost:3005
```

## 接口列表

### 0、Github授权登录

#### 第1步请求Github授权：

#### 请求URL:  

```js
https://github.com/login/oauth/authorize
```

#### 请求方式: **GET**

#### 参数：

| 参数         | 是否必选 | 类型   | 说明                                       |
| :----------- | :------: | :----- | :----------------------------------------- |
| client_id    |    是    | String | 应用标识ID                                 |
| redirect_uri |    否    | String | 用户获得授权后被发送到的应用程序中的 URL。 |
| login        |    否    | String | 提供用于登录和授权应用程序的特定账户。     |

#### 请求示例：

```js
https://github.com/login/oauth/authorize?client_id=你Github申请的client_id
```

#### 返回示例：

```js
你重定向的网址?code=xxx
```

#### 第2步在重定向页发送code给我们的服务器

#### 请求URL:  

```js
http://localhost:3005/login
```

#### 请求方式: **POST**

#### 参数：

| 参数 | 是否必选 | 类型   | 说明                               |
| :--- | :------: | :----- | :--------------------------------- |
| code |    是    | String | Github服务器返回给重定向页的code值 |

#### 请求示例：

```js
略
```

#### 返回示例：

```js
{
  "login": "liyaxu123",
  "id": 55610041,
  "node_id": "MDQ6VXNlcjU1NjEwMDQx",
  "avatar_url": "https://avatars.githubusercontent.com/u/55610041?v=4",
  "gravatar_id": "",
  "url": "https://api.github.com/users/liyaxu123",
  "html_url": "https://github.com/liyaxu123",
  "followers_url": "https://api.github.com/users/liyaxu123/followers",
  "following_url": "https://api.github.com/users/liyaxu123/following{/other_user}",
  "gists_url": "https://api.github.com/users/liyaxu123/gists{/gist_id}",
  "starred_url": "https://api.github.com/users/liyaxu123/starred{/owner}{/repo}",
  "subscriptions_url": "https://api.github.com/users/liyaxu123/subscriptions",
  "organizations_url": "https://api.github.com/users/liyaxu123/orgs",
  "repos_url": "https://api.github.com/users/liyaxu123/repos",
  "events_url": "https://api.github.com/users/liyaxu123/events{/privacy}",
  "received_events_url": "https://api.github.com/users/liyaxu123/received_events",
  "type": "User",
  "site_admin": false,
  "name": "小笑残虹",
  "company": null,
  "blog": "",
  "location": "中国河南",
  "email": null,
  "hireable": null,
  "bio": null,
  "twitter_username": null,
  "public_repos": 35,
  "public_gists": 0,
  "followers": 11,
  "following": 27,
  "created_at": "2019-09-21T02:18:16Z",
  "updated_at": "2022-06-09T02:50:39Z"
}
```

### 1、获取轮播图数据

#### 请求URL:  

```js
http://localhost:3005/books
```

#### 请求方式: **GET**

#### 参数：无

#### 返回示例：

```js
data:[
{
    "id": 1,
    "name": "《红楼梦》",
    "author": "曹雪芹",
    "desc": "《红楼梦》讲述的是发生在一个虚构朝代的封建大家庭中的人事物，其中以贾宝玉、林黛玉、薛宝钗三个人之间的感情纠葛为主线通过对一些日常事件的描述体现了在贾府的大观园中以金陵十二钗为主体的众女子的爱恨情愁。而在这同时又从贾府由富贵堂皇走向没落衰败的次线反映了一个大家族的没落历程和这个看似华丽的家族的丑陋的内在。",
    "coverImg": "http://img3m6.ddimg.cn/31/22/23828836-1_w_16.jpg"
},
]
```

### 2、获取排行榜数据

#### 请求URL:  

```js
http://localhost:3005/books
```

#### 请求方式: **GET**

#### 请求参数：

| 参数   | 是否必选 | 类型   | 说明                                     |
| :----- | :------: | :----- | :--------------------------------------- |
| _sort  |    是    | String | 排序的字段名，这里要对 rate 进行排序     |
| _order |    是    | String | 升序还是降序排列，这里应为 desc 降序排列 |
| _start |    是    | number | 传0即可                                  |
| _limit |    是    | number | 前几名，传5即为前5名                     |

#### 请求示例：

```js
http://localhost:3005/books?_sort=rate&_order=desc&_start=0&_limit=5
```

#### 返回示例：

```js
data:[
{
    "id": 1,
    "name": "《红楼梦》",
    "author": "曹雪芹",
    "desc": "《红楼梦》讲述的是发生在一个虚构朝代的封建大家庭中的人事物，其中以贾宝玉、林黛玉、薛宝钗三个人之间的感情纠葛为主线通过对一些日常事件的描述体现了在贾府的大观园中以金陵十二钗为主体的众女子的爱恨情愁。而在这同时又从贾府由富贵堂皇走向没落衰败的次线反映了一个大家族的没落历程和这个看似华丽的家族的丑陋的内在。",
    "coverImg": "http://img3m6.ddimg.cn/31/22/23828836-1_w_16.jpg"
},
]
```

### 3、根据书名模糊搜索

#### 请求URL:  

```js
http://localhost:3005/books
```

#### 请求方式: **GET**

#### 请求参数：

| 参数      | 是否必选 | 类型   | 说明       |
| :-------- | :------: | :----- | :--------- |
| name_like |    是    | String | 搜索关键字 |

#### 请求示例：

```js
http://localhost:3005/books?name_like=三国
```

#### 返回示例：

```js
{
"data": [
    {
    "id": 2,
    "name": "《三国演义》",
    "author": "罗贯中",
    "desc": "《三国演义》故事开始黄巾兵起义，结束于司马氏灭吴开晋，以描写战争为主，反映了魏、蜀汉、吴三个政治集团之间的政治和军事斗争，展现了从东汉末年到西晋初年之间近一百年的历史风云，并成功塑造了一批叱咤风云的英雄人物。",
    "coverImg": "http://img3m2.ddimg.cn/30/4/23941002-1_w_16.jpg"
    }
],
"code": 200,
"message": "请求成功"
}
```

### 4、根据ID查询书籍信息

#### 请求URL:  

```js
http://localhost:3005/books
```

#### 请求方式: **GET**

#### 请求参数：

| 参数 | 是否必选 | 类型   | 说明     |
| :--- | :------: | :----- | :------- |
| id   |    是    | Number | 书籍的id |

#### 请求示例：

```js
http://localhost:3005/books?id=1
```

#### 返回示例：

```js
{
"data": [
{
"id": 1,
"name": "《红楼梦》",
"author": "曹雪芹",
"desc": "《红楼梦》讲述的是发生在一个虚构朝代的封建大家庭中的人事物，其中以贾宝玉、林黛玉、薛宝钗三个人之间的感情纠葛为主线通过对一些日常事件的描述体现了在贾府的大观园中以金陵十二钗为主体的众女子的爱恨情愁。而在这同时又从贾府由富贵堂皇走向没落衰败的次线反映了一个大家族的没落历程和这个看似华丽的家族的丑陋的内在。",
"coverImg": "http://img3m6.ddimg.cn/31/22/23828836-1_w_16.jpg"
}
],
"code": 200,
"message": "请求成功"
}
```

### 5、分页查询

#### 请求URL:  

```js
http://localhost:3005/books
```

#### 请求方式: **GET**

#### 请求参数：

| 参数   | 是否必选 | 类型        | 说明                                   |
| :----- | :------: | :---------- | :------------------------------------- |
| _page  |    是    | Number      | 页码                                   |
| _limit |    是    | Number      | 每页显示的条数                         |
| _sort  |    否    | String      | 排序的字段名                           |
| _order |    否    | asc \| desc | 正排序（asc）还是逆排序(desc)，默认asc |

#### 请求示例：

```js
http://localhost:3005/books?_page=1&_limit=10&_sort=id&_order=asc
```

> 注意：**总条数**在响应头的**X-Total-Count**属性中

#### 返回示例：

```js
{
"data": [
    {
    "id": 3,
    "name": "《水浒传》",
    "author": "施耐庵",
    "desc": "《水浒传》是中国历史上第一部用古白话文写成的歌颂农民起义的长篇章回体版块结构小说，以宋江领导的起义军为主要题材，通过一系列梁山英雄反抗压迫、英勇斗争的生动故事，暴露了北宋末年统治阶级的腐朽和残暴，揭露了当时尖锐对立的社会矛盾和“官逼民反”的残酷现实。",
    "coverImg": "http://img3m5.ddimg.cn/30/21/23828835-1_w_17.jpg"
    },
    {
    "id": 4,
    "name": "《西游记》",
    "author": "吴承恩",
    "desc": "《西游记》前七回叙述孙悟空出世，有大闹天宫等故事。此后写孙悟空随唐僧西天取经，沿途除妖降魔、战胜困难的故事。书中唐僧、孙悟空、猪八戒、沙僧等形象刻画生动，规模宏大，结构完整，并且《西游记》富有浓厚的佛教色彩，其隐含意义非常深远，众说纷纭，见仁见智。可以从佛、道、俗等多个角度欣赏，是中国古典小说中伟大的浪漫主义文学作品。",
    "coverImg": "http://img3m6.ddimg.cn/98/4/28514276-1_w_13.jpg"
    }
],
"code": 200,
"message": "请求成功"
}
```

### 6、新增书籍

#### 请求URL:  

```js
http://localhost:3005/books
```

#### 请求方式: **POST**

#### 请求参数（body请求体）：

| 参数     | 是否必选 | 类型   | 说明                     |
| :------- | :------: | :----- | :----------------------- |
| name     |    是    | String | 书名，请自行添加**《》** |
| author   |    是    | String | 作者姓名                 |
| desc     |    是    | String | 书籍简介                 |
| coverImg |    是    | String | 封面图的URL链接          |

#### 请求示例：无

#### 返回示例：

```js
{
    "data": {
        "name": "《JavaScript高级程序设计 第4版》",
        "author": "[美]马特·弗里斯比",
        "desc": "本书是JavaScript经典图书的新版。第4版涵盖ECMAScript 2019，全面、深入地介绍了JavaScript开发者必须掌握的前端开发技术，涉及JavaScript的基础特性和高级特性。书中详尽讨论了JavaScript的各个方面，从JavaScript的起源开始，逐步讲解到新出现的技术，其中重点介绍ECMAScript和DOM标准。在此基础上，接下来的各章揭示了JavaScript的基本概念，包括类、期约、迭代器、代理，等等。另外，书中深入探讨了客户端检测、事件、动画、表单、错误处理及JSON。本书同时也介绍了近几年来涌现的重要新规范，包括Fetch API、模块、工作者线程、服务线程以及大量新API。",
        "coverImg": "http://img3m7.ddimg.cn/64/26/29120617-1_w_10.jpg",
        "id": 13
    },
    "code": 200,
    "message": "请求成功"
}
```

### 7、根据ID编辑书籍信息

#### 请求URL:  

```js
http://localhost:3005/books
```

#### 请求方式: **PUT**

#### 请求参数：

query参数部分：

| 参数 | 是否必选 | 类型   | 说明     |
| :--- | :------: | :----- | :------- |
| id   |    是    | Number | 书籍的id |

body参数部分：

| 参数     | 是否必选 | 类型   | 说明                     |
| :------- | :------: | :----- | :----------------------- |
| name     |    是    | String | 书名，请自行添加**《》** |
| author   |    是    | String | 作者姓名                 |
| desc     |    是    | String | 书籍简介                 |
| coverImg |    是    | String | 封面图的URL链接          |

#### 请求示例：

```js
略
```

#### 返回示例：

```js
略
```

### 8、根据ID删除书籍信息

#### 请求URL:  

```js
http://localhost:3005/books
```

#### 请求方式: **DELETE**

#### 请求参数：

| 参数 | 是否必选 | 类型   | 说明     |
| :--- | :------: | :----- | :------- |
| id   |    是    | Number | 书籍的id |

#### 请求示例：

```js
http://localhost:3005/books/1
```

#### 返回示例：

```js
略
```

### 9、根据书名ID排序

#### 请求URL:  

```js
http://localhost:3005/books
```

#### 请求方式: **GET**

#### 请求参数：

| 参数   | 是否必选 | 类型        | 说明                                   |
| :----- | :------: | :---------- | :------------------------------------- |
| _sort  |    是    | String      | 要排序的字段名                         |
| _order |    是    | asc \| desc | 正排序（asc）还是逆排序(desc)，默认asc |

#### 请求示例：

```js
http://localhost:3005/books?_sort=id&_order=desc
```

#### 返回示例：

```js
略
```











