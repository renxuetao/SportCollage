package controllers

import (
	"github.com/astaxie/beego"
	"github.com/renxuetao/SportCollage/models"
)

type MainController struct {
	beego.Controller
}

func (c *MainController) Get() {
	//	c.Data["Website"] = "beego.me"
	//	c.Data["Email"] = "astaxie@gmail.com"
	//	c.TplName = "index.tpl"

	c.TplName = "home.html"
	// c.Ctx.WriteString("Hello World")
	models.QueryAritcleList()
	beego.Debug("123")
}
