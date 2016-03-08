package user

import (
	"github.com/astaxie/beego"
	"github.com/renxuetao/SportCollage/models"
)

type LoginControllers struct {
	beego.Controller
}

func (this *LoginControllers) Get() {
	this.TplName = "login_page.html"
}

func (this *LoginControllers) Post() {
	userName := this.Input().Get("user_login")
	password := this.Input().Get("user_pass")
	beego.Debug(userName)
	beego.Debug(password)
	num, err := models.QueryUserName(userName)
	beego.Debug("raw count %s", num)
	if err == nil && num > 0 {
		count, err := models.QueryPassword(password)
		if err == nil && count > 0 {

		}
	} else {
		beego.Debug("登录失败账号不存在")
	}
	this.TplName = "login_page.html"
}
