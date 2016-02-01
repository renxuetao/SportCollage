package routers

import (
	"github.com/astaxie/beego"
	"github.com/renxuetao/SportCollage/controllers"
)

func init() {
	beego.Router("/", &controllers.MainController{})
}
