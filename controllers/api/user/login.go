package user

import (
	"github.com/astaxie/beego"
	"github.com/renxuetao/SportCollage/models"
	"github.com/renxuetao/SportCollage/utils"
	"strings"
)

type LoginControllers struct {
	beego.Controller
}

func (this *LoginControllers) Get() {
	this.TplName = "login_page.html"
}

func (this *LoginControllers) Post() {
	userName := this.Input().Get("log")
	password := this.Input().Get("pwd")
	rememberme := this.Input().Get("rem")
	//判断是否选择了自动登录
	var status int
	if strings.EqualFold(rememberme, "forever") {
		status = 1
	} else {
		status = 0
	}
	num, err := models.QueryUser(userName, utils.GetMD5Str(password))
	beego.Error(err)
	//判断是否查询到用户
	if err == nil && num > 0 {
		//如果选择自动登录更新数据库登录状态
		err := models.UpdateUserStatus(userName, password, 1)
		if err == nil {
			beego.Debug("update user raw count", num)
		} else {
			beego.Error(err)
		}

		// this.SetSession("log", userName)
		// this.SetSession("pwd", utils.GetMD5Str(password))
		// this.SetSession("rem", utils.GetIntToStr(status))
		// this.SetSession("loginstate", "yes")

		this.Ctx.SetCookie("log", userName)
		this.Ctx.SetCookie("pwd", utils.GetMD5Str(password))
		this.Ctx.SetCookie("rem", utils.GetIntToStr(status))
		this.Ctx.SetCookie("loginstate", "yes")

		this.Redirect("/", 302)
	} else {
		this.Data["isUser"] = true
		this.TplName = "login_page.html"
	}
}
