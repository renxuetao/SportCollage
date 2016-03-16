package controllers

import (
	// "fmt"
	"github.com/astaxie/beego"
	"github.com/renxuetao/SportCollage/models"
	"strings"
)

type MainController struct {
	beego.Controller
}

func (c *MainController) Get() {
	// userName := fmt.Sprintf("%v", c.GetSession("log"))
	// password := fmt.Sprintf("f%v", c.GetSession("pwd"))
	// rememberme := fmt.Sprintf("%v", c.GetSession("rem"))
	// loginstate := fmt.Sprintf("%v", c.GetSession("loginstate"))

	userName := c.Ctx.Input.Cookie("log")
	password := c.Ctx.Input.Cookie("pwd")
	rememberme := c.Ctx.Input.Cookie("rem")
	loginstate := c.Ctx.Input.Cookie("loginstate")

	if !strings.EqualFold(userName, "") && !strings.EqualFold(password, "") && !strings.EqualFold(rememberme, "") && !strings.EqualFold(loginstate, "") {
		if strings.EqualFold(rememberme, "1") {
			nickName, err := models.QueryUserNickName(userName, password)
			beego.Error(err)
			//判断是否查询到用户
			if err == nil {
				c.Data["isLogin"] = true
				if !strings.EqualFold(nickName, "") {
					c.Data["nickName"] = nickName
				} else {
					c.Data["nickName"] = userName
				}
			} else {
				c.Data["isLogin"] = false
			}
		} else {
			if strings.EqualFold(loginstate, "yes") {
				nickName, err := models.QueryUserNickName(userName, password)
				beego.Error(err)
				c.Data["isLogin"] = true
				c.Data["nickName"] = nickName
				//c.Ctx.SetCookie("loginstate", "no")
			}
		}
	} else {
		c.Data["isLogin"] = false
	}
	c.TplName = "SportCollage.html"
}
