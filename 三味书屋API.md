# 三味书屋API

## 第三方应用授权登录

**OAuth 2.0** 是目前流行的一种授权机制，用来**授权第三方应用**，获取用户数据。

> github授权登录流程: 1、A 网站让用户跳转到 GitHub。 2、GitHub 要求用户登录，然后询问"A 网站要求获得 xx 权限，你是否同意？" 3、用户同意，GitHub 就会重定向回 A 网站，同时发回一个授权码。 4、A 网站使用授权码，向 GitHub 请求令牌。 5、GitHub 返回令牌. 6、A 网站使用令牌，向 GitHub 请求用户数据。

![](.\json-server-api\public\images\第三方授权登录流程图.png)

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
| rate     |    是    | Number | 评分，满分10分，可打半分 |

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
| rate     |    是    | Number | 评分，满分10分，可打半分 |

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

## 项目知识点补充

### iframe专题

在本项目中，我们会发现，每个页面都拥有头部导航部分和页脚部分，每个页面都要重复的复制粘贴这两部分的代码，非常的麻烦，而且不够优雅。我们可以通过**iframe**框架来解决这个痛点。

具体思路：

- 将共有的头部区域的代码抽离到**header.html**中
- 将共有的页脚区域代码抽离到**footer.html**中
- 在其他页面中通过**iframe**标签将**header.html**和**footer.html**引入

接下来我们将研究嵌套页面之间将如何通信的问题：

1. 父页面与子页面数据通信
2. 子页面与父页面数据通信
3. 祖孙级页面之间通信

首先我们写好这几个页面：

**header.html**

```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>header页面</title>
  <style>
    * {
      margin: 0;
      padding: 0;
    }

    header {
      width: 100%;
      height: 60px;
      background-color: skyblue;
    }

    h1 {
      text-align: center;
    }
  </style>
</head>

<body>
  <header>
    <h1>我是头部页面</h1>
    <button id="btn1">获取父级页面中的数据</button>
    <button id="btn2">执行父级页面中的函数</button>
    <button id="btn3">操作父级页面中的元素</button>
  </header>

  <iframe src="./sun.html" frameborder="0"></iframe>
</body>

<script>
  var name = '我是【头部页面】';
  var msg = '我是【头部页面】中的 msg';
  const num = 33;
  window.num = num

  let data = null;

  function fun(val) {
    alert('我是【头部页面】中的 fun 函数，接收的参树：' + val)
    data = val
  }

  const btn1 = document.getElementById('btn1')
  const btn2 = document.getElementById('btn2')
  const btn3 = document.getElementById('btn3')

  btn1.onclick = function () {
    console.log(window.parent.name);
    console.log(window.parent.msg);
    console.log(window.parent.num);
    // 在子级页面中跳转页面
    window.top.location.href = './detail.html'
  }

  btn2.onclick = function () {
    window.parent.fun(msg);
  }

  btn3.onclick = function () {
    console.log(window.parent.document);
    let pMain = window.parent.document.querySelector('main');
    pMain.style.background = 'red'
    let pH1 = window.parent.document.querySelector('h1');
    pH1.innerText = '被子页面修改了'
  }

</script>

</html>
```

**footer.html**

```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
  <style>
    * {
      margin: 0;
      padding: 0;
    }

    footer {
      width: 100%;
      height: 100px;
      background-color: #333;
      color: #fff;
    }

    h1 {
      text-align: center;
    }
  </style>
</head>

<body>
  <footer>
    <h1>页脚页面</h1>
  </footer>
</body>

</html>
```

**sun.html**

```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>

<body>
  <h1>我是孙子页面</h1>
  <button id="btn1">获取爷爷页面中的数据</button>
</body>

<script>
  var name = '我是【孙子页面】';
  var msg = '我是【孙子页面】中的 msg';
  let num = 3;

  const btn1 = document.getElementById('btn1')

  // 获取爷爷页面中的数据
  btn1.onclick = function () {
    console.log(window.parent.parent.name);
    console.log(window.parent.parent.msg);

    // 还可以直接通过 window.top 直接获取到祖先窗口
    console.log(window.top.name);
    console.log(window.top.msg);
  }
</script>

</html>
```

**index.html**

