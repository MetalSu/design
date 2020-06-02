const homeTpl = require('./views/Home.html')
const manageTpl = require('./views/Manage.html')
const manageTplErr = require('./views/Manage-err.html')
const manageTplSea = require('./views/Manage-search.html')
const managePoTpl = require('./views/ManagePost.html')
const managePoUpTpl = require('./views/ManagePostUp.html')
const userinfoTpl = require('./views/userInfo.html')
const userShowfoTpl = require('./views/usershow.html')




//选项卡切换
$('.sidebar-menu li').on('click',function(){
    //切换样式
    $(this).addClass('active').siblings().removeClass('active');
    //获取当前用户点击的li的link属性
    let linkAttr = $(this).attr('link');
    switch(linkAttr){
        case "home.html":
            let loginusername = localStorage.getItem('loginusername')
            getindexT(loginusername)
            break;
        case "manage.html":
            getmanageT()
            break;
    }
})

//添加信息操作
$('.content').on('click','#addbtn',function(){
    let rootkey = localStorage.getItem('rootkey')
    if(rootkey){
        $('.content').html(managePoTpl)
    }else{
        alert('当前用户无权限')
    }
})
// 查询
$('.content').on('click','.btn-default',function(event){
    const data = {}
    var flag = $('input[name="pos_search"]').val()
    data["pos_search"] = flag
    $.ajax({
        url:'/api/manage/search',
        method:'post',
        data,
        dataType:"json",
        success:data=>{
            if(data.flag){
                var html = template.render(manageTpl,{
                    data:data.data
                })
                $('.content').html(html)
            }else{
                var html = template.render(manageTplSea)
                $('.content').html(html)
            }
        }
    }) 
})

//返回
$('.content').on('click','#posback',function(){
    getmanageT()
})

//提交按钮
$('.content').on('click','#possubmit',function(){
    let data = $('#possave').serialize()
    let url = $(this).attr("from") === "add" ? '/api/manage/add' : '/api/manage/update' 
    $.ajax({
        url,
        method:'post',
        data,
        dataType:"json",
        success:data=>{
            if(data.flag){
                getmanageT()
            }else{
                alert('添加失败')
            }
        }
    })
})

//渲染信息
function getmanageT(){
    $.ajax({
        url:'/api/manage/find',
        dataType:'json',
        success:data=>{
            let loginusername = localStorage.getItem('loginusername') ? localStorage.getItem('loginusername') : 0
            if(loginusername){
                var html = template.render(manageTpl,{
                    data:data.data
                })
                $('.content').html(html)
            }else{
                var html = template.render(manageTplErr)
                $('.content').html(html)
            }
            
        }
    })
}





//修改 实现更新
$('.content').on('click','.pos-edit',function(){
    let rootkey = localStorage.getItem('rootkey')
    if(rootkey){
        let posId = $(this).attr("posid")
        //根据posid发起请求，进行回填
        $.ajax({
            url:'/api/manage/'+posId,
            dataType:'json',
            success:data=>{
                var html = template.render(managePoUpTpl,{
                    data:data.data
                })
                $('.content').html(html)
            }
        })
    }else{
        alert('当前用户无权限')
    }
})

//删除
$('.content').on('click','.pos-remove',function(){
    let rootkey = localStorage.getItem('rootkey')
    if(rootkey){
        let posId = $(this).attr("posid")
        $.ajax({
            url:'/api/manage/del/'+posId,
            method:'post',
            dataType:"json",
            success:data=>{
                if(data.flag){
                    getmanageT()
                    alert('删除成功')
                }else{
                    alert('删除失败')
                }
            }
        })
    }else{
        alert('当前用户无权限')
    }
})

//登录注册
let isSignin = false
let greeting = localStorage.getItem('loginusername') ? localStorage.getItem('loginusername') : ''

//登录用户名渲染
renderTpl(isSignin,greeting)
function renderTpl({isSignin,greeting}){
    var html = template.render(userinfoTpl,{
        isSignin,greeting
    })
    $('.user-menu').html(html)
}
//渲染index页面
getindexT(greeting)
function getindexT(greeting){
    if(greeting){
        var html = template.render(homeTpl,{
            greeting
        })
        $('.content').html(html)
    }else{
        greeting = ''
        var html = template.render(homeTpl,{
            greeting
        })
        $('.content').html(html)
    }
    
}
//左侧用户名渲染
userrender(isSignin,greeting)
function userrender({isSignin,greeting}){
    var html = template.render(userShowfoTpl,{
        isSignin,
        greeting
    })
    $('.user-panel').html(html)
}


//登录注册点击事件
$('.navbar-nav').on('click','.user-menu span',function(event){
    if($(this).attr("id") === "btn-signup"){ //点击的是注册
        $("#user-submit").off("click").on("click",async function(e){
            //获取用户名和密码
            let username = $("#username").val();
            let password = $("#password").val()
            let result = await sign({username,password},"loginup")
            alert(result.data.message)
        })
    }else{
        $('#user-submit').off("click").on('click',async function(event){
            //获取用户名和密码
            let username = $('#username').val()
            let password = $('#password').val()
            let result = await sign({username,password},"loginin")
            let loginusername = result.data.username
            if(result.flag){
                renderTpl({
                    isSignin:true,
                    greeting:'欢迎,'+result.data.username
                })
                userrender({
                    isSignin:true,
                    greeting:result.data.username
                })
                getindexT(loginusername)
                //将后端返回的token放入到本地存储中
                localStorage.setItem('token',result.data.token)
                localStorage.setItem('loginusername',result.data.username)
                isRootKey()
            }else{
                alert(result.data.message)
            }
        })
    }
})

//登录
function sign(data,uri){
    return $.ajax({
        url:'/api/users/'+uri,
        data,
        type:'post',
        dataType:'json',
        success:data=>{
            return data
        }
    })
}
//退出登录
$('.user-menu').on('click','#user-signout',function(event){
    localStorage.removeItem('token')
    localStorage.removeItem('loginusername')
    localStorage.removeItem('rootkey')
    renderTpl({
        isSignin:false
    })
    location.href = '/'
})


//验证用户登录方法
verifySignin()
function verifySignin(){
    $.ajax({
        url:'/api/users/isloginin',
        type:'post',
        dataType:'json',
        headers:{
            'X-Access-Token':localStorage.getItem('token')
        },
        success:result=>{
            if(result.flag){
                renderTpl({
                    isSignin:true,
                    greeting:'欢迎,'+result.data.username
                })
                userrender({
                    isSignin:true,
                    greeting:result.data.username
                })
            }
        }
    })
}


//判断管理员权限
isRootKey()
function isRootKey(){
    let name = localStorage.getItem('loginusername') 
    const loginusername ={}
    loginusername['username'] = name
    $.ajax({
        url:'/api/users/isroot',
        type:'post',
        dataType:'json',
        data:loginusername,
        success:result=>{
            let rootkey = result.data
            localStorage.setItem('rootkey',rootkey)
        }
    })
}