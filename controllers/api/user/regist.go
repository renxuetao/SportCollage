package user

import (
	"fmt"
	"github.com/astaxie/beego"
)

type RegistControllers struct {
	beego.Controller
}

func (this *RegistControllers) Get() {
	this.TplName = "regist_page.html"
}

func (this *RegistControllers) Post() {
	beego.Debug(fmt.Sprint(this.Input()))
	this.TplName = "regist_page.html"
}
