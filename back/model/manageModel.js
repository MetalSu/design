const db = require('../utils/db')

//创建约束
const manageSchema = db.Schema({
    staffName:{type:String,required:true},
    staffSex:{type:String,required:true},
    positionName:{type:String,required:true},
    staffContact:{type:String,required:true},
    staffSalary:{type:String,required:true},
    staffMistake:{type:String,required:true},
    staffSign:{type:String,required:true},
    remark:{type:String,required:true}
})

const manage = db.model('manages',manageSchema)
    
//入库
// {
//     staffName: '张三',
//     staffSex: '男',
//     positionName:'前端',
//     staffContact:'18953272800',
//     staffSalary:'2800',
//     staffMistake:'无',
//     staffSign:'签到',
//     remark:'无'
// }
const save = function(data){
    return manage.insertMany(data)
    .then(res=>{
        return true
    })
    .catch(res=>{
        return false
    })
}
const del = function(data){
    return manage.remove({_id:data})
    .then(res=>{
        return true
    })
    .catch(res=>{
        return false
    })
}

//查询
const find = function(){
    return manage.find()
}
const search = function(req,res){
    return manage.find(req)
}
//根据传入的id查询
const findById = function(id){
    return manage.findById(id)
}
//根据传入的id更新数据
const findOneAndUpdate = function(id,data){
    return manage.update({_id:id},data)
                                    .then(res=>true)
                                    .catch(err=>false)
}


module.exports = {
    save,find,findById,findOneAndUpdate,del,search
}