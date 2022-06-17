// tool.js，就是我们自己封装的工具函数库
/* 
  通过自执行函数将我们封装好的方法，变成函数作用域中的方法
*/

/* 
  面向对象的封装方式
*/

(function () {
  // 定义一个对象，将我们的工具函数都放到这个对象里面
  let myTools = {
    // 获取屏幕宽高
    getScreen: function () {
      let width, height;
      if (window.innerWidth) {
        width = window.innerWidth;
        height = window.innerHeight;
      } else if (document.compatMode === "BackCompat") {
        width = document.body.clientWidth;
        height = document.body.clientHeight;
      } else {
        width = document.documentElement.clientWidth;
        height = document.documentElement.clientHeight;
      }
      return {
        width: width,
        height: height,
      };
    },
    // 获取页面滚动距离
    getPageScroll: function () {
      let x, y;
      if (window.pageXOffset) {
        x = window.pageXOffset;
        y = window.pageYOffset;
      } else if (document.compatMode === "BackCompat") {
        x = document.body.scrollLeft;
        y = document.body.scrollTop;
      } else {
        x = document.documentElement.scrollLeft;
        y = document.documentElement.scrollTop;
      }
      return {
        x: x,
        y: y,
      };
    },
    /*
      如果我们开发要兼容到IE678浏览器，我们就要对事件绑定程序进行兼容性处理
    */
    addEventListener: function (element, eventType, fn) {
      if (element.addEventListener) {
        // 处理我们标准浏览器
        element.addEventListener(eventType, fn);
      } else if (element.attachEvent) {
        // 处理IE678浏览器
        element.attachEvent("on" + eventType, fn);
      } else {
        // 兜底的，使用事件普通绑定方式
        // element.onclick = fn
        element["on" + eventType] = fn;
      }
    },
    // 封装兼容性的解绑事件
    removeEventListener: function (element, eventType, fn) {
      if (element.removeEventListener) {
        // 处理我们标准浏览器
        element.removeEventListener(eventType, fn);
      } else if (element.detachEvent) {
        // 处理IE678浏览器
        element.detachEvent("on" + eventType, fn);
      } else {
        // 兜底的，使用事件普通绑定方式
        // element.onclick = null
        element["on" + eventType] = null;
      }
    },
    /*
     * getStyle   获取元素的样式
     *    @params
     *        Element   [element]   元素
     *        name      [String]    样式属性
     *    @return
     *        styleValue  [Sring]   元素的样式值
     */
    getStyle: function (Element, name) {
      // 大部分浏览器都可以使用
      if (window.getComputedStyle) {
        return window.getComputedStyle(Element, null)[name];
      } else {
        // IE浏览器使用
        return Element.currentStyle[name];
      }
    },
    /*
     * linerMove：匀速运动增强版
     *    @params
     *        element       Element     需要开启运动的元素
     *        attrObj       Object      需要做动画的属性集合
     *        step          Number      步长
     *        stopCallBack  [Function]  动画自动结束后的回调函数
     *    @return
     *        stop   [Function(callBack)] 用于手动结束动画，可接收一个动画结束后的回调函数
     */
    linerMove: function (element, attrObj, step, callBackFn) {
      let stepCopy = step;
      clearInterval(element.timerId);
      element.timerId = setInterval(function () {
        // 标记所有的属性是否都动画完毕
        let flag = true;

        for (let key in attrObj) {
          let attr = key;
          let target = attrObj[key];

          // 获取其实位置
          let style = getComputedStyle(element);
          let start = parseInt(style[attr]) || 0;

          // 处理我们的步长
          step = target < start ? -stepCopy : stepCopy;

          // 更改oBOx位置
          start += step;
          // 判断是否到达终点，没有到达终点
          if (Math.abs(target - start) > Math.abs(step)) {
            flag = false;
          } else {
            start = target;
          }
          element.style[attr] = start + "px";
        }

        // 对象中所有的属性，都运动完毕，清除定时器
        if (flag) {
          clearInterval(element.timerId);
          // 当动画结束的时候，执行回调函数
          callBackFn && callBackFn();
        }
      }, 50);

      // 用来手动停止动画
      function stop() {
        clearInterval(element.timerId);
      }

      return stop;
    },
    /*
     * slowMove：缓动运动
     *    @params
     *        element       Element     需要开启运动的元素
     *        target        Number      终点的位置
     *        slowNum       Number(0~1) 缓动系数
     *        stopCallBack  [Function]  动画自动结束后的回调函数
     *    @return
     *        stop   [Function(callBack)] 用于手动结束动画，可接收一个动画结束后的回调函数
     */
    slowMove: function (element, target, step, slowNum, callBackFn) {
      clearInterval(element.timerId);
      element.timerId = setInterval(function () {
        // 获取其实位置
        let start = element.offsetLeft;
        // 修改步长
        step = (target - start) * slowNum;
        // 更改oBOx位置
        start += step;
        // 判断是否到达终点，到达终点后，停止
        if (Math.abs(Math.floor(step)) <= 1) {
          clearInterval(element.timerId);
          start = target;
          // 当动画结束的时候，执行回调函数
          callBackFn && callBackFn();
        }
        element.style.left = start + "px";
      }, 50);

      // 用来手动停止动画
      function stop() {
        clearInterval(element.timerId);
      }

      return stop;
    },
    /*
     * easeAnimation：缓动动画增强版
     *    @params
     *        element       Element     需要开启运动的元素
     *        attrObj       Object      需要做动画的属性集合
     *        slowNum       Number(0~1) 缓动系数
     *        stopCallBack  [Function]  动画自动结束后的回调函数
     *    @return
     *        stop   [Function(callBack)] 用于手动结束动画，可接收一个动画结束后的回调函数
     */
    easeAnimation: function (element, attrObj, slowNum, stopCallBack) {
      clearInterval(element.timerId);
      element.timerId = setInterval(function () {
        let flag = true;
        for (let key in attrObj) {
          let target = attrObj[key];
          // 1.拿到元素当前的位置
          let style = getComputedStyle(element);
          let begin = parseInt(style[key]) || 0;
          // 2.定义变量记录步长
          // 公式: (结束位置 - 开始位置) * 缓动系数(0 ~1)
          let step = (target - begin) * slowNum;
          // 3.计算新的位置
          begin += step;
          if (Math.abs(Math.floor(step)) > 1) {
            flag = false;
          } else {
            begin = target;
          }
          // 4.重新设置元素的位置
          element.style[key] = begin + "px";
        }
        if (flag) {
          clearInterval(element.timerId);
          stopCallBack && stopCallBack();
        }
      }, 100);
    },
    /*
     * tweenJsMove：基于Tween.js封装的运动函数
     *    @params
     *        element       Element     需要开启运动的元素
     *        type          String      TweenJS中的动画类型
     *        effect        String      TweenJS中的动画类型中的某一个效果
     *        currentStep   Number      当前步数，一般从0开始
     *        start         Number      起始值，一般从0开始
     *        target        Number      偏移量
     *        allStep       Number      总步数
     *        stopCallBack  [Function]  动画自动结束后的回调函数
     *    @return
     *        stop   [Function(callBack)] 用于手动结束动画，可接收一个动画结束后的回调函数
     */
    tweenJsMove: function (
      element,
      type,
      effect,
      currentStep,
      start,
      target,
      allStep,
      stopCallBack
    ) {
      element.timer = setInterval(function () {
        // 1、让当前步数增加
        currentStep++;
        // 2、重新给元素设置位置
        element.style.left =
          Tween[type][effect](currentStep, start, target, allStep) + "px";
        // 3、如果当前步数 >= 总步数，说明运动结束
        if (currentStep >= allStep) {
          // 清除计时器
          clearInterval(element.timer);
          stopCallBack && stopCallBack();
        }
      }, 30);

      // 手动结束动画函数，接收一个回调函数
      function stop(callBack) {
        clearInterval(element.timer);
        // 执行动画结束后的回调函数
        callBack && callBack();
      }

      // 将timer返回出去，用于停止动画，或者也可以返回一个函数用于停止动画
      // return element.timer
      return stop;
    },
    // 对元素el开启拖拽
    dragEl: function (el) {
      el.onmousedown = function (ev) {
        ev = ev || window.event;

        // 获取鼠标按下的时候，鼠标在元素内部的一个位置坐标
        let x = ev.offsetX;
        let y = ev.offsetY;

        // 2、给document绑定鼠标移动事件
        document.onmousemove = function (e) {
          e = e || window.event;

          // oDiv移动的距离
          let resX = e.clientX - x;
          let resY = e.clientY - y;

          // 限制水平方向
          if (resX < 0) {
            resX = 0;
          } else if (resX >= window.innerWidth - el.offsetWidth) {
            resX = window.innerWidth - el.offsetWidth;
          }

          // 限制垂直方向
          if (resY < 0) {
            resY = 0;
          } else if (resY >= window.innerHeight - el.offsetHeight) {
            resY = window.innerHeight - el.offsetHeight;
          }

          // 将鼠标的位置设置给el
          el.style.left = resX + "px";
          el.style.top = resY + "px";
        };

        // 3、鼠标抬起的时候，移除鼠标移动事件
        document.onmouseup = function () {
          document.onmousemove = null;
          document.onmouseup = null;
        };
      };
    },
    // 封装移动端点击事件，解决300ms延时问题
    tab: function tab(el, fn) {
      let startTime, endTime;
      let isMove = false;
      // 给元素监听手指触摸事件
      el.ontouchstart = function () {
        startTime = Date.now();
      };

      // 给元素绑定手指移动事件
      el.ontouchmove = function () {
        isMove = true;
      };

      // 给元素监听手指离开事件
      el.ontouchend = function (e) {
        endTime = Date.now();

        // 如果时间差<150，我们就认为发生了点击事件
        if (!isMove && endTime - startTime < 150) {
          fn && fn(e);
        }
        // 复位
        isMove = false;
        startTime = 0;
        endTime = 0;
      };
    },
    // 根据key查询cookie的值
    getCookie: function (key) {
      let res;
      let cookiesArr = document.cookie.split(";");
      cookiesArr.forEach(function (item) {
        item = item.trim();
        let itemArr = item.split("=");
        if (itemArr[0] == key) {
          res = itemArr[1];
        }
      });
      return res;
    },
    // 添加cookie
    addCookie: function (key, value, time) {
      document.cookie = key + "=" + value + ";max-age=" + time;
    },
    // 修改cookie
    changeCookie: function (key, value, time) {
      addCookie(key, value, time);
    },
    // 删除cookie
    deleteCookie: function (key) {
      addCookie(key, "", -1);
    },
    /* 
    options: {
        type: 'get', // 请求类型
        url: '', // 请求url
        data: {}, // 传给服务器的参数
        // 设置请求头的类型
        header: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        // 成功的回调函数
        success: function (data, xhr) { },
        // 失败的回调
        error: function (data, xhr) { },
        // 默认超时时间10分钟
        timeout: 1000 * 60 * 10,
    }
    */
    // ajax请求
    ajax: function (options) {
      // 保存定时器id
      let timer;
      // 定义默认值
      let defaults = {
        type: "get",
        url: "",
        data: {},
        header: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        success: function () {},
        error: function () {},
        // 默认超时时间10分钟
        timeout: 1000 * 60 * 10,
      };

      // 使用options对象中的属性覆盖defaults对象中的属性
      Object.assign(defaults, options);

      // 1、创建Ajax对象，同时处理兼容性问题
      let xhr;
      if (window.XMLHttpRequest) {
        //  IE7+, Firefox, Chrome, Opera, Safari 浏览器执行代码
        xhr = new XMLHttpRequest();
      } else {
        // IE6, IE5 浏览器执行代码
        xhr = new ActiveXObject("Microsoft.XMLHTTP");
      }

      // 拼接请求参数的变量
      let params = "";

      //  循环用户传递进来的对象格式参数
      for (let attr in defaults.data) {
        // 将参数转换成字符串格式
        params += attr + "=" + defaults.data[attr] + "&";
      }
      // 将参数最后面的&截取掉
      // 将截取的结果重新赋值给params变量
      params = params.substr(0, params.length - 1);

      // 判断请求方式
      if (defaults.type == "get") {
        defaults.url = defaults.url + "?" + params;
      }

      // 2、配置Ajax对象
      xhr.open(defaults.type, defaults.url, true);

      // 3、发送请求
      // 如果请求方式为post
      if (defaults.type == "post") {
        // 用户希望的向服务器端传递的请求参数的类型
        let contentType = defaults.header["Content-Type"];
        // 设置请求参数格式的类型
        xhr.setRequestHeader("Content-Type", contentType);

        // 判断用户希望的请求参数格式的类型
        // 如果类型为json
        if (contentType === "application/json") {
          // 向服务器端传递json数据格式的参数
          xhr.send(JSON.stringify(defaults.data));
        } else {
          // 向服务器端传递普通类型的请求参数
          xhr.send(params);
        }
      } else {
        xhr.send();
      }

      // 4、获取服务器响应到客户端的数据
      xhr.onreadystatechange = function () {
        // 如果没有获取全部数据, 直接返回, 不往后做处理
        if (xhr.readyState !== 4) return;

        // 如果拿到请求的数据了，也需要将定时器关闭
        timer && clearTimeout(timer);

        // 通过xhr.getResponseHeader()方法获取响应头中的数据
        let contentType = xhr.getResponseHeader("Content-Type");
        // 服务器返回的数据
        let responseText = xhr.responseText;

        // 如果响应类型中包含applicaition/json
        if (contentType.includes("application/json")) {
          // 将json字符串转换为json对象
          responseText = JSON.parse(responseText);
        }

        // 状态码为2**, 或者304，表示请求成功
        if ((xhr.status >= 200 && xhr.status < 300) || xhr.status === 304) {
          // 将获取到的后端数据传给success函数
          defaults.success && defaults.success(responseText, xhr);
        } else {
          // 处理请求失败的情况
          defaults.error && defaults.error(responseText, xhr);
        }
      };

      // 5、加入请求超时的功能
      if (defaults.timeout) {
        timer = setTimeout(function () {
          // 调用xhr.abort()方法，将该次请求取消
          xhr.abort();
          // 清除定时器
          clearTimeout(timer);
        }, defaults.timeout);
      }
    },
    // 发送jaonp请求
    /* 
      options: {
        // url地址
        url: '',
        // 参数
        data: {},
        // 后台字段名
        key: 'callback',
        // 回调函数
        success: function (data) {
          console.log(data);
        }
      }
    */
    jsonp: function (options) {
      // 1、动态创建script标签
      let script = document.createElement("script");
      // 因为fn2函数的名字是固定的，当同时发送多个jsonp请求时，会导致后面的请求覆盖掉前面的请求，所以我们需要随机生成函数的名字
      let fnName = "myJsonp" + Math.random().toString().replace(".", "");
      // options.success已经不是全局的函数了，我们要想办法将它变成一个全局函数
      window[fnName] = options.success;

      // 拼接字符串的变量
      let params = "";
      for (let attr in options.data) {
        params += "&" + attr + "=" + options.data[attr];
      }

      // 2、为script标签添加src属性
      script.src = options.url + "?" + options.key + "=" + fnName + params;
      // 3、将script添加到页面中
      document.body.appendChild(script);
      // 4、为script添加onload事件，获得数据后将该script移除掉
      script.onload = function () {
        document.body.removeChild(script);
      };
    },
  };

  // 将方法方法放到window对象上
  window.myTools = myTools;
})();
