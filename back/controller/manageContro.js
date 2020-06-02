//引入模型层
const manageModel = require('../model/manageModel')


const add = async (req,res)=>{
    const flag = await manageModel.save(req.body)
    console.log(req.body)
    if(flag){
        // res.send({flag:true,data:{message:'success'}})
        res.render("api.success.ejs",{
            data:JSON.stringify({message:"success"})
        })
    }else{
        res.render("api.fail.ejs",{
            data:JSON.stringify({message:"fail"})
        })
    }
}

const del = async (req,res)=>{
    console.log(req.params.id)
    const data = await manageModel.del(req.params.id)
    res.render("api.success.ejs",{
        data:JSON.stringify(data)
    })
}

//查找信息
const find = async (req,res)=>{
    const data = await manageModel.find()
    res.render("api.success.ejs",{
        data:JSON.stringify(data)
    })
}
//根据ID查找信息
const findById = async (req,res)=>{
    const data = await manageModel.findById(req.params.id)
    res.render("api.success.ejs",{
        data:JSON.stringify(data)
    })
}
//修改信息
const update = async (req,res)=>{
    let flag = await manageModel.findOneAndUpdate(req.body.id,req.body)
    if(flag){
        // res.send({flag:true,data:{message:'success'}})
        res.render("api.success.ejs",{
            data:JSON.stringify({message:"success"})
        })
    }else{
        res.render("api.fail.ejs",{
            data:JSON.stringify({message:"fail"})
        })
    }
}
//查询信息
const search = async (req,res)=>{
    const flag = {}
    flag["staffName"] = req.body.pos_search
    const data = await manageModel.search(flag)
    if(!data[0] == []){
        res.render("api.success.ejs",{
            data:JSON.stringify(data)
        })
    }else{
        res.render("api.fail.ejs",{
            data:JSON.stringify({message:"fail"})
        })
    }
}

module.exports = {
    add,find,findById,update,del,search
}