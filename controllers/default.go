package controllers

import (
	"fmt"
	"github.com/astaxie/beego"
	"github.com/renxuetao/SportCollage/models"
	"strings"
)

type MainController struct {
	beego.Controller
}

func (c *MainController) Get() {
	userName := fmt.Sprintf("%v", c.GetSession("log"))
	password := fmt.Sprintf("f%v", c.GetSession("pwd"))
	rememberme := fmt.Sprintf("%v", c.GetSession("rem"))
	loginstate := fmt.Sprintf("%v", c.GetSession("loginstate"))
	beego.Debug("userName:", userName)
	beego.Debug("password:", password)
	beego.Debug("rememberme:", rememberme)
	beego.Debug("loginstate:", loginstate)
	if userName != "" && password != "" && rememberme != "" && loginstate != "" {
		if strings.EqualFold(rememberme, "1") {
			nickName, err := models.QueryUserNickName(userName, password)
			beego.Debug("query user nickname:", nickName)
			beego.Error(err)
			//判断是否查询到用户
			if err == nil && nickName != "" {
				c.Data["isLogin"] = true
				c.Data["userName"] = nickName
			} else {
				c.Data["isLogin"] = false
			}
		} else {
			if strings.EqualFold(loginstate, "yes") {
				nickName, err := models.QueryUserNickName(userName, password)
				beego.Debug("query user nickname:", nickName)
				beego.Error(err)
				c.Data["isLogin"] = true
				c.Data["userName"] = nickName
				c.DelSession("loginstate")
			}
		}
	} else {
		c.Data["isLogin"] = false
	}
	c.TplName = "SportCollage.html"
}
