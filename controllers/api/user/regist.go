package user

import (
	"fmt"
	"github.com/astaxie/beego"
	"github.com/renxuetao/SportCollage/models"
	"github.com/renxuetao/SportCollage/utils"
	"strings"
)

type RegistControllers struct {
	beego.Controller
}

func (this *RegistControllers) Get() {
	this.TplName = "regist_page.html"
}

func (this *RegistControllers) Post() {
	beego.Debug(fmt.Sprintln(this.Input()))
	userName := this.Input().Get("user_login")
	userPassword := this.Input().Get("user_password")
	userEmail := this.Input().Get("user_email")
	if !strings.EqualFold(userName, "") && !strings.EqualFold(userPassword, "") && !strings.EqualFold(userEmail, "") {
		num, err := models.QueryUserName(userName)
		beego.Error(err)
		beego.Debug(num)
		//判断是否查询到用户
		if err == nil && num == 0 {
			num, err := models.QueryUserEmail(userEmail)
			beego.Error(err)
			beego.Debug(num)
			if err == nil && num == 0 {
				num, err := models.QueryAllUser()
				beego.Error(err)
				beego.Debug(num)
				err = models.InsertUser((num + 1), userName, utils.GetMD5Str(userPassword), userName, userEmail, "", 0, "", 0, "")
				beego.Error(err)
				if err != nil {
					this.Data["registState"] = true
					this.Data["registValue"] = "注册失败"
					this.TplName = "regist_page.html"
				} else {
					this.Redirect("/api/user/login", 302)
				}
			} else {
				this.Data["registState"] = true
				this.Data["registValue"] = "邮箱已经存在"
				this.TplName = "regist_page.html"
			}
		} else {
			this.Data["registState"] = true
			this.Data["registValue"] = "账号已经存在"
			this.TplName = "regist_page.html"
		}
	} else {
		this.Data["isLogin"] = true
		this.Data["registValue"] = "注册信息不能空着"
		this.TplName = "regist_page.html"
	}
}
