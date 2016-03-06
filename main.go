package main

import (
	"github.com/astaxie/beego"
	"github.com/astaxie/beego/orm"
	_ "github.com/go-sql-driver/mysql"
	_ "github.com/renxuetao/SportCollage/routers"
)

func init() {
	//For version 1.6
	//orm.DRMySQL
	//orm.DRSqlite
	//orm.DRPostgres

	// < 1.6
	//orm.DR_MySQL
	//orm.DR_Sqlite
	//orm.DR_Postgres

	// 参数1   driverName
	// 参数2   数据库类型
	// 这个用来设置 driverName 对应的数据库类型
	// mysql / sqlite3 / postgres 这三种是默认已经注册过的，所以可以无需设置
	orm.RegisterDriver("mysql", orm.DRMySQL)

	// 参数1        数据库的别名，用来在ORM中切换数据库使用
	// 参数2        driverName
	// 参数3        对应的链接字符串
	orm.RegisterDataBase("default", "mysql", "root:admin@/sport_collage?charset=utf8")

	// 参数4(可选)  设置最大空闲连接
	// 参数5(可选)  设置最大数据库连接 (go >= 1.2)
	//maxIdle := 30
	//maxConn := 30
	//orm.RegisterDataBase("default", "mysql", "root:root@/orm_test?charset=utf8", maxIdle, maxConn)
	orm.RunSyncdb("default", false, false)
}

func main() {
	// beego.SetStaticPath("/static", "public")
	// beego.SetStaticPath("/img", "img")
	// beego.SetStaticPath("/css", "css")
	// beego.SetStaticPath("/js", "js")
	beego.Run()
}
