package models

import (
	"github.com/astaxie/beego/orm"
	//_ "github.com/go-sql-driver/mysql"
)

type Commentmeta struct {
	Meta_id            int64 `orm:"pk";auto`
	Commentmeta_key_id int64
	Meta_key           string
	Meta_value         string
}

type Comments struct {
	Comment_id           int64 `orm:"pk";auto`
	Comment_post_id      int64
	Comment_author       string
	Comment_author_email string
	Comment_author_url   string
	Comment_author_ip    string
	Comment_date         uint64
	Comment_date_gmt     uint64
	Comment_content      string
	Comment_karma        int32
	Comment_approved     string
	Comment_agent        string
	Comment_type         string
	Comment_parent       int64
	User_id              int64
}

type Links struct {
	Link_id          int64 `orm:"pk";auto`
	Link_url         string
	Link_name        string
	Link_image       int64
	Link_target      int64
	Link_description int64
	Link_visible     int64
	Link_rating      int64
	Link_updated     int64
	Link_rel         int64
	Link_notes       int64
	Link_rss         int64
}

type Options struct {
	Option_id    int64 `orm:"pk";auto`
	Option_name  string
	Option_value string
	Autoload     string
}

type Postmeta struct {
	Meta_id    int64 `orm:"pk";auto`
	Post_id    int64
	Meta_key   string
	Meta_value string
}

type Posts struct {
	Id                    int64 `orm:"pk";auto`
	Post_author           int64
	Post_date             uint64
	Post_date_gmt         uint64
	Post_content          string
	Post_title            string
	Post_excerpt          string
	Post_status           string
	Comment_status        string
	Ping_status           string
	Post_password         string
	Post_name             string
	To_ping               string
	Pinged                string
	Post_modified         uint64
	Post_modified_gmt     uint64
	Post_content_filtered string
	Post_parent           int64
	Guid                  string
	Menu_order            int32
	Post_type             string
	Post_mime_type        string
	Comment_count         int64
}

type Term_relationships struct {
	Object_id        int64 `orm:"pk";auto`
	Term_taxonomy_id int64
	Term_order       int32
}

type Term_taxonomy struct {
	Term_taxonomy_id int64 `orm:"pk";auto`
	Term_id          int64
	Taxonomy         string
	Description      string
	Parent           int64
	Count            int64
}

type Termmeta struct {
	Meta_id    int64 `orm:"pk";auto`
	Term_id    int64
	Meta_key   string
	Meta_value string
}

type Terms struct {
	Term_id    int64 `orm:"pk";auto`
	Name       string
	Slug       string
	Term_group int64
}

type Usermeta struct {
	Umeta_id   int64 `orm:"pk";auto`
	User_id    int64
	Meta_key   string
	Meta_value string
}

type Users struct {
	Id                  int64 `orm:"pk";auto`
	User_login          string
	User_pass           string
	User_nicename       string
	User_email          string
	User_url            string
	User_registered     uint64
	User_activation_key string
	User_status         int32
	Display_name        string
}

func init() {
	// 需要在init中注册定义的model
	orm.RegisterModel(new(Commentmeta), new(Users), new(Usermeta), new(Terms), new(Termmeta), new(Term_taxonomy), new(Term_relationships), new(Posts), new(Postmeta), new(Options), new(Links), new(Comments))
}

func QueryUser(userName string, password string) (int64, error) {
	var users []*Users
	o := orm.NewOrm()  // 创建一个 Ormer NewOrm 的同时会执行 orm.BootStrap (整个 app 只执行一次)，用以验证模型之间的定义并缓存。
	o.Using("default") // 默认使用 default，你可以指定为其他数据库
	num, err := o.QueryTable("users").Filter("user_login", userName).Filter("user_pass", password).All(&users)
	if err != nil {
		return 0, err
	}
	return num, nil
}

func QueryUserNickName(userName string, password string) (string, error) {
	var users []*Users
	o := orm.NewOrm()  // 创建一个 Ormer NewOrm 的同时会执行 orm.BootStrap (整个 app 只执行一次)，用以验证模型之间的定义并缓存。
	o.Using("default") // 默认使用 default，你可以指定为其他数据库
	_, err := o.QueryTable("users").Filter("user_login", userName).Filter("user_pass", password).All(&users)
	if err != nil {
		return "", err
	}
	return users[0].User_nicename, nil
}

func UpdateUserStatus(userName string, password string, rememberme int) error {
	o := orm.NewOrm()  // 创建一个 Ormer NewOrm 的同时会执行 orm.BootStrap (整个 app 只执行一次)，用以验证模型之间的定义并缓存。
	o.Using("default") // 默认使用 default，你可以指定为其他数据库
	sSql := "update users set user_status = ? where user_login = ?"
	_, err := o.Raw(sSql, rememberme, userName).Exec()
	if err != nil {
		return err
	}
	return nil
}

func InsertUser(id int, user_login string, user_pass string, user_nicename string, user_email string, user_url string, user_registered int64, user_activation_key string, user_status int, display_name string) error {
	o := orm.NewOrm()  // 创建一个 Ormer NewOrm 的同时会执行 orm.BootStrap (整个 app 只执行一次)，用以验证模型之间的定义并缓存。
	o.Using("default") // 默认使用 default，你可以指定为其他数据库
	err := o.Begin()   //开启事务
	sql := " insert into users (id, user_login, user_pass,user_nicename,user_email,user_url,user_registered,user_activation_key,user_status,display_name) values(?,?,?,?,?,?,?,?,?,?) "
	_, err = o.Raw(sql, id, user_login, user_pass, user_nicename, user_email, user_url, user_registered, user_activation_key, user_status, display_name).Exec()
	if err != nil {
		o.Rollback()
		return err
	} else {
		o.Commit()
		return err
	}
}
