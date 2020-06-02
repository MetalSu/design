/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/scripts/app.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/scripts/app.js":
/*!****************************!*\
  !*** ./src/scripts/app.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const homeTpl = __webpack_require__(/*! ./views/Home.html */ \"./src/scripts/views/Home.html\")\r\nconst manageTpl = __webpack_require__(/*! ./views/Manage.html */ \"./src/scripts/views/Manage.html\")\r\nconst manageTplErr = __webpack_require__(/*! ./views/Manage-err.html */ \"./src/scripts/views/Manage-err.html\")\r\nconst manageTplSea = __webpack_require__(/*! ./views/Manage-search.html */ \"./src/scripts/views/Manage-search.html\")\r\nconst managePoTpl = __webpack_require__(/*! ./views/ManagePost.html */ \"./src/scripts/views/ManagePost.html\")\r\nconst managePoUpTpl = __webpack_require__(/*! ./views/ManagePostUp.html */ \"./src/scripts/views/ManagePostUp.html\")\r\nconst userinfoTpl = __webpack_require__(/*! ./views/userInfo.html */ \"./src/scripts/views/userInfo.html\")\r\nconst userShowfoTpl = __webpack_require__(/*! ./views/usershow.html */ \"./src/scripts/views/usershow.html\")\r\n\r\n\r\n\r\n\r\n//选项卡切换\r\n$('.sidebar-menu li').on('click',function(){\r\n    //切换样式\r\n    $(this).addClass('active').siblings().removeClass('active');\r\n    //获取当前用户点击的li的link属性\r\n    let linkAttr = $(this).attr('link');\r\n    switch(linkAttr){\r\n        case \"home.html\":\r\n            let loginusername = localStorage.getItem('loginusername')\r\n            getindexT(loginusername)\r\n            break;\r\n        case \"manage.html\":\r\n            getmanageT()\r\n            break;\r\n    }\r\n})\r\n\r\n//添加信息操作\r\n$('.content').on('click','#addbtn',function(){\r\n    let rootkey = localStorage.getItem('rootkey')\r\n    if(rootkey){\r\n        $('.content').html(managePoTpl)\r\n    }else{\r\n        alert('当前用户无权限')\r\n    }\r\n})\r\n// 查询\r\n$('.content').on('click','.btn-default',function(event){\r\n    const data = {}\r\n    var flag = $('input[name=\"pos_search\"]').val()\r\n    data[\"pos_search\"] = flag\r\n    $.ajax({\r\n        url:'/api/manage/search',\r\n        method:'post',\r\n        data,\r\n        dataType:\"json\",\r\n        success:data=>{\r\n            if(data.flag){\r\n                var html = template.render(manageTpl,{\r\n                    data:data.data\r\n                })\r\n                $('.content').html(html)\r\n            }else{\r\n                var html = template.render(manageTplSea)\r\n                $('.content').html(html)\r\n            }\r\n        }\r\n    }) \r\n})\r\n\r\n//返回\r\n$('.content').on('click','#posback',function(){\r\n    getmanageT()\r\n})\r\n\r\n//提交按钮\r\n$('.content').on('click','#possubmit',function(){\r\n    let data = $('#possave').serialize()\r\n    let url = $(this).attr(\"from\") === \"add\" ? '/api/manage/add' : '/api/manage/update' \r\n    $.ajax({\r\n        url,\r\n        method:'post',\r\n        data,\r\n        dataType:\"json\",\r\n        success:data=>{\r\n            if(data.flag){\r\n                getmanageT()\r\n            }else{\r\n                alert('添加失败')\r\n            }\r\n        }\r\n    })\r\n})\r\n\r\n//渲染信息\r\nfunction getmanageT(){\r\n    $.ajax({\r\n        url:'/api/manage/find',\r\n        dataType:'json',\r\n        success:data=>{\r\n            let loginusername = localStorage.getItem('loginusername') ? localStorage.getItem('loginusername') : 0\r\n            if(loginusername){\r\n                var html = template.render(manageTpl,{\r\n                    data:data.data\r\n                })\r\n                $('.content').html(html)\r\n            }else{\r\n                var html = template.render(manageTplErr)\r\n                $('.content').html(html)\r\n            }\r\n            \r\n        }\r\n    })\r\n}\r\n\r\n\r\n\r\n\r\n\r\n//修改 实现更新\r\n$('.content').on('click','.pos-edit',function(){\r\n    let rootkey = localStorage.getItem('rootkey')\r\n    if(rootkey){\r\n        let posId = $(this).attr(\"posid\")\r\n        //根据posid发起请求，进行回填\r\n        $.ajax({\r\n            url:'/api/manage/'+posId,\r\n            dataType:'json',\r\n            success:data=>{\r\n                var html = template.render(managePoUpTpl,{\r\n                    data:data.data\r\n                })\r\n                $('.content').html(html)\r\n            }\r\n        })\r\n    }else{\r\n        alert('当前用户无权限')\r\n    }\r\n})\r\n\r\n//删除\r\n$('.content').on('click','.pos-remove',function(){\r\n    let rootkey = localStorage.getItem('rootkey')\r\n    if(rootkey){\r\n        let posId = $(this).attr(\"posid\")\r\n        $.ajax({\r\n            url:'/api/manage/del/'+posId,\r\n            method:'post',\r\n            dataType:\"json\",\r\n            success:data=>{\r\n                if(data.flag){\r\n                    getmanageT()\r\n                    alert('删除成功')\r\n                }else{\r\n                    alert('删除失败')\r\n                }\r\n            }\r\n        })\r\n    }else{\r\n        alert('当前用户无权限')\r\n    }\r\n})\r\n\r\n//登录注册\r\nlet isSignin = false\r\nlet greeting = localStorage.getItem('loginusername') ? localStorage.getItem('loginusername') : ''\r\n\r\n//登录用户名渲染\r\nrenderTpl(isSignin,greeting)\r\nfunction renderTpl({isSignin,greeting}){\r\n    var html = template.render(userinfoTpl,{\r\n        isSignin,greeting\r\n    })\r\n    $('.user-menu').html(html)\r\n}\r\n//渲染index页面\r\ngetindexT(greeting)\r\nfunction getindexT(greeting){\r\n    if(greeting){\r\n        var html = template.render(homeTpl,{\r\n            greeting\r\n        })\r\n        $('.content').html(html)\r\n    }else{\r\n        greeting = ''\r\n        var html = template.render(homeTpl,{\r\n            greeting\r\n        })\r\n        $('.content').html(html)\r\n    }\r\n    \r\n}\r\n//左侧用户名渲染\r\nuserrender(isSignin,greeting)\r\nfunction userrender({isSignin,greeting}){\r\n    var html = template.render(userShowfoTpl,{\r\n        isSignin,\r\n        greeting\r\n    })\r\n    $('.user-panel').html(html)\r\n}\r\n\r\n\r\n//登录注册点击事件\r\n$('.navbar-nav').on('click','.user-menu span',function(event){\r\n    if($(this).attr(\"id\") === \"btn-signup\"){ //点击的是注册\r\n        $(\"#user-submit\").off(\"click\").on(\"click\",async function(e){\r\n            //获取用户名和密码\r\n            let username = $(\"#username\").val();\r\n            let password = $(\"#password\").val()\r\n            let result = await sign({username,password},\"loginup\")\r\n            alert(result.data.message)\r\n        })\r\n    }else{\r\n        $('#user-submit').off(\"click\").on('click',async function(event){\r\n            //获取用户名和密码\r\n            let username = $('#username').val()\r\n            let password = $('#password').val()\r\n            let result = await sign({username,password},\"loginin\")\r\n            let loginusername = result.data.username\r\n            if(result.flag){\r\n                renderTpl({\r\n                    isSignin:true,\r\n                    greeting:'欢迎,'+result.data.username\r\n                })\r\n                userrender({\r\n                    isSignin:true,\r\n                    greeting:result.data.username\r\n                })\r\n                getindexT(loginusername)\r\n                //将后端返回的token放入到本地存储中\r\n                localStorage.setItem('token',result.data.token)\r\n                localStorage.setItem('loginusername',result.data.username)\r\n                isRootKey()\r\n            }else{\r\n                alert(result.data.message)\r\n            }\r\n        })\r\n    }\r\n})\r\n\r\n//登录\r\nfunction sign(data,uri){\r\n    return $.ajax({\r\n        url:'/api/users/'+uri,\r\n        data,\r\n        type:'post',\r\n        dataType:'json',\r\n        success:data=>{\r\n            return data\r\n        }\r\n    })\r\n}\r\n//退出登录\r\n$('.user-menu').on('click','#user-signout',function(event){\r\n    localStorage.removeItem('token')\r\n    localStorage.removeItem('loginusername')\r\n    localStorage.removeItem('rootkey')\r\n    renderTpl({\r\n        isSignin:false\r\n    })\r\n    location.href = '/'\r\n})\r\n\r\n\r\n//验证用户登录方法\r\nverifySignin()\r\nfunction verifySignin(){\r\n    $.ajax({\r\n        url:'/api/users/isloginin',\r\n        type:'post',\r\n        dataType:'json',\r\n        headers:{\r\n            'X-Access-Token':localStorage.getItem('token')\r\n        },\r\n        success:result=>{\r\n            if(result.flag){\r\n                renderTpl({\r\n                    isSignin:true,\r\n                    greeting:'欢迎,'+result.data.username\r\n                })\r\n                userrender({\r\n                    isSignin:true,\r\n                    greeting:result.data.username\r\n                })\r\n            }\r\n        }\r\n    })\r\n}\r\n\r\n\r\n//判断管理员权限\r\nisRootKey()\r\nfunction isRootKey(){\r\n    let name = localStorage.getItem('loginusername') \r\n    const loginusername ={}\r\n    loginusername['username'] = name\r\n    $.ajax({\r\n        url:'/api/users/isroot',\r\n        type:'post',\r\n        dataType:'json',\r\n        data:loginusername,\r\n        success:result=>{\r\n            let rootkey = result.data\r\n            localStorage.setItem('rootkey',rootkey)\r\n        }\r\n    })\r\n}\n\n//# sourceURL=webpack:///./src/scripts/app.js?");

