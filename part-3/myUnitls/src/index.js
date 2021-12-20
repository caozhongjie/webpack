// 将值映射成文字
export const filterValueToLabel = (val = '', filterArr = []) => {
    const data = filterArr.filter((item) => {
      return item.value === val;
    });
    if (data && data.length > 0) {
      return data[0].label;
    }
    return '-';
};

// 递归修改属性名，以满足开发需求
export const mapTreeData = (
  arr = [],
  key = "id", // key值得映射
  title = "title", // 文本得映射
  value = "value" // 值得映射
) => {
  if (!Array.isArray(arr)) {
    return null;
  }
  return arr.map((item, index) => {
    return {
      ...item,
      key: item[key],
      title: item[title],
      value: item[value],
      children: item.children
        ? mapTreeData(item.children, key, title, value)
        : [],
    };
  });
};

  // 手机号正则
  export const phoneReg = /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/;

  // 邮箱正则
  export const emailReg = /^([a-zA-Z0-9]+[_|_|\-|.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|_|.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;

  // 密码验证 ： 包含 大写 +小写+ 数字   范围为6-15
  export const passwardReg = /^(?=.*[0-9].*)(?=.*[A-Z].*)(?=.*[a-z].*).{6,15}$/

  // 匹配空格
  export const blankReg = /\s+/

  // 前端生成id值
  export const getUUid = (tabName = '') => {
    const str = [];
    const Chars = '0123456789abcdefghijklmnopqrstuvwxyz';
    for (let i = 0; i < 36; i += 1) {
      str[i] = Chars.substr(Math.floor(Math.random() * 16), 1);
    }
    return tabName + str.join('');
  };