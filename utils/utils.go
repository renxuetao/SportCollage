package utils

import (
	"crypto/md5"
	"encoding/hex"
	"fmt"
	"strconv"
	"time"
)

func GetMD5Str(context string) string {
	md5Ctx := md5.New()
	md5Ctx.Write([]byte(context))
	cipherStr := md5Ctx.Sum(nil)
	return hex.EncodeToString(cipherStr)
}

func GetIntToStr(context int) string {
	// 通过Itoa方法转换
	str1 := strconv.Itoa(context)
	// 通过Sprintf方法转换
	str1 = fmt.Sprintf("%d", context)
	return str1
}

func GetModifyTime() int64 {
	//时间戳
	t := time.Now().Unix()
	return t

	//时间戳到具体显示的转化
	// fmt.Println(time.Unix(t, 0).String())

	//带纳秒的时间戳
	// t = time.Now().UnixNano()
	// fmt.Println(t)
	// fmt.Println("------------------")

	//基本格式化的时间表示
	// fmt.Println(time.Now().String())
	// fmt.Println(time.Now().Format("2006year 01month 02day"))
}
