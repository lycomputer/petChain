# pet-chain

本辅助基于cogons大佬的[pet-chain](https://github.com/cogons/pet-chain)进行二次开发。

## 简介

这是一个莱茨狗的抢购助手，用户可以根据自己定义的数值，来让其自己抢狗。

<<<<<<< HEAD
在这里，自己主要针对cogons大佬的代码做了以下优化:

[ - ] 添加打码兔接口，1分钱1码

[ - ] 删掉baidu接口（识别率太低）

[ - ] 优化提示信息
=======
1. 安装node环境
2. clone项目到本地
3. 运行 npm install 或者 yarn
4. 修改配置 config.js
5. 运行 node index.js
>>>>>>> origin/master

[ - ] 提高验证码使用效率

## 配置方式 

**1.安装[nodejs](http://nodejs.cn/download/),**windows下载msi安装包即可，看清位数就行。然后执行

`git clone `

**2.修改配置文件。**

**主要配置文件 ：config.js**

```js
module.exports = {
    cookie: "",
    threshold:[1000,1500,2000,3000,10000], // 从普通到神话的购买上限
    show_affordable_message:true, //是否显示信息
    yzm_method:"dama2", // 验证码识别方式："dama2"打码兔 || "manual"手工输入
    dama2_user:"test",//打码兔注册的账号
    dama2_pass:"test",//打码兔账号密码
    captchas_max:3, //打码兔获取验证码数量。
    page_indexs:1,
    sleep_time:100,
}
```

**3.开始享用。**

当前目录下，运行 node index.js

**4.打码兔链接：http://dama2.com/**

<<<<<<< HEAD
## 其他说明

1. 验证码为累计使用，你所有自己输入的验证码都存在数组中。以便购买时使用。实现秒输验证码。

2. 在手动验证码模式下，需要手动输入 yzm.png 中的内容，并敲 enter 。识别时可能会有购买信息弹出，不用理他，直接继续输就好。

3. 欢迎大家测试，提出宝贵意见！

4. 打赏链接，1毛不嫌少。欢迎大家抢到狗后给我一个反馈。一个更新插件的动力。

   ![微信.png](微信.png)

   ![支付宝.png](支付宝.png)

   ​
=======
1. 查询超时是百度服务器没有返回相关数据，只需让脚本继续重试即可
2. 在手动验证码模式下，需要手动输入 yzm.png 中的内容，并敲 enter 进入购买环节
3. 由于验证码的存在，抢狗还需靠手速，请耐心尝试~
4. 出现 SyntaxError: Unexpected token function 请升级 node 版本到 7.6 以上
>>>>>>> origin/master
