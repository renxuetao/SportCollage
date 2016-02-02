package routers

import (
	"github.com/astaxie/beego"
	"github.com/renxuetao/SportCollage/controllers"
	"github.com/renxuetao/SportCollage/controllers/api/user"
)

func init() {
	beego.Router("/", &controllers.MainController{})
	beego.Router("/api/user/login", &user.LoginControllers{})
}
