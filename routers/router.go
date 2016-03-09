package routers

import (
	"github.com/astaxie/beego"
	"github.com/renxuetao/SportCollage/controllers"
	"github.com/renxuetao/SportCollage/controllers/api/user"
)

func init() {
	beego.SetStaticPath("/fonts", "fonts")
	beego.Router("/", &controllers.MainController{})
	beego.Router("/api/user/login", &user.LoginControllers{})
	beego.Router("/api/user/regist", &user.RegistControllers{})
	beego.Router("/api/user/forget", &user.ForgetControllers{})
}