```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>三味书屋</title>
  <style>
    * {
      margin: 0;
      padding: 0;
    }

    #headerFrame {
      width: 100%;
      height: 60px;
    }

    #footerIframe {
      width: 100%;
      height: 100px;
    }

    main {
      width: 100%;
      height: calc(100vh - 160px);
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }

    iframe {
      vertical-align: middle;
    }

    h1 {
      text-align: center;
    }

    button {
      margin-top: 10px;
    }
  </style>
</head>

<body>
  <!-- 头部区域 -->
  <iframe id="headerFrame" src="./header.html" frameborder="0"></iframe>

  <!-- 主体区域 -->
  <main>
    <h1>主体部分</h1>
    <button id="btn1">获取头部页面中的数据</button>
    <button id="btn2">执行头部页面中的函数</button>
    <button id="btn3">操作头部页面中的元素</button>
    <button id="btn4">获取孙子页面中的数据</button>
  </main>

  <!-- 页脚区域 -->
  <iframe id="footerIframe" src="./footer.html" frameborder="0"></iframe>
</body>

<script>
  var name = '我是【首页】';
  var msg = '我是【首页】中的 msg';
  let num = 3;
  window.num = num

  function fun(val) {
    alert('我是【首页】中的 fun 函数，接收的参树：' + val)
  }

  const btn1 = document.getElementById('btn1')
  const btn2 = document.getElementById('btn2')
  const btn3 = document.getElementById('btn3')
  const btn4 = document.getElementById('btn4')
  const headerFrame = document.getElementById('headerFrame')

  headerFrame.onload = function () {
    console.log('头部页面加载完毕')
  }

  // 获取子级页面中的数据
  btn1.onclick = function () {
    console.log(headerFrame.contentWindow.name);
    console.log(headerFrame.contentWindow.msg);
    console.log(headerFrame.contentWindow.num);
  }

  // 调用子级页面中的函数，并且可以将父页面中的数据传递给子页面
  btn2.onclick = function () {
    headerFrame.contentWindow.fun(msg);
  }

  // 在父页面中操作子页面的元素
  btn3.onclick = function () {
    let sonHeader = headerFrame.contentWindow.document.querySelector('header');
    sonHeader.style.background = 'red';
    let sonH1 = headerFrame.contentWindow.document.querySelector('h1');
    sonH1.innerText = '被父页面修改了'
  }

  // 获取孙子页面中的数据
  btn4.onclick = function () {
    console.log(headerFrame.contentWindow.document.querySelector('iframe').contentWindow.name);
    console.log(headerFrame.contentWindow.document.querySelector('iframe').contentWindow.msg);
  }
</script>

</html>
```

**detail.html**

```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>详情页</title>
</head>

<body>
  <h1>详情页</h1>
</body>

</html>
```

> 总结：
>
> - 父页面获取子页面中的数据：
>   - 通过：**headerFrame标签.contentWindow.子页面全局作用域中的变量名**
>   - 例如：headerFrame.contentWindow.name
> - 父页面调用子页面中的函数，并且可以传递参数：
>   - 通过：**headerFrame标签.contentWindow.子页面全局作用域中的函数名(实参);**
>   - 例如：headerFrame.contentWindow.fun(msg);
> - 在父页面中操作子页面的元素：
>   - 通过：**headerFrame标签.contentWindow.document.querySelector('子页面中的标签')**
>   - 例如：headerFrame.contentWindow.document.querySelector('header');
> - 在父页面中获取孙子页面中的数据：
>   - 通过：**headerFrame标签.contentWindow.document.querySelector('子页面中的iframe标签').contentWindow.name**
>   - 例如：headerFrame.contentWindow.document.querySelector('iframe').contentWindow.name
> - 在子页面中获取父页面中的数据：
>   - 通过：**window.parent.父页面中全局作用域中的变量名**
>   - 例如：window.parent.name
> - 在子页面中调用父页面中的函数，并且可以传递参数：
>   - 通过：**window.parent.父页面中全局作用域中的函数名(实参);**
>   - 例如：window.parent.fun(msg);
> - 在子页面中操作父页面中的元素：
>   - 通过：**window.parent.document.querySelector('父页面中的元素')**
>   - 例如：window.parent.document.querySelector('main')
> - 在子页面中使父页面路径跳转：
>   - 通过：**window.top.location.href = '要跳转的路径'**
>   - 例如：window.top.location.href = './detail.html'
> - 在孙子页面中获取爷爷页面中的数据：
>   - 通过：**window.parent.parent.爷爷页面中全局作用域中的变量名**
>   - 例如：window.parent.parent.name
>   - 还可以直接通过 **window.top** 直接获取到祖先窗口
>   - 例如：window.top.name

