'use strict';

const fs = require("fs")
const os = require('os')
let config;
<<<<<<< HEAD
let yzm_res;
let yzm_sl = 0;
const petRare=["普通","稀有","卓越","史诗","神话","传说"]
try {
	config = require("./config.m")
} catch (e) {
	config = require("./config")
=======
try {
    config = require("./config.m")
} catch (e) {
    config = require("./config")
>>>>>>> origin/master
}
const prompt = require('prompt')
var Base64 = require('js-base64').Base64;
const axios = require("axios").create({
<<<<<<< HEAD
	headers: { 'Cookie': config.cookie }
=======
    headers: {
        'Cookie': config.cookie,
        'Host': 'pet-chain.baidu.com',
        'Origin': 'https://pet-chain.baidu.com',
        'User-Agent': 'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/64.0.3282.140 Mobile Safari/537.36'
    }
>>>>>>> origin/master
});
var apiQueryPetsOnSale = 'https://pet-chain.baidu.com/data/market/queryPetsOnSale';
var apiTxnCreate = 'https://pet-chain.baidu.com/data/txn/create';
const apiGen = 'https://pet-chain.baidu.com/data/captcha/gen'
const exec = require('child_process').exec;
const time = new Date().getTime()
const captchas = []
let captchas_num = 0
// console.log(config)
const pr = (v) => {
	return new Promise(function (resolve, reject) {
		prompt.get(v, function (err, result) {
			if (err) reject(err)
			resolve(result)
		});
	})
}
function getUserInfo() {
	axios.post('https://pet-chain.baidu.com/data/user/get', {
		"requestId": Date.now(),
		"appId": 1,
		"tpl": ""
	}).then(r => {
		const { userName, amount } = r.data.data
		console.log("[-] 当前登录用户为：", userName, "剩余金额：", amount)
		console.log("[-] 购买价格为：", config.threshold)
		console.log("[-] 验证码识别方式为：", config.yzm_method)
		console.log("[-] 单次查询页数为：", config.page_indexs)

	})

}

function requirements(pet) {
<<<<<<< HEAD
=======
    if (config.show_affordable_message) {
        console.log("宠物价格为：", pet.amount, "，宠物等级为：", pet.rareDegree)
        console.log("你设置的对应等级购买阈值为：", config.threshold[pet.rareDegree])
    }
    if (pet.amount <= config.threshold[pet.rareDegree]) {
        if (config.show_affordable_message) console.log("买得起！")
        return true
    } else {
        if (config.show_affordable_message) console.log("买不起...")
        return false
    }
>>>>>>> origin/master

	if (pet.amount <= config.threshold[pet.rareDegree]) {
		return true
	} else {
		return false
	}

}
let runCaptcha
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
}
async function recognizeCaptcha() {
	// console.log(captchas)
	yzm_sl++;
	console.log('当前验证码数量： ', captchas.length)
	stopCaptcha()
	const seed = await axios.post('https://pet-chain.baidu.com/data/captcha/gen', {
		"requestId": Date.now(),
		"appId": 1,
		"tpl": ""
	}).then(r => {
		const { img, seed } = r.data.data
		fs.writeFileSync('yzm.png', img, 'base64');
		if (os.platform() == "darwin") exec('open yzm.png')
		return seed
	})


	await sleep(100)
	prompt.start();
	const cpt = await pr("captcha")
	const code = cpt['captcha']
	captchas.push({
		code,
		seed,
		at: Date.now()
	})
	startCaptcha();

	if (code === 'stop') stopCaptcha()
	else if (code === 'skip') return
}
function stopCaptcha() {
	clearInterval(runCaptcha)
}
function startCaptcha() {
	runCaptcha = setInterval(() => {
		recognizeCaptcha()
	}, 2000)
}

async function dama2A() {
	++captchas_num;
	yzm_sl++;
	let Dama2 = require('dama2')
	let appID = '54311';
	let appKey = 'cb78ec4c8c7a719ec0d99feef5983d03';
	let user = config.dama2_user;
	let pwd = config.dama2_pass;
	let dama2 = new Dama2(appID, appKey, user, pwd);
	let code;

	const seed = await axios.post('https://pet-chain.baidu.com/data/captcha/gen', {
		"requestId": Date.now(),
		"appId": 1,
		"tpl": ""
	}).then(r => {
		const { img, seed } = r.data.data
		fs.writeFileSync('yzm.png', img, 'base64');
		if (os.platform() == "darwin") exec('open yzm.png')
		return seed
	})

	dama2.login(function (error, auth) {
		dama2.decodeFile(42, 'yzm.png', 4, 3, function (error, result) {
			//console.log(error);
			try {
				dama2.getResult(result['id'], function (error, result) {
					// console.log(result['result']);
					code = result['result'];
				})
			}
			catch (e) {
				console.log("[-] 请检查打码兔余额是否充足！！")
				--captchas_num;
			}
		})

	})

	let timer = setInterval(function () {
		if (code) {
			captchas.push({
				code,
				seed,
				at: Date.now()
			});
			code = 0;
			console.log("[-] 已成功获取验证码，当前还剩 ", captchas.length)
			clearInterval(timer)
		}
	}, 1000)
}


