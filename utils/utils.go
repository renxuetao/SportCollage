package utils

import (
	"crypto/md5"
	"encoding/hex"
	"fmt"
	"strconv"
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