/***/ }),

/***/ "./src/scripts/views/Home.html":
/*!*************************************!*\
  !*** ./src/scripts/views/Home.html ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = \"<div class=\\\"home\\\">    <div class=\\\"box\\\">        <div class=\\\"box-header with-border\\\">            <div class=\\\"page-header\\\">                你好!欢迎{{greeting}}            </div>        </div>    </div> </div>\"\n\n//# sourceURL=webpack:///./src/scripts/views/Home.html?");

/***/ }),

/***/ "./src/scripts/views/Manage-err.html":
/*!*******************************************!*\
  !*** ./src/scripts/views/Manage-err.html ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = \"<div class=\\\"box\\\">    <div class=\\\"box-body\\\">        <table>        <tr>          <td colspan=\\\"8\\\">登录后即可查看人员信息。</td>        </tr>        </table>    </div></div>\"\n\n//# sourceURL=webpack:///./src/scripts/views/Manage-err.html?");

/***/ }),

/***/ "./src/scripts/views/Manage-search.html":
/*!**********************************************!*\
  !*** ./src/scripts/views/Manage-search.html ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = \"<div class=\\\"box\\\">  <div class=\\\"box-header with-border\\\">    <h3 class=\\\"box-title\\\">        <button id=\\\"addbtn\\\" class=\\\"btn btn-block btn-success\\\"><span class=\\\"fa fa-plus\\\"></span> 添加</button>    </h3>    <div class=\\\"box-tools\\\">        <div class=\\\"input-group input-group-sm\\\" style=\\\"width: 150px;\\\">            <input type=\\\"text\\\" value=\\\"\\\" name=\\\"pos_search\\\" class=\\\"form-control pull-right\\\" placeholder=\\\"搜索\\\">            <div class=\\\"input-group-btn\\\">                <button type=\\\"button\\\" id=\\\"possearch\\\" class=\\\"btn btn-default\\\"><i class=\\\"fa fa-search\\\"></i></button>            </div>        </div>    </div>  </div>  <div class=\\\"box-body\\\">    <table>    <tr>      <td colspan=\\\"8\\\">请重新输入要查找的员工姓名</td>    </tr>    </table>  </div></div>\"\n\n//# sourceURL=webpack:///./src/scripts/views/Manage-search.html?");

/***/ }),

