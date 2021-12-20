安装

```
npm install my_untils_commonly_use
```

方法

由value映射数组中label的值

```
filterValueToLabel(value, arr)
```

递归修改属性

```js
mapTreeData(
   arr = [],
   key = "id", // key值得映射
   title = "title", // 文本得映射
   value = "value" // 值得映射 
)
```

生成id

```
getUUid(str = '')
```

正则

```
phoneReg  // 手机号正则
emailReg  // 邮箱正则
blankReg  // 匹配空格
```

