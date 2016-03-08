package user

import (
	"fmt"
	"github.com/astaxie/beego"
)

type ForgetControllers struct {
	beego.Controller
}

func (this *ForgetControllers) Get() {
	this.TplName = "forget_page.html"
}

func (this *ForgetControllers) Post() {
	beego.Debug(fmt.Sprint(this.Input()))
}