/***/ "./src/scripts/views/Manage.html":
/*!***************************************!*\
  !*** ./src/scripts/views/Manage.html ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = \"<div class=\\\"box\\\">    <div class=\\\"box-header with-border\\\">        <h3 class=\\\"box-title\\\">            <button id=\\\"addbtn\\\" class=\\\"btn btn-block btn-success\\\"><span class=\\\"fa fa-plus\\\"></span> 添加</button>        </h3>        <div class=\\\"box-tools\\\">            <div class=\\\"input-group input-group-sm\\\" style=\\\"width: 150px;\\\">                <input type=\\\"text\\\" value=\\\"\\\" name=\\\"pos_search\\\" class=\\\"form-control pull-right\\\" placeholder=\\\"搜索\\\">                <div class=\\\"input-group-btn\\\">                    <button type=\\\"button\\\" id=\\\"possearch\\\" class=\\\"btn btn-default\\\"><i class=\\\"fa fa-search\\\"></i></button>                </div>            </div>        </div>    </div>    <div class=\\\"box-body\\\">        <table class=\\\"table table-bordered\\\">            <tr>                <th style=\\\"width: 10px\\\">#</th>                <th>员工姓名</th>                <th>员工性别</th>                <th>职位名称</th>                <th>联系方式</th>                <th>岗位薪资</th>                <th>违纪情况</th>                <th>出勤状况</th>                <th style=\\\"width: 140px\\\">操作</th>            </tr>            {{each data}}            <tr>                <td>{{$index+1}}</td>                <td>{{$value.staffName}}</td>                <td>{{$value.staffSex}}</td>                <td>{{$value.positionName}}</td>                <td>{{$value.staffContact}}</td>                <td>{{$value.staffSalary}}</td>                <td>{{$value.staffMistake}}</td>                <td>{{$value.staffSign}}</td>                <td>                    <button class=\\\"btn btn-sm btn-primary pos-edit\\\" posid=\\\"{{$value._id}}\\\"><span                            class=\\\"fa fa-edit\\\"></span> 修改</button>                    <button class=\\\"btn btn-sm btn-danger pos-remove\\\" posid=\\\"{{$value._id}}\\\"                        filename=\\\"{{$value.companyLogo}}\\\"><span class=\\\"fa fa-remove\\\"></span> 删除</button>                </td>            </tr>            {{/each}}            <!-- <tr>          <td colspan=\\\"8\\\">暂无记录。</td>        </tr> -->        </table>    </div></div>\"\n\n//# sourceURL=webpack:///./src/scripts/views/Manage.html?");

/***/ }),

