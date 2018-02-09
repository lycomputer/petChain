module.exports = {
    cookie: "",
<<<<<<< HEAD
    threshold:[1000,1500,2000,3000,10000], // 从普通到神话的购买上限
    show_affordable_message:true, //是否显示信息
    yzm_method:"manual", // "dama2" || "manual"
    dama2_user:"test",//打码兔注册的账号
    dama2_pass:"test",//打码兔账号密码
    captchas_max:3, //打码兔获取验证码数量。
    page_indexs:1,
    sleep_time:100,
=======
    baidu_ocr: { // 百度开放平台ocr
        APP_ID: "",
        API_KEY: '',
        SECRET_KEY: ''
    },
    reverse:true, // 从后往前购买
    yzm_method:"manual", // "baidu" || "manual"
    threshold:[1400,1400,1400,1400,1400,1400], // 普通、稀有、卓越、史诗、神话、传说
    query_amount:3000, //查询次数
    show_affordable_message:true //显示是否买得起的信息
>>>>>>> origin/master
}