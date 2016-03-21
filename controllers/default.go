package controllers

import (
	// "fmt"
	"github.com/astaxie/beego"
	"github.com/renxuetao/SportCollage/models"
	"github.com/renxuetao/SportCollage/utils"
	"strings"
)

type MainController struct {
	beego.Controller
}

func (c *MainController) Get() {
	// 这里是登出处理
	logout := c.Input().Get("logout")
	if strings.EqualFold(logout, "1") {
		userName := c.Ctx.Input.Cookie("log")
		password := c.Ctx.Input.Cookie("pwd")
		err := models.UpdateUserStatus(userName, password, 1)
		if err == nil {
			// beego.Debug("update user raw count", num)
			c.Ctx.SetCookie("rem", utils.GetIntToStr(0))
			c.Ctx.SetCookie("loginstate", "no")
		} else {
			beego.Error(err)
		}
		c.TplName = "SportCollage.html"
		return
	}
	// 这里是登录处理，登录后判断登录状态，或者第一次打开网站是后判断当前是否自动登录
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
			} else {
				c.Data["isLogin"] = false
			}
		}
	} else {
		c.Data["isLogin"] = false
	}
	c.TplName = "SportCollage.html"
}
