package user

import (
	"github.com/astaxie/beego"
)

type LoginControllers struct {
	beego.Controller
}

func (l *LoginControllers) Get() {
	beego.Debug("123")
}
