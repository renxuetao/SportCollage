package models

import (
	"fmt"
	"github.com/astaxie/beego/orm"
	//_ "github.com/go-sql-driver/mysql"
)

type Article struct {
	Id           int
	Tltle        string
	ArticleState int
	BrowseNum    int64
	PublishTime  string
	ClassifyID   int
	TabsID       int
	LableID      int
	UserID       int
	VoteID       int
	CommentID    int
}

type Classify struct {
	Id           int
	ClassifyName string
	EnglishName  string
	Postion      int64
	Parent       int64
	Brother      int64
	Data1        string
	Data2        string
	Data3        string
	Data4        string
	Data5        string
}

type Label struct {
	Id          int
	LabelName   string
	EnglishName string
	Postion     int64
	Parent      int64
	Brother     int64
	HotLevel    int64
}

type Message struct {
	Id          int
	Content     string
	Classify    string
	Position    int64
	parent      int64
	Brother     int64
	State       int
	CommentTime string
	UserID      int
	ArticleID   int
	Data1       string
	Data2       string
	Data3       string
	Data4       string
	Data5       string
}

type Tabs struct {
	Id           int
	ClassifyName string
	EnglishName  string
	Postion      int64
	Parent       int64
	Brother      int64
	Data1        string
	Data2        string
	Data3        string
	Data4        string
	Data5        string
}

type UserInfo struct {
	Id       int
	UserName string
	NickName string
	Email    string
	Telphone int
	Gender   int
	Age      int
	QQ       int
	Wechat   string
	Weibo    string
}

type User struct {
	Id         int
	UserName   string
	NickName   string
	Email      string
	Session    string
	LoginTime  string
	LogoutTime string
	ModifyTime string
}

type Vote struct {
	Id        int
	Position  string
	Parent    string
	Brother   int64
	VoteState int64
	VoteTime  int64
	UserID    string
	ArticleID string
	Data1     string
	Data2     string
	Data3     string
	Data4     string
	Data5     string
}

func init() {
	// 需要在init中注册定义的model
	orm.RegisterModel(new(Article), new(Classify), new(Label), new(Message), new(Tabs), new(UserInfo), new(User), new(Vote))
}

func QueryAritcleList() {
	o := orm.NewOrm()  // 创建一个 Ormer NewOrm 的同时会执行 orm.BootStrap (整个 app 只执行一次)，用以验证模型之间的定义并缓存。
	o.Using("default") // 默认使用 default，你可以指定为其他数据库
	var Articles []*Article
	num, err := o.QueryTable("article").All(&Articles)
	fmt.Printf("Returned Rows Num: %s, %s", num, err)
}