### 防抖函数和节流函数

在我们这个项目中，我们在做搜索书籍的功能时，只要在搜索框里面输入内容，就会一直发送网络请求，十分消耗性能，我们正确的做法应该是用户在输入的时候不发送请求，当用户输入完毕之后，只发送一次请求即可，从而达到性能优化的目的。

那么我们如何实现上述的需求呢？

我们接下来就需要知道两个概念：**函数防抖**和**函数节流**

**防抖函数与节流函数都是控制事件触发频率的函数，能够在某些场景实现性能优化。**

**防抖**： 防抖是指在 n 秒的时间内，如果连续触发当前事件，就不会执行回调函数。直到 n 秒后，才执行回调函数。

**节流**：节流是在函数被频繁调用的时候，定期性的执行，从而控制事件的触发频率。也就是说当达到了一定的时间间隔就会执行一次；可以理解为是**缩减执行频率**

**区别**：**防抖函数在 n 秒内只执行1次，节流函数在 n 秒内可以执行多次**

在实际项目开发中推荐使用 **Lodash.js** 库 或者 **Underscore.js** 库中给我们提供的防抖函数和节流函数

- [Lodash.js](https://www.lodashjs.com/)：是一个一致性、模块化、高性能的 JavaScript 实用工具库。
  - 防抖函数：`_.debounce(func, [wait=0], [options=])`
  - 节流函数：`_.throttle(func, [wait=0], [options=])`
- [Underscore.js](https://underscorejs.net/)：是一个JavaScript实用库，提供了一整套函数式编程的实用功能，但是没有扩展任何JavaScript内置对象。
  - 防抖函数：`_.debounce(function, wait, [immediate])`
  - 节流函数：`_.throttle(function, wait, [options])`

#### 原理实现：

**防抖函数：**

实现思路：利用setTimeout定时器来延迟执行对应的事件函数，在执行setTimeout之前我们要先清除定时器，这样便可达到如果一直触发防抖函数就会重新计时的效果，只有等时间到了才执行对应的函数，这样便可实现防抖的功能。里面还涉及很多具体的细节，比如this指向问题、事件对象问题、是否立即执行、返回值问题。下面是简单版的实现，完善版的代码可以参考我公众号里面的文章。

```js
// 手写我们自己的防抖函数，需要解决一下this问题和事件对象问题
function debounce(fn, wait) {
    let timer;
    return function (...arg) {
        // const args = arguments;
        clearTimeout(timer);
        timer = setTimeout(() => {
            // 修改 fn 函数的this指向，同时传递事件对象e
            fn.apply(this, arg)
        }, wait);
    }
}
```

> 应用场景：
>
> 1、scroll事件滚动触发
>
> 2、搜索框输入查询
>
> 3、表单验证
>
> 4、按钮提交事件
>
> 5、浏览器窗口缩放，resize事件

**节流函数：**

时间戳版：

实现思路：利用当前最新的时间戳减去上一次的时间戳得到一个时间间隔，如果这个时间间隔大于我们定义的wait就执行对应的事件函数，否则就不执行，以此实现节流的功能。

特点：第一次会触发，最后一次不会触发函数，不顾头，顾尾。

```js
// 精简版
function throttle(fn, wait) {
    let last = 0;
    return function () {
        var now = Date.now();
        if (now - last > wait) {
            fn.apply(this, arguments);
            last = now;
        }
    }
}
```

```js
// 完善版
function throttle(func, wait) {
    let context, args;
    // 旧的时间戳
    let old = 0;
    return function () {
        context = this;
        args = arguments;
        // 获取当前的时间戳
        let now = new Date().valueOf();
        if (now - old > wait) {
            // 立即执行
            func.apply(context, args);
            old = now;
        }
    }
}
```

定时器版：

实现思路：在一直触发节流函数的情况下，利用setTimeout定时器每隔指定的时间去执行对应的函数。

特点：第一次不会触发，最后一次会触发函数，顾头，不顾尾。

```js
function throttle(func, wait) {
    let context, args, timeout;
    return function () {
        context = this;
        args = arguments;
        if (!timeout) {
            timeout = setTimeout(function () {
                timeout = null;
                func.apply(context, args);
            }, wait);
        }
    }
}
```

































































