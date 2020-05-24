const db = require('../utils/db')

//创建Schema
const userSchema = db.Schema({
    username:{type:String,required:true},
    password:{type:String,required:true}
})

//创建集合
const Users = db.model('users',userSchema)

//注册

const save = data => {
    return Users.insertMany(data)
                .then(res=>true)
                .catch(res=>false)
}

const findOne = data =>{
    return Users.findOne(data)
}

//暴露
module.exports = {
    save,findOne
}