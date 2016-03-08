package models

import (
	"github.com/astaxie/beego"
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
	Comment_ID           int64 `orm:"pk";auto`
	Comment_post_ID      int64
	Comment_author       string
	Comment_author_email string
	Comment_author_url   string
	Comment_author_IP    string
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
	ID                    int64 `orm:"pk";auto`
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
	ID                  int64 `orm:"pk";auto`
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

// func QueryAritcleList() {
// 	o := orm.NewOrm()  // 创建一个 Ormer NewOrm 的同时会执行 orm.BootStrap (整个 app 只执行一次)，用以验证模型之间的定义并缓存。
// 	o.Using("default") // 默认使用 default，你可以指定为其他数据库
// 	var Commentmetas []*Commentmeta
// 	num, err := o.QueryTable("Commentmeta").All(&Commentmetas)
// 	fmt.Printf("Returned Rows Num: %s, %s", num, err)
// }

// var (
// 	sql string
// 	err error
// 	num int
// )

func QueryUserName(userName string) (int, error) {
	var users []*Users
	sql := "Select * from users where user_login = ?"
	o := orm.NewOrm()  // 创建一个 Ormer NewOrm 的同时会执行 orm.BootStrap (整个 app 只执行一次)，用以验证模型之间的定义并缓存。
	o.Using("default") // 默认使用 default，你可以指定为其他数据库
	err := o.Raw(sql, userName).QueryRow(&users)
	if err != nil {
		beego.Error(err)
		return 0, err
	}
	return len(users), nil
}

func QueryPassword(password string) (int, error) {
	var users []*Users
	sql := "Select * from users where user_pass = ?"
	o := orm.NewOrm()  // 创建一个 Ormer NewOrm 的同时会执行 orm.BootStrap (整个 app 只执行一次)，用以验证模型之间的定义并缓存。
	o.Using("default") // 默认使用 default，你可以指定为其他数据库
	err := o.Raw(sql, password).QueryRow(&users)
	if err != nil {
		beego.Error(err)
		return 0, err
	}
	return len(users), nil
}