/***/ "./src/scripts/views/ManagePost.html":
/*!*******************************************!*\
  !*** ./src/scripts/views/ManagePost.html ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = \"<div class=\\\"box box-info\\\">    <div class=\\\"box-header with-border\\\">      <h3 class=\\\"box-title\\\">人员信息添加</h3>    </div>    <!-- /.box-header -->    <!-- form start -->    <form class=\\\"form-horizontal\\\" id=\\\"possave\\\" action=\\\"/api/position\\\" method=\\\"post\\\" enctype=\\\"multipart/form-data\\\">      <div class=\\\"box-body\\\">        <div class=\\\"form-group\\\">          <label for=\\\"staffName\\\" class=\\\"col-sm-2 control-label\\\">员工姓名</label>            <div class=\\\"col-sm-10\\\">            <input type=\\\"text\\\" class=\\\"form-control\\\" name=\\\"staffName\\\" id=\\\"companyLogo\\\" placeholder=\\\"请输入员工姓名\\\">          </div>        </div>        <div class=\\\"form-group\\\">          <label for=\\\"staffSex\\\" class=\\\"col-sm-2 control-label\\\">员工性别</label>            <div class=\\\"col-sm-10\\\">            <input type=\\\"text\\\" class=\\\"form-control\\\" name=\\\"staffSex\\\" id=\\\"companyLogo\\\" placeholder=\\\"请输入员工性别\\\">          </div>        </div>        <div class=\\\"form-group\\\">          <label for=\\\"positionName\\\" class=\\\"col-sm-2 control-label\\\">职位名称</label>            <div class=\\\"col-sm-10\\\">            <input type=\\\"text\\\" class=\\\"form-control\\\" name=\\\"positionName\\\" id=\\\"positionName\\\" placeholder=\\\"请输入职位名称\\\">          </div>        </div>        <div class=\\\"form-group\\\">          <label for=\\\"staffContact\\\" class=\\\"col-sm-2 control-label\\\">联系方式</label>            <div class=\\\"col-sm-10\\\">            <input type=\\\"text\\\" class=\\\"form-control\\\" name=\\\"staffContact\\\" id=\\\"city\\\" placeholder=\\\"请输入员工联系方式\\\">          </div>        </div>        <div class=\\\"form-group\\\">          <label for=\\\"staffSalary\\\" class=\\\"col-sm-2 control-label\\\">岗位薪资</label>            <div class=\\\"col-sm-10\\\">            <input type=\\\"text\\\" class=\\\"form-control\\\" name=\\\"staffSalary\\\" id=\\\"salary\\\" placeholder=\\\"请输入岗位薪资\\\">          </div>        </div>        <div class=\\\"form-group\\\">          <label for=\\\"staffMistake\\\" class=\\\"col-sm-2 control-label\\\">违纪情况</label>            <div class=\\\"col-sm-10\\\">            <input type=\\\"text\\\" class=\\\"form-control\\\" name=\\\"staffMistake\\\" id=\\\"type\\\" placeholder=\\\"请输入违纪情况\\\">          </div>        </div>        <div class=\\\"form-group\\\">          <label for=\\\"staffSign\\\" class=\\\"col-sm-2 control-label\\\">出勤状况</label>            <div class=\\\"col-sm-10\\\">            <input type=\\\"text\\\" class=\\\"form-control\\\" name=\\\"staffSign\\\" id=\\\"experience\\\" placeholder=\\\"请输入出勤状况\\\">          </div>        </div>        <div class=\\\"form-group\\\">          <label for=\\\"remark\\\" class=\\\"col-sm-2 control-label\\\">备注</label>            <div class=\\\"col-sm-10\\\">            <textarea rows=\\\"8\\\" cols=\\\"80\\\" name=\\\"remark\\\" class=\\\"form-control\\\" id=\\\"description\\\" placeholder=\\\"请输入备注\\\"></textarea>          </div>        </div>      </div>      <!-- /.box-body -->      <div class=\\\"box-footer\\\">        <button type=\\\"button\\\" id=\\\"posback\\\" class=\\\"btn btn-default\\\">返回</button>        <button from=\\\"add\\\" type=\\\"button\\\" id=\\\"possubmit\\\" class=\\\"btn btn-info pull-right\\\">提交</button>      </div>      <!-- /.box-footer -->    </form>  </div>  \"\n\n//# sourceURL=webpack:///./src/scripts/views/ManagePost.html?");

/***/ }),

