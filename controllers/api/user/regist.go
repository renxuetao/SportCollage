package user

import (
	"github.com/astaxie/beego"
)

type RegistControllers struct {
	beego.Controller
}

func (this *RegistControllers) Get() {
	this.TplName = "regist_page.html"
}

func (this *RegistControllers) Post() {
	this.TplName = "login_page.html"
}