<<<<<<< HEAD
(async function () {
	let cnt = 1
	let query_time = 0;

	getUserInfo()
	if (config.yzm_method == "manual") startCaptcha()
	while (cnt++) {
		if (captchas_num < config.captchas_max && config.yzm_method == "dama2") dama2A()
		await sleep(config.sleep_time)

		for (let i1 = 1; i1 <= config.page_indexs; i1++) {
			try {


				// console.log(`[-]第${i1}页数据！`)
				const pets = await axios.post(apiQueryPetsOnSale, {
					"pageNo": i1,
					"pageSize": 20,
					"querySortType": "AMOUNT_ASC",
					"petIds": [],
					"lastAmount": null,
					"lastRareDegree": null,
					"requestId": time,
					"appId": 1,
					"tpl": ""
				})
				// if(i1==1) console.log(`第${++query_time}次查询！当前最低价格：${pets.data.data.petsOnSale[0].amount}`)

				for (let i = 0; i < pets.data.data.petsOnSale.length; i++) {

					let pet = pets.data.data.petsOnSale[i]

					if (!requirements(pet)) {
						continue
					}

					const yzm_res = captchas.shift()
					captchas_num--;
					const res = await axios.post(apiTxnCreate, {
						"validCode": pet.validCode,
						"seed": yzm_res.seed,
						"captcha": yzm_res.code,
						"petId": pet.petId,
						"requestId": yzm_res.at,
						"amount": pet.amount,
						"appId": 1,
						"tpl": ""
					})
					try {
						if (config.show_affordable_message) {
							// console.log("[+] 当前时间为：",)
							const d = new Date()
							console.log('\n')
							console.log("[", d.toTimeString().substring(0, 8), "] 当前正在购买 宠物价格为：", pet.amount, "/", config.threshold[pet.rareDegree], "，宠物等级为：", petRare[pet.rareDegree])
							if (res.data.errorMsg == 'success!') console.log("[-] 购买状态为： 成功购买！", res.data.errorMsg, " ，验证码还剩", captchas.length)
							else console.log("[x] 购买状态为：", res.data.errorMsg, " ，验证码还剩", captchas.length, "，已经使用验证码数量：", yzm_sl)
							console.log('\n')
						}

					} catch (e) { console.log(e) }
				}
			} catch (e) {

			}
		}
	}
=======
(async function() {
    let cnt = 0
    let query_time = 0;
    while (cnt++ < config.query_amount) {

        await sleep(500)

        try {

            const pets = await axios.post(apiQueryPetsOnSale, {
                "pageNo": 1,
                "pageSize": 20,
                "querySortType": "AMOUNT_ASC",
                "petIds": [],
                "lastAmount": null,
                "lastRareDegree": null,
                "requestId": time,
                "appId": 1,
                "tpl": ""
            })

            console.log(`第${++query_time}次查询！`)
            console.log("目前最低价：" + pets.data.data.petsOnSale[0].amount)
            if(config.reverse) pets.data.data.petsOnSale = pets.data.data.petsOnSale.reverse()
            for (let i = 0; i < pets.data.data.petsOnSale.length; i++) {

                let pet = pets.data.data.petsOnSale[i]

                if (!requirements(pet)) {
                    continue
                }

                console.log(pet)

                const yzm = await axios.post(apiGen, {
                    "requestId": time,
                    "appId": 1,
                    "tpl": ""
                })

                if(!yzm.data.data.img) continue;

                fs.writeFileSync('yzm.png', yzm.data.data.img, 'base64');
                if (os.platform() == "darwin") exec('open yzm.png')
                let yzm_res;
                if (config.yzm_method == "baidu") {
                    var image = fs.readFileSync("yzm.png").toString("base64")
                    const path = __dirname + "/yzm.png"
                    const yzm_baidu = await client.generalBasic(image, { language_type: "ENG" })
                    yzm_res = yzm_baidu.words_result[0].words
                }
                if (config.yzm_method == "manual") {
                    // 
                    prompt.start();
                    const yzm_m = await pr("yzm")
                    yzm_res = yzm_m.yzm
                }

                if (yzm_res) {

                    const res = await axios.post(apiTxnCreate, {
                        "validCode": pet.validCode,
                        "seed": yzm.data.data.seed,
                        "captcha": yzm_res,
                        "petId": pet.petId,
                        "requestId": time,
                        "amount": pet.amount,
                        "appId": 1,
                        "tpl": ""
                    })

                    console.log(res.data)

                }




            }
        } catch (e) {

            console.log(e.code)

        }
    }
>>>>>>> origin/master


})()