/***/ "./src/scripts/views/ManagePostUp.html":
/*!*********************************************!*\
  !*** ./src/scripts/views/ManagePostUp.html ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = \"<div class=\\\"box box-info\\\">    <div class=\\\"box-header with-border\\\">      <h3 class=\\\"box-title\\\">人员信息修改</h3>    </div>    <!-- /.box-header -->    <!-- form start -->    <form class=\\\"form-horizontal\\\" id=\\\"possave\\\" action=\\\"/api/position\\\" method=\\\"post\\\" enctype=\\\"multipart/form-data\\\">      <div class=\\\"box-body\\\">        <div class=\\\"form-group\\\">          <label for=\\\"staffName\\\" class=\\\"col-sm-2 control-label\\\">员工姓名</label>            <div class=\\\"col-sm-10\\\">            <input value=\\'{{data.staffName}}\\' type=\\\"text\\\" class=\\\"form-control\\\" name=\\\"staffName\\\" id=\\\"companyLogo\\\" placeholder=\\\"请输入员工姓名\\\">          </div>        </div>        <div class=\\\"form-group\\\">          <label for=\\\"staffSex\\\" class=\\\"col-sm-2 control-label\\\">员工性别</label>            <div class=\\\"col-sm-10\\\">            <input value=\\'{{data.staffSex}}\\' type=\\\"text\\\" class=\\\"form-control\\\" name=\\\"staffSex\\\" id=\\\"companyLogo\\\" placeholder=\\\"请输入员工性别\\\">          </div>        </div>        <div class=\\\"form-group\\\">          <label for=\\\"positionName\\\" class=\\\"col-sm-2 control-label\\\">职位名称</label>            <div class=\\\"col-sm-10\\\">            <input value=\\'{{data.positionName}}\\' type=\\\"text\\\" class=\\\"form-control\\\" name=\\\"positionName\\\" id=\\\"positionName\\\" placeholder=\\\"请输入职位名称\\\">          </div>        </div>        <div class=\\\"form-group\\\">          <label for=\\\"staffContact\\\" class=\\\"col-sm-2 control-label\\\">联系方式</label>            <div class=\\\"col-sm-10\\\">            <input value=\\'{{data.staffContact}}\\' type=\\\"text\\\" class=\\\"form-control\\\" name=\\\"staffContact\\\" id=\\\"city\\\" placeholder=\\\"请输入员工联系方式\\\">          </div>        </div>        <div class=\\\"form-group\\\">          <label for=\\\"staffSalary\\\" class=\\\"col-sm-2 control-label\\\">岗位薪资</label>            <div class=\\\"col-sm-10\\\">            <input value=\\'{{data.staffSalary}}\\' type=\\\"text\\\" class=\\\"form-control\\\" name=\\\"staffSalary\\\" id=\\\"salary\\\" placeholder=\\\"请输入岗位薪资\\\">          </div>        </div>        <div class=\\\"form-group\\\">          <label for=\\\"staffMistake\\\" class=\\\"col-sm-2 control-label\\\">违纪情况</label>            <div class=\\\"col-sm-10\\\">            <input value=\\'{{data.staffMistake}}\\' type=\\\"text\\\" class=\\\"form-control\\\" name=\\\"staffMistake\\\" id=\\\"type\\\" placeholder=\\\"请输入违纪情况\\\">          </div>        </div>        <div class=\\\"form-group\\\">          <label for=\\\"staffSign\\\" class=\\\"col-sm-2 control-label\\\">出勤状况</label>            <div class=\\\"col-sm-10\\\">            <input value=\\'{{data.staffSign}}\\' type=\\\"text\\\" class=\\\"form-control\\\" name=\\\"staffSign\\\" id=\\\"experience\\\" placeholder=\\\"请输入出勤状况\\\">          </div>        </div>        <div class=\\\"form-group\\\">          <label for=\\\"remark\\\" class=\\\"col-sm-2 control-label\\\">备注</label>            <div class=\\\"col-sm-10\\\">            <textarea rows=\\\"8\\\" cols=\\\"80\\\" name=\\\"remark\\\" class=\\\"form-control\\\" id=\\\"description\\\" placeholder=\\\"请输入备注\\\">{{data.remark}}</textarea>          </div>        </div>      </div>      <!-- /.box-body -->      <div class=\\\"box-footer\\\">        <button type=\\\"button\\\" id=\\\"posback\\\" class=\\\"btn btn-default\\\">返回</button>        <button from=\\\"update\\\" type=\\\"button\\\" id=\\\"possubmit\\\" class=\\\"btn btn-info pull-right\\\">提交</button>      </div>      <!-- /.box-footer -->      <!-- 隐藏域 传递id -->      <input type=\\\"hidden\\\" name=\\'id\\' value=\\'{{data._id}}\\'>    </form>  </div>  \"\n\n//# sourceURL=webpack:///./src/scripts/views/ManagePostUp.html?");

/***/ }),

