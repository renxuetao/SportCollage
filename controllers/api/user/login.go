package user

import (
	"fmt"
	"github.com/astaxie/beego"
)

type LoginControllers struct {
	beego.Controller
}

func (this *LoginControllers) Get() {
	this.TplName = "home.html"
}

func (this *LoginControllers) Post() {
	beego.Debug(fmt.Sprint(this.Input()))
	this.TplName = "home.html"
}
