package user

import (
	"fmt"
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
	//err := models.InsertUser(1, "renxuetao", "123456", "renxuetao", "247304291@qq.com", "", 1457342131444, "", 0, "renxuetao")
	//beego.Error(err)
	beego.Debug(fmt.Print(this.Input()))
	userName := this.Input().Get("log")
	password := this.Input().Get("pwd")
	beego.Debug(userName)
	beego.Debug(password)
	//num, err := models.QueryOption()
	num, err := models.QueryUser(userName, password)
	beego.Debug("raw count", num)
	beego.Error(err)
	if err == nil && num > 0 {
		this.Redirect("/", 302)
	} else {
		this.Data["isUser"] = true
		this.TplName = "login_page.html"
	}

}
