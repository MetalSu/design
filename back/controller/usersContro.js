const usersModel = require('../model/usersModel')
const jwt = require('jsonwebtoken')
const fs = require('fs')
const path = require('path')

//注册
const loginup = async function(req, res, next) {
    let username = req.body.username
    let flag = await usersModel.findOne({username})
    if(flag){
        //存在
        res.render("api.fail.ejs",{
            data:JSON.stringify({message:"此用户已经存在，请重新注册！"})
        })
    }else{
        //不存在
        let flag = await usersModel.save(req.body)
        flag ? res.render("api.success.ejs",{
            data:JSON.stringify({message:"注册成功"})
        }) : 
        res.render("api.fail.ejs",{
            data:JSON.stringify({message:"注册失败"})
        })
    }
}

//登录
const loginin = async function(req, res, next) {
    let flag = await usersModel.findOne(req.body)
    if(flag){
        //存在
        //服务端生成token令牌
        let token = getToken({username:req.body.username})
        res.render("api.success.ejs",{
            data:JSON.stringify({username:req.body.username,token})
        })
    }else{
        //不存在
        res.render("api.fail.ejs",{
            data:JSON.stringify({message:"用户名或密码错误"})
        })
    }
}

//生成token
function getToken(data){
    //privateKey是私钥加密  非对称加密
    //后端生成token的时候采用私钥进行token加密 
    //然后前端给后端发请求的时候通过公钥解密
    // 生成私钥  
    // ssh-keygen -t rsa -b 2048 -f private.key
    //生成公钥  
    //openssl rsa -in private.key -pubout -outform PEM -out public.key
    let privateKey =  fs.readFileSync(path.resolve(__dirname,'../keys/private.key'))
    let token = jwt.sign(data,privateKey,{
        algorithm:'RS256',
        expiresIn:'12h'
    })
    return token
}


module.exports = {
    loginup,loginin
}