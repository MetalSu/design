const homeTpl = require('./views/Home.html')
const manageTpl = require('./views/Manage.html')
const managePoTpl = require('./views/ManagePost.html')
const managePoUpTpl = require('./views/ManagePostUp.html')
const userinfoTpl = require('./views/userInfo.html')


$('.content').html(homeTpl)


//选项卡切换
$('.sidebar-menu li').on('click',function(){
    //切换样式
    $(this).addClass('active').siblings().removeClass('active');
    //获取当前用户点击的li的link属性
    let linkAttr = $(this).attr('link');
    switch(linkAttr){
        case "home.html":
            $('.content').html(homeTpl)
            break;
        case "manage.html":
            getmanageT()
            break;
    }
})

//添加信息操作
$('.content').on('click','#addbtn',function(){
    $('.content').html(managePoTpl)
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
            var html = template.render(manageTpl,{
                data:data.data
            })
            $('.content').html(html)
        }
    })
}


//修改 实现更新
$('.content').on('click','.pos-edit',function(){
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
})

//删除
$('.content').on('click','.pos-remove',function(){
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
})

//登录注册
let isSignin = false
let greeting = 'hello,world'
renderTpl(isSignin,greeting)
function renderTpl({isSignin,greeting}){
    var html = template.render(userinfoTpl,{
        isSignin,greeting
    })
    $('.user-menu').html(html)
}

//登录注册点击事件
$('.navbar-nav').on('click','.user-menu span',function(event){
    if($(this).attr("id") === "btn-signup"){ //点击的是注册
        $("#user-submit").off("click").on("click",async function(e){
            //获取用户名和密码
            let username = $("#username").val();
            let password = $("#password").val()
            let result = await sign({username,password},"loginup")
        })
    }else{
        $('#user-submit').off("click").on('click',async function(event){
            //获取用户名和密码
            let username = $('#username').val()
            let password = $('#password').val()
            let result = await sign({username,password},"loginin")
            if(result.flag){
                renderTpl({
                    isSignin:true,
                    greeting:'欢迎,'+result.data.username
                })
            }else{
                alert(result.data.message)
            }
        })
    }
})

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