/***/ "./src/scripts/views/userInfo.html":
/*!*****************************************!*\
  !*** ./src/scripts/views/userInfo.html ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = \"<!-- User Account Menu -->    <!-- Menu Toggle Button -->    <a href=\\\"#\\\" class=\\\"dropdown-toggle\\\" data-toggle=\\\"dropdown\\\">        <!-- The user image in the navbar-->        {{if isSignin}}        <img src=\\\"/static/images/1.jpg\\\" class=\\\"user-image\\\" alt=\\\"User Image\\\">        <!-- hidden-xs hides the username on small devices so only the image appears. -->        <span class=\\\"hidden-xs\\\">{{greeting}}</span>        {{else}}        <div id=\\\"click-btn\\\">            <span id=\\\"btn-signin\\\">登录</span>            <span id=\\\"btn-signup\\\">注册</span>        </div>        {{/if}}    </a>    <ul class=\\\"dropdown-menu\\\">        <!-- The user image in the menu -->        {{if !isSignin}}        <li class=\\\"user-header\\\" id=\\\"user-header\\\">            <form role=\\\"form\\\">                <div class=\\\"box-body\\\">                    <div class=\\\"form-group user\\\">                        <label for=\\\"exampleInputEmail1\\\">用户名：</label>                        <input type=\\\"text\\\" class=\\\"form-control\\\" id=\\\"username\\\" placeholder=\\\"请输入用户名\\\">                    </div>                    <div class=\\\"form-group\\\">                        <label for=\\\"exampleInputPassword1\\\">密码：</label>                        <input type=\\\"password\\\" class=\\\"form-control\\\" id=\\\"password\\\" placeholder=\\\"请输入密码\\\">                    </div>                </div>            </form>        </li>        {{else}}        <li class=\\\"user-header\\\">            <img src=\\\"/static/images/1.jpg\\\" class=\\\"img-circle\\\" alt=\\\"User Image\\\">        </li>        {{/if}}        <!-- Menu Footer-->        <li class=\\\"user-footer\\\">            <div class=\\\"pull-left\\\">                <a href=\\\"javascript:void(0)\\\" class=\\\"btn btn-default btn-flat\\\">关闭</a>            </div>            {{if !isSignin}}            <div class=\\\"pull-right\\\">                <a href=\\\"javascript:void(0)\\\" id=\\\"user-submit\\\" class=\\\"btn btn-default btn-flat\\\">提交</a>            </div>            {{else}}            <div class=\\\"pull-right\\\">                <a href=\\\"javascript:void(0)\\\" id=\\\"user-signout\\\" class=\\\"btn btn-default btn-flat\\\">退出</a>            </div>            {{/if}}        </li>    </ul>\"\n\n//# sourceURL=webpack:///./src/scripts/views/userInfo.html?");

/***/ }),

/***/ "./src/scripts/views/usershow.html":
/*!*****************************************!*\
  !*** ./src/scripts/views/usershow.html ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = \"<div class=\\\"pull-left image\\\">    <img src=\\\"./static/images/1.jpg\\\" class=\\\"img-circle\\\" alt=\\\"User Image\\\">  </div>  <div class=\\\"pull-left info\\\">    {{if isSignin}}    <p>{{greeting}}</p>    <!-- Status -->    <a href=\\\"#\\\"><i class=\\\"fa fa-circle text-success\\\"></i> Online</a>    {{else}}    <p>未登录</p>    <!-- Status -->    <a href=\\\"#\\\"><i class=\\\"fa fa-circle text-success\\\"></i> off-line</a>    {{/if}}</div>\"\n\n//# sourceURL=webpack:///./src/scripts/views/usershow.html?");

/***/ })

/******/ });