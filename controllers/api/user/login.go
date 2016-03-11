package user

import (
	"fmt"
	"github.com/astaxie/beego"
	"github.com/renxuetao/SportCollage/models"
	"strings"
)

type LoginControllers struct {
	beego.Controller
}

func (this *LoginControllers) Get() {
	this.TplName = "login_page.html"
}

func (this *LoginControllers) Post() {
	beego.Debug(fmt.Print(this.Input()))
	userName := this.Input().Get("log")
	password := this.Input().Get("pwd")
	rememberme := this.Input().Get("rememberme")
	beego.Debug(userName)
	beego.Debug(password)
	beego.Debug(rememberme)
	//判断是否选择了自动登录
	var status int
	if strings.EqualFold(rememberme, "forever") {
		status = 1
	} else {
		status = 0
	}
	num, err := models.QueryUser(userName, password, status)
	beego.Debug("query user raw count", num)
	beego.Error(err)
	//判断是否查询到用户
	if err == nil && num > 0 {
		//如果选择自动登录更新数据库登录状态
		err := models.UpdateUserStatus(userName, password, status)
		if err == nil {
			//beego.Debug("update user raw count", num)
		} else {
			beego.Error(err)
		}
		this.Redirect("/", 302)
	} else {
		this.Data["isUser"] = true
		this.TplName = "login_page.html"
	}

}
