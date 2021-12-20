# webpack基础

webpack基础参数说明

```js
module.exports = {
    entry: './src/index.js', // 入口
    output: { // 出口
        filename: 'bundle.js',
        path: path.resolve(__dirname, './dist'), // 设置绝对路径
        clean: true, // 自动清除上次打包出来的文件
        // assetModuleFilename: 'images/test.jpg', // 定义静态资源打包的文件路径和文件名
        assetModuleFilename: 'images/[contenthash][ext]', // 根据文件内容自动生成一个hash扩展值文件名
    },
    mode: 'development', // 设置成开发环境
    devtool: 'inline-source-map', // 用于设置精准定位错误位置 并且会格式化打包生成的Js文件
    plugins: [
        new HtmlWebpackPlugin({
            template: './index.html', // 指定模板
            filename: 'app.html', // 打包出来的静态文件的名字
            inject: 'body' // 把文件打包到body里面
        })
    ],
    devServer: {
        static: './dist'
    },
    // 定义模块资源
    module: {
        // type用于定义转换类型
        rules: [
            // 将.jpg文件转换成链接形式
            {
                test: /\.jpg$/,
                type: 'asset/resource',
                generator: {
                    // filename: 'images/text.jpg' // 这个优先级比assetModuleFilename更高
                    filename: 'images/[contenthash][ext]' // 这个优先级比assetModuleFilename更高
                }
            },
            {
                test: /\.svg$/,
                type: 'asset/inline', // 将svg格式装换成base64的文件格式，并且不会在dist打包文件中生成
            },
            {
                test: /\.txt$/,
                type: 'asset/source' // 可以导出文件源代码
            },
            {
                test: /\.png/,
                type: 'asset' // 设置通用文件资源类型。默认大小是8k,超出这个文件就会生不会生成base64文件，否则就会打包到dist文件中。这个默认大小可以修改，通过parser下面的MaxSize
            }
        ]
    }
}
```



## 安装

npm install webpack webpack-cli (用于命令行控制webpack)

基本包安装

npm install webpack webpack-cli webpack-dev-server html-webpack-plugin -D

## 基本安装步骤

### 1、npm init -y 

### 2、npm install webpack webpack-cli --save-dev

### 3、修改文件

此时还不能使用webpack，会报错

解决方案： 1、全局安装webpack

​					2、使用npx webpack 

​					3、找到node_modules/bin/webpacl.cmd文件，复制该文件到该项目根路径下，修改里面的内容

​					

```cmd
@ECHO off
SETLOCAL
CALL :find_dp0

IF EXIST "%dp0%\node.exe" (
  SET "_prog=%dp0%\node.exe"
) ELSE (
  SET "_prog=node"
  SET PATHEXT=%PATHEXT:;.JS;=;%
)
"%_prog%"  "%dp0%\..\webpack\bin\webpack.js" %* // -------- 原先的   
"%_prog%"  "%dp0%\node_modules\webpack\bin\webpack.js" %* // -------- 修改之后的
ENDLOCAL
EXIT /b %errorlevel%
:find_dp0
SET dp0=%~dp0
EXIT /b

```

## webpack相关命令

```
《----------npx作用是自己去找相关可以执行命令的文件 ------》
npx webpack -------打包
npx webpack -stats detailed  ----- 查看打包相关信息
npx webpack --help
npx webpack --entry ./src/index.js --mode production ------设置入口和模式
npx webpack --watch  -------监听文件的变化  自动重新打包编译


```

## 将配置文件显示出来

在根目录下创建一个文件 webpack.config.js

```js
const path =  require('path')
module.exports = {
    entry: './src/index.js', // 入口
    output: { // 出口
        filename: 'bundle.js',
        path: path.resolve(__dirname, './dist') // 设置绝对路径
    },
    mode: 'none'
}
```

## 热更新 

！！！本质不是重新打包编译，而是把编译的放到了内存里

安装   npm install webpack-dev-server --save-dev

使用：

```js
npx webpack serve
```

## loader文件解析

webpack默认的只能解析js 和json这样的文件,其他文件的解析都要配置使用相应的loader，在用use设置解析的loader时，**它是从右向左解析的**。

### 配置css-loader 解析文件中的css

安装`css-loader`(用于解析css文件)  `style-loader`(将解析后的css文件添加到样式中)

```bash
npm install css-loader style-loader
```

使用，通过use使用对应的loader来进行解析   **从右向左解析**

```js
    // 定义模块资源
    module: {
        // type用于定义转换类型
        rules: [
             ...
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'] //从右向左解析的，先把css文件解析出来，然后用style-loader加载
            }
        ]
    }
```

### 加载less 

安装

```
npm install less less-loader
```

使用

```js
    module: {
        // type用于定义转换类型
        rules: [
            ...,
            {
                test: /\.(css|less)$/, // 正则匹配css/less文件
                use: ['style-loader', 'css-loader', 'less-loader'] // 从右向左接卸
            }
        ]
    }
```



## 抽离和压缩css

### 抽离

将css less文件抽离成单独文件然后引入

安装

```bash
 npm install mini-css-extract-plugin  // 只支持webpack5
```

使用：引入该插件，然后在plugin中实例化，使用里面带的loader 

效果： 会把css和less文件解析后存放在一个单独文件中然后进行引入

```js
const MinCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
	...
    plugins: [
        ...
        new MinCssExtractPlugin({
         // 定义文件路径和文件名 ----》 生成styles文件夹，里面内容是hash随机生成，不写的话默认根目录下main.css
            filename: 'styles/[contenthash].css'
        })
    ],
    devServer: {
        static: './dist'
    },
    // 定义模块资源
    module: {
        // type用于定义转换类型
        rules: [
           ...
            {
                test: /\.(css|less)$/,
                use: [MinCssExtractPlugin.loader, 'css-loader', 'less-loader']
            }
        ]
    }
}

```

### 压缩

安装

```bash
npm install css-minimizer-webpack-plugin
```

使用

```js
...
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')

module.exports = {
    ...
    mode: 'production', // 需设置成开发环境
	...
    // 通过以下配置进行压缩
    optimization: {
        minimizer: [
            new CssMinimizerPlugin()
        ]
    }
}
```

## csv、tsv、xml数据加载

安装

```bash
npm install csv-loader  // 解析csv，tsv文件
npm install xml-loader // 解析 xml文件
```

使用

```js
    module: {
        // type用于定义转换类型
        rules: [
          	...
            {
                test: /\.(csv|tsv)$/,
                use: "csv-loader"
            },
            {
                test: /\.xml$/,
                use: "xml-loader"
            }
        ]
    },
```

## babel的使用

### 将es6代码转化为es5，兼容不同浏览器

安装

```bash
babel-loader: 在webpack里应用babel解析es6的桥梁
@babel/core:  babe核心模块
@babel/preset-env: babel预设，一组babel插件的集合

npm install babel-loader @babel/core @babel/preset-env
```

用法

```js
    module: {
        // type用于定义转换类型
        rules: [
           	...
            {
                test: /\.js$/,
                exclude: /node_modules/, // node_modules中的文件夹不参与转换
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            }
        ]
    },
```



代码中如果使用了 async await 会报错

```js
regeneratorRuntime is not defined
```

### regeneratorRuntime

是webpack打包生成的全局辅助函数，由babel生成，用于兼容async/await语法

安装

```bash
npm install @babel/runtime @babel/plugin-transform-runtime
```

用法

```
  module: {
        rules: [
    		...
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                        plugins: [
                            [
                                '@babel/plugin-transform-runtime'
                            ]
                        ]
                    }
                }
            }
        ]
    },
```

## 当打包文件过大时会报错

```bash
entrypoint size limit: The following entrypoint(s) combined asset size exceeds the recommended limit (244 KiB). This can impact web performance.
```

解决方案：

```js
module.export = {
	...
	performance: {
    	maxEntrypointSize: 4000000,
    	maxAssetSize: 30000000
    }
}
```

maxEntrypointSize： 根据入口起点的最大体积，控制 webpack 何时生成性能提示

maxAssetSize： 此选项根据单个资源体积(单位: bytes)，控制 webpack 何时生成性能提示。

## 代码分离

有三种方式

### 1、入口起点： 使用entry配置手动地分离代码 （如果配置多个入口，相同文件会参与重复打包）

定义多个入口，但是如果多个入口文件都引入了相同的文件，那么该文件会参与重复打包

```js
module.exports = {
    entry: {
        index: './src/index.js', // 入口1
        another: './src/another-modules.js' // 入口2
    }, 
    output: { // 出口
        filename: '[name].bundle.js', //根据不同的入口生成不同的文件名
		...
        
    }, 
}
    
//  最终会打包生成    index.bundle.js + another.bundle.js
```

### 2、防止重复打包： 使用Entry dependencies 或者SplitChunksPlugin去重和分离代码

#### 2-1 Entry dependencies 

```js
module.exports = {
    entry: {
        index: {
            import: './src/index.js',
            dependOn: 'sharedLo' // 从sharedLo这里加载文件，该名字和下面的要同名（自定义名称）
        },
        another: {
            import: './src/another-modules.js',
            dependOn: 'sharedLo' // 从sharedLo这里加载文件（同上）
        },
        sharedLo: 'lodash' // 定义sharedLo抽离的文件chunk名字，用于上面的dependOn名称
    }
}
```

#### SplitChunks实现模块抽离

```js
module.exports = {
    entry: {
        index: './src/index.js',
        another: './src/another-modules.js'
    },
    ...
    optimization: {
        ...
        splitChunks: {
            chunks: 'all'
        }
    },
}
```



### 3、动态导入  通过模块的内联函数调用来分离代码

定义引入第三方包的js文件，然后引入该文件，配合上面的入口，将动态和静态资源分别打包引入

```js
function getComponent() {
    // 引入
    return import('lodash')
        .then(({ default: _ }) => {
            const element = document.createElement('div')
            element.innerHTML = _.join(['hello', 'webpack'], ' ')

            return element
        })
}

getComponent().then(element => {
    document.body.appendChild(element)
})
```

#### 动态导入应用

##### 1、懒加载

节约网络流量，减少请求，加快初次渲染的速度  ----**使用方式基于上面的动态引入**

示例自定义一个js文件，点击执行之后再加载

定义了一个math.js的文件，导出两个方法

```js
export const add = (x, y) => {
    return x + y
}

export const minus = (x, y) => {
    return x- y
}
```

点击按钮之后再引入，未点击之前不会加载该资源

`webpackChunkName: 'math' ` 是用于定义打包出来的文件名，也可以不写用默认的

```js
const button = document.createElement('button')
button.textContent = '点击执行加载文件'
button.addEventListener('click', () => {
    import(/* webpackChunkName: 'math' */'./math.js').then(({add, minus}) => {
        console.log(add(4,5))
    })
})
document.body.appendChild(button)
```

##### 2、预获取/预加载模块

###### 预获取（网络空闲时会加载该资源）// 性能更好，会在头部

 使用魔法注释  加上`webpackPrefetch: true`

```js
button.addEventListener('click', () => {
    import(/* webpackChunkName: 'math', webpackPrefetch: true */'./math.js').then(({add, minus}) => {
        console.log(add(4,5))
    })
})
document.body.appendChild(button)
```

会自动在head中引入以下

```css
<link rel="prefetch" as="script" href="http://localhost:8081/math.bundle.js">
```

###### 预加载（和懒加载效果类似）

 使用魔法注释  加上`webpackPreload: true`

```js
button.addEventListener('click', () => {
    import(/* webpackChunkName: 'math', webpackPreload: true */'./math.js').then(({add, minus}) => {
        console.log(add(4,5))
    })
})
document.body.appendChild(button)
```

## 缓存

为了防止文件更新，但是文件名没有发生变化的情况，此时浏览器就会读取本地缓存的文件，导致发生错误。

所以使用hash来命名输出文件

```js
module.exports = {
	output: { // 出口
        filename: '[name].[contenthash].js',       // 生成hash文件名，文件内容不变，打包出来的文件名不会发生变化,浏览器就会调用该缓存文件
    },
}
```

### 缓存第三方库

将第三方库(如lodash)提取到单独的vendor chunk文件中。因为他们很少像本地源代码一样频繁修改，所以利用client的长效缓存机制，命中缓存来消除请求，并减少向server获取资源，同时保障client代码和server代码版本一样，我们在optimization.splitChunks添加如下cacheGroup参数并构建

！！！打包出来的文件名不能发生变化，否则会重新请求

```js
module.exports = {
	...
	optimization: {
        ...
        splitChunks: {
            cacheGroups: {
                vendor: {
                    // 将该匹配的文件（第三方库）全部打包到vendors文件中，只要改文件名没有发生变化，就不会重新请求
                    test: /[\\/]node_modules[\\/]/, 
                    name: 'vendors',
                    chunks: 'all'
                }
            }
        }
    },

}
```

## 将所有的js打包到一个文件夹里面

```js
module.exports = {
    output: { // 出口
        filename: 'script/[name].[contenthash].js', // 全部打包到script中
    },
}
```

## 拆分开发环境和生产环境配置

### 定义公共域名/cdn域名

```js
module.exports = {
  output: {
  		...
        publicPath: 'http://localhost:8081/'
    },
}

```

打包之后html文件引入的文件就变成http://localhost:8081

```html
<!doctype html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width,initial-scale=1">
    <title>Document</title>
    <link href="http://localhost:8081/styles/2125e8b98edb6a3c5f17.css" rel="stylesheet">
</head>

<body>
    <script defer="defer" src="http://localhost:8081/script/vendors.27878cfbf98dddd4c44b.js"></script>
    <script defer="defer" src="http://localhost:8081/script/index.a291f4666a680e49dc91.js"></script>
    <script defer="defer" src="http://localhost:8081/script/another.60d845548c50ad6eb7f3.js"></script>
</body>

</html>
<script src="./dist/bundle.js"></script>
```

### 环境变量

#### 设置环境变量的方式

每一个 --env后面可以设置环境变量。也可以设置自定义键值对

```bash
npx webpack --env production --env goal=local
```

#### 获取设置的变量值

将module设置成函数的形式，可以获取到设置的变量

```js
module.exports = (env) => {
    console.log('------', env)
    return {
        ...
        mode: env.production ? 'production' : 'development'
    }
}
```

### 压缩js

如果手动设置了压缩css，此时js就不会自动压缩了

```js
optimization: {
     minimizer: [
         new CssMinimizerPlugin()
     ],
},
```

安装：

```bash
npm install terser-webpack-plugin
```

使用

```js
module.exports = {
	...
	 optimization: {
       minimizer: [
          new CssMinimizerPlugin(), // 压缩css
          new TerserPlugin() // 压缩js
       ],
    },
}
```

### 将不同环境变量的配置进行拆分

在根目录下定义config文件夹，里面包含生成环境和开发环境配置

开发环境配置 `config/webpack.config.dev.js`

// 删除了上面的压缩  写死了mode  修改了打包出来的文件路径  不需要对文件名进行hash处理，不读取缓存

```js
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MinCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
    entry: {
        index: './src/index.js',
        another: './src/another-modules.js'
    },
    output: { // 出口
        filename: 'script/[name].js', // 不需要hash命名文件，不适用缓存
        path: path.resolve(__dirname, '../dist'), // 修改打包文件路径
      	...
    },
    mode: 'development', // 设置成开发环境
    devServer: {
        static: './dist'
    },
    optimization: {
        ...
        // 删除了文件压缩
        splitChunks: {
            cacheGroups: {
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendors',
                    chunks: 'all'
                }
            }
        }
    },
}
```

生产环境配置 `config/webpack.config.propd.js`

// 不需要devserver  修改了打包出来的文件路径

```js
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MinCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')

module.exports = {
    entry: {
        index: './src/index.js',
        another: './src/another-modules.js'
    },
    output: { // 出口
        filename: 'script/[name].[contenthash].js',
        path: path.resolve(__dirname, '../dist'), // !!!!! 修改打包路径
     	...
    },
    mode: 'production', // 设置成开发环境
    devtool: 'inline-source-map', // 用于设置精准定位错误位置 并且会格式化打包生成的Js文件
    ....
    // 开启本地服务关闭
    // devServer: {
    //     static: './dist'
    // },
    // 定义模块资源
}

```

执行不同命令打包不同的文件，这样就可以根据打包生产还是开发环境来使用不同配置文件

使用上面开发环境配置进行打包 （生产环境同理）

```bash
npx webpack -c ./config/webpack.config.dev.js 
```

用开发环境配置启动本地项目命令

```bash
npx webpack serve -c ./config/webpack.config.dev.js
```

#### 通过脚本执行相关命令

在package.json中定义脚本指令

```json
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    // ！！！webpack server 是会存放在内存里，不会生成打包文件
    "start": "webpack serve -c ./config/webpack.config.dev.js",
    // ！！！webpack  才会生成打包文件
    "build": "webpack -c ./config/webpack.config.prod.js"
  }
```

#### 提取公共配置

将开发环境和生成环境公共配置存放在config/webpack.cnfig.common.js文件中

```js
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MinCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')

module.exports = {
    entry: {
        index: './src/index.js',
        another: './src/another-modules.js'
    },
    output: { // 出口

        path: path.resolve(__dirname, './dist'), // 设置绝对路径
        clean: true, // 自动清除上次打包出来的文件
        // assetModuleFilename: 'images/test.jpg', // 定义静态资源打包的文件路径和文件名
        assetModuleFilename: 'images/[contenthash][ext]', // 根据文件内容自动生成一个hash扩展值文件名
    },

    plugins: [
        new HtmlWebpackPlugin({
            template: './index.html', // 指定模板
            filename: 'app.html', // 打包出来的静态文件的名字
            inject: 'body' // 把文件打包到body里面
        }),
        new MinCssExtractPlugin({
            filename: 'styles/[contenthash].css'
        })
    ],

    // 定义模块资源
    module: {
        // type用于定义转换类型
        rules: [
            // 将.jpg文件转换成链接形式
            {
                test: /\.jpg$/,
                type: 'asset/resource', // 可以生成一个单独的资源，他是一个文件路径
                generator: {
                    // filename: 'images/text.jpg' // 这个优先级比assetModuleFilename更高
                    filename: 'images/[contenthash][ext]' // 这个优先级比assetModuleFilename更高
                }
            },
            {
                test: /\.svg$/,
                type: 'asset/inline', // 将svg格式装换成base64的文件格式，并且不会在dist打包文件中生成
            },
            {
                test: /\.txt$/,
                type: 'asset/source' // 导出资源的源代码
            },
            // {
            //     type: 'asset' // 通用资源类型，在resource和inline之间自动选择，选择依据是资源的大小， 默认的是8Kb
            // }
            {
                test: /\.(css|less)$/,
                use: [MinCssExtractPlugin.loader, 'css-loader', 'less-loader']
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                        plugins: [
                            [
                                '@babel/plugin-transform-runtime'
                            ]
                        ]
                    }
                }
            }
        ]
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendors',
                    chunks: 'all'
                }
            }
        }
    },
    performance: {
        maxEntrypointSize: 10000000,
        maxAssetSize: 300000000
    }
}

```

把生产环境和开发环境相同的配置删除

开发

```js
module.exports = {
    output: { // 出口
        filename: 'script/[name].js',
    },
    mode: 'development', // 设置成开发环境
    devtool: 'inline-source-map', // 用于设置精准定位错误位置 并且会格式化打包生成的Js文件
    devServer: {
        static: './dist'
    },
}
```

生产

```js
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')

module.exports = {
    output: { // 出口
        filename: 'script/[name].[contenthash].js',
        publicPath: 'http://localhost:8081/'
    },
    mode: 'production', // 设置成开发环境

    optimization: {
        minimizer: [
            new CssMinimizerPlugin(),
            new TerserPlugin()
        ],
    },
}

```

#### 合并配置

安装：

```bash
 npm install webpack-merge
```

使用： config/webpack.config.js

```js
// 使用该merge合并，后面的内容覆盖前面的，可以查看该包的示例说明
const { merge } = require('webpack-merge') 

const commonConfig = require('./webpack.config.common')

const productionConfig = require('./webpack.config.prod')
const developmentConfig = require('./webpack.config.dev')

module.exports = (env) => {
    if (env.production) {
        return merge(commonConfig, productionConfig)
    }
    if (env.development) {
        return merge(commonConfig, developmentConfig)
    }
    return new Error('no match configuration was found')
}
```

修改package.json

```json
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "webpack serve -c ./config/webpack.config.js --env development",
    "build": "webpack serve -c ./config/webpack.config.js --env production"
  },
```

# webpack高级应用

## 提高开发效率和完善团队开发规范

### source-map

用于快速定位代码, 有以下7种属性值

#### eval

开发环境下默认值,可以锁定代码行数

每个module会分装到eval里包裹起来执行，并且会在末尾追加注释//@sourceURL

#### source-map

生成一个sourecMap文件，会在末尾追加一个注释，可以锁定代码行数

```js
//# sourceMappingURL=main.js.map
```

#### hidden-source-map

和source-map一样，但是不会在末尾追加注释，无法锁定代码行数

#### inline-source-map

生成一个DataUrl形式的sourceMap文件，可以锁定代码行数

会在末尾生成一个注释

```js
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBLGtCIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vMDEtc291cmNlLW1hcC8uL2FwcC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJjb25zb2xlLmxvZygnaGVsbG8gd2VicGFjaycpXHJcblxyXG5cclxuY29uc29sZS5sb2coJ+esrOS6jOihjCcpIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9
```

#### eval-source-map

每个module会通过eval()来执行，并且生成一个DataUrl形式的sourceMap,可以锁定代码行数

```js
//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9hcHAuanMuanMiLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8wMS1zb3VyY2UtbWFwLy4vYXBwLmpzPzlhNzgiXSwic291cmNlc0NvbnRlbnQiOlsiY29uc29sZS5sb2coJ2hlbGxvIHdlYnBhY2snKVxyXG5cclxuXHJcbmNvbnNvbGUubG9nKCfnrKzkuozooYwnKSJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./app.js\n");
```

#### cheap-source-map

会生成一个没有列信息的sourceMaps文件，不包含loader的sourcemap(比如：不包含babel的sourcemap,如ES6代码经过babel转换后无法定位锁定)

可以锁定代码行数

#### cheap-module-source-map

生成一个没有列信息的sourcemaps文件，同时loader的sourcemap也被简化为只包含对应行的。

（可以定位到经过转化之后的代码行数）

可以锁定代码行数

#### 注意点

生产环境一般不开启sourcemap功能，主要原因

1、通过bundle和sourcemap文件，可以反编译出源码 ---- 也就是说线上产物有sourcemap文件的话，就意味着有暴露源码的风险

2、sourcemap文件的体积相对比较巨大，这跟我们生产环境的追求不同，生产环境追求更小更轻量的bundle

### devServer

开发环境下，我们往往需求启动一个web服务，为了方便模拟一个用户从浏览器访问我们的web服务，读取我们的打包产物，以观测我们的代码在客户端的表现，webpakc内置了这样的功能。

安装

```
npm install webpack-dev-server
```

```js
module.exports = {
    entry:'./app.js',
    mode: 'development',
    output: {
        publicPath: '/'
    },
    devServer: {
        static: path.resolve(__dirname, './dist'), // 设置静态资源路径
        // 该属性用于配置是否在服务器端进行代码压缩,服务器在代码传输到浏览器中数据是压缩了的。提升传输效率
        compress: true,  
        port: 3000, // 设置端口
        headers: { // 设置响应头信息
           'X-Access-Token': 'abc123'
        },
        host: '0.0.0.0', // 配置主机
        proxy: { // 配置代理
            '/api': 'http://localhost:9000'
        },
        // https: true // 设置成https
        http2: true, // 设置成http2
        historyApiFallback: true
    },
    plugins: [
        new HtmlWebpackPlugin()
    ],
}
```

开启了compress之后，会在响应头中出现该设置

```json
response header:  Content-Encoding: gzip
```

#### 开启代理

如果我们本地有一个ajax请求，但是端口是不一样的

根目录下新建文件 server.js  开启本地服务并监听端口

```js
const http = require('http')

const app = http.createServer((req, res) => {
    if(req.url === '/api/hello') {
        res.end('hello node')
    }
})

app.listen(9000, 'localhost', () => {
    console.log('localhost: 9000')
})
```

在项目js文件中请求

```js
fetch('/api/hello')
    .then(response => response.text())
    .then(result => {
        console.log(result)
    })
```

此时会提示404或者跨域问题。可以通过配置代理的方式解决

```js
module.exports = {
    ...
    devServer: {
       ...
        proxy: {
            '/api': 'http://localhost:9000'
        },

    },

}
```



#### 配置https

想让我们的http变成https，使用配置

注意： 此时使用http是无法访问我们的服务器的，需要改成Https，由于默认配置使用的是自签名证书，所有有的浏览器会告诉你不安全。但依然可以访问。同时也可以使用我们自己的证书

```js
module.exports = {    
    devServer: {
        ...
        https: true
    },
   
}
```

也可以使用http2，这个是本身自带签名证书的

```js
module.exports = {    
    devServer: {
        ...
        http2: true
    },
   
}
```

#### historyApiFallback

如果我们的应用是个SPA单应用，当路由到/some时（可以直接到地址栏里输入），会发现此时刷新页面后控制台会报错。

比如页面访问了https://localhost:3000/home，但是你并没有配置该路由，此时就会报错，通过historyApiFallback可以继续访问自己的根路径

```js
module.exports = {
	...
    devServer: {
  		...
        historyApiFallback: true
    },
    
}
```

#### 开发服务器主机

如果你在开发环境中起了devserver服务，并期望你的同事访问它，只需要配置

```js
module.exports = {
    ...
    devServer: {
        ...
        host: '0.0.0.0',
    },
}
```

#### 模块热替换和热加载

```js
module.exports = {
    ...
    devServer: {
        hot: true, // 热替换
        liveReload: true // 热加载
    },
}
```

css-loader会实现模块热替换配置，js要单独处理

如想要app.js修改之后页面直接改变，则需要 module.hot.accept('./app.js')

```js
if(module.hot) {
    module.hot.accept('./app.js')
}
```

### Eslint

安装

```bash
npm install eslint
```

```
npx eslint --init    
```

webpack中配置eslint   https://webpack.docschina.org/plugins/eslint-webpack-plugin/

```
npm install eslint-webpack-plugin
```

用法

```js
const ESLintPlugin = require('eslint-webpack-plugin');

module.exports = {
  // ...
  plugins: [new ESLintPlugin(options)],
  // ...
};
```

代码中如果有eslint问题未处理，此页面会报错，可以通过devServer配置来处理

```js
module.exports = {
  ...
  devServer: {
    client: {
      overlay: false,  // 设置成false，eslint就只会在控制台报错，不会影响页面
    },
  },
  plugins: [
    ...
    new ESLintPlugin(),
  ],
};

```

### git-hooks和husky

在代码提交前检查代码eslint规则

https://www.bilibili.com/video/BV1YU4y1g745?p=62&spm_id_from=pageDriver 视频教程

https://www.npmjs.com/package/husky  官方文档链接

### 模块与依赖

[js, css,less,img,html等文件] -------》 loader + module --------》模块化文件

解析时是通过enhanced-resolve这个包来完成的

#### 模块解析

可以解析  绝对路径  相对路径  第三方包(模块路径)

设置路径别名  文件名不写

```js
const path = require('path')
module.exports = {
    ...
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
        },
        // 如果引入的时候文件名可以不写，先匹配json, 然后是js, vue
        extensions: ['.json', 'js', '.vue'] 
    }
}
```

#### 外部扩展

当使用第三方包的时候，希望该不参与打包（不用npm install方式导入），可以使用外部扩展的方式

以jquery为例

```js
module.exports = {
    externalsType: 'script', // 配置以script标签包裹
    externals: {
         // 参数说明： jquery的cdn链接  暴露出去的名称
        jquery: [
            'https://cdn.staticfile.org/jquery/1.10.2/jquery.min.js',
            '$' 
        ]
    }
}
```

经过这种cdn引入的方式，那么就可以不参与打包，也可以定义一个html模板文件，然后在该文件中引入

```html
<script src="https://cdn.staticfile.org/jquery/1.10.2/jquery.min.js"></script>
```

#### 依赖图

分析各个模块之前的引用关系

安装

```bash
npm install webpack-bundle-analyzer
```

使用

```js
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')

module.exports = {
	...
    plugins: [
        ...
        new BundleAnalyzerPlugin()
    ],
    ...
}
```

用服务器打开在页面中访问即可

```bash
npx webpack serve
```

#### 扩展功能

##### postCss

是一个用javascript工具和插件转换css代码的工具，比如可以用autoprefixer插件自动获取浏览器的流行度和能够支持的属性，并根据这些数据帮我们自动的为css规则添加前缀，将最新的css语法转换成大多数浏览器都能够理解的语法

即自动的帮我们处理css兼容性问题

安装  style-loader css-loader安装过了得话就不用安了

```bash
npm install style-loader css-loader postcss-loader autoprefixer
```

增加webpack解析配置

```js
module.exports = {
    ...
    module: {
       ...
        rules: [
      		...
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader', 'postcss-loader']
            },
        ]
    }
}
```

根目录下新建一个文件postcss.config.js

```js
module.exports = {
    plugins: [
        require('autoprefixer'),
    ]
}
```

在package.json中修改浏览器支持情况

```json
{
  ...
  "browserslist": [
    "> 1%", // 浏览器全球使用率大于1%的
    "last 2 versions" // 最新两个版本之内的
  ]
}

```

此时直接启动项目运行即可看到浏览器兼容处理

例如给body写了一个css

```css
body{
    background: red;
    display: flex; // 浏览器支持要单独处理
}
```

解析出来的结果

```css
display: -webkit-box;
display: -ms-flexbox;
display: flex;
```

###### 让css支持嵌套写法

安装

```
npm install postcss-nested
```

配置使用 postcss.config.js

```js
module.exports = {
    plugins: [
        require('autoprefixer'),
        require('postcss-nested') // 支持扩展
    ]
}
```

```css
body{
    background: red;
    display: flex;
    .box {
        width: 100px;
        height: 100px;
        background: yellow;
    }
}
```

此时即会和less  sass功能同样使用

##### css模块

css模块：能让你不用担心命名太大众化而造成冲突

使用方式：配置css loader

```js
module.exports = {
    ...
    module: {
        // type用于定义转换类型
        rules: [
            // 将.jpg文件转换成链接形式
            {
                test: /\.css$/,
                use: ['style-loader', {
                    loader: 'css-loader',
                    options: {
                        modules: true
                    }
                }, 'postcss-loader']
            },
        ]
    }
}
```

也可以部分开启css模块模式，比如全局样式可以冠以 .global 前缀，如

*.global.css普通模式

*.css   css module模式

```js
module.exports = {
    ...
    // 定义模块资源
    module: {
        rules: [
            // global模式
            {
                test: new RegExp(`^(?!.*\\.global).*\\.css`),
                use: [
                    {
                        loader: 'style-loader'
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            modules:true,
                            localIdenName: '[hash:base64:6]'
                        }
                    }
                ],
                exclude: [path.resolve(__dirname, '..', 'node_modules')]
            },
            // 普通模式
            {
                test: new RegExp(`^(.*\\.global).*\\.css`),
                use: [
                    {
                        loader: 'style-loader'
                    },
                    {
                        loader: 'css-loader',
                    }
                ],
                exclude: [path.resolve(__dirname, '..', 'node_modules')]
            },
        ]
    }
}
```

##### web works

webpack5.x版本中，是自带支持web Worker功能的。

使用方式

```js
const worker = new Worker(new URL('./work.js', import.meta.url))

worker.postMessage({
    question: '问题'
})

worker.onmessage = (message) => {
    console.log(message)
}
```

```js
self.onmessage = (message) => {
    self.postMessage({
        answer: 1111
    })
}
```

##### typescript

安装

```
 npm install typescript ts-loader
```

webpack配置

```js
const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')

module.exports = {
    entry: './src/app.ts', // 入口
    mode: 'development', // 设置成开发环境
    output: { // 出口
        filename: 'bundle.js',
        path: path.resolve(__dirname, './dist'), // 设置绝对路径
        clean: true, // 自动清除上次打包出来的文件    
    },
    //  ts解析
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: 'ts-loader',
                exclude: /node_modules/
            }
        ]
    },
    resolve: {
        extensions: ['.ts', '.js'] // 不写文件名时优先找ts文件
    }
}
```

再执行这个会生成一个tsconfig.json配置文件

```bash
npx tsc --init  
```

tsconfig.json

```json
  {
  	...
    "rootDir": "./src",   // ts检查的文件
    "outDir": "./dist", // 输出的文件，对应的webpack中的输出文件
  } 
```

当我们使用某个第三方包时，也要安装相关的类型文件。具体安装第三方相关依赖查询下列官方文档

官方地址https://www.typescriptlang.org/dt/search?search=jquery

#### 多页面应用

为了更好的性能，不同的功能模块配置不同的html

```js
const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')

module.exports = {
    entry: {
        index: {
            import: './src/index.js',
            dependOn: 'sharedLo'
        },
        another: {
            import: './src/another-modules.js',
            dependOn: 'sharedLo' 
        },
        sharedLo: 'lodash'
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'index1.html',  // 依据哪个模板来生成
            filename: 'index1.html', // 生成的文件名
            chunks: ['index', 'sharedLo'] // 该页面分别引入哪些上面的chunk
        }),
        new HtmlWebpackPlugin({
            template: 'index2.html', // 依据哪个模板来生成
            filename: 'index2.html', // 生成的文件名
            chunks: ['another', 'sharedLo'] // 该页面分别引入哪些上面的chunk
        }),
    ],
}
```

#### Tree Shaking

没有使用过的代码不参与打包  基于ESM中的module.就算是引用了但是没有使用过也会被摇掉.

缺点： 第三方包引入了但是没有使用也会被打包

```js
module.exports = {
    ...
    optimization: {
        usedExports: true
    }
}
```

#### sideEffects

告诉webpack哪些文件没有副作用，如果没有使用则不参与打包

webpack4.x 默认所有文件都是有副作用的。所以默认是不会进行tree shaking的

webpack5中可以通过设置sideEffects来实现

比如在文件中引入了css，但实际上未使用

```js
import { add } from './math'
import './style.css' // 引入未使用
console.log(add(4, 5))
```

默认的情况下也会参与打包编译，此时可以通过设置sideEffects   

在package.json中  （！！！只要引用了的第三方包依然会参与打包）

```json
{
  "name": "05-tree-shaking",
   ...
  "sideEffects": false, // 默认值是true，所有的文件都是有副作用的，设置成false则所有的都没有副作用
}

```

也可以单独将某些文件副作用去除掉

```json
{
  "name": "05-tree-shaking",
   ...
  "sideEffects": ["*.css"], // 意思是.css文件是有副作用的，不能进行tree shaking
}
```

#### 渐进式网络应用程序PWA

可以使用http-server包来启动项目

安装：

```
 npm install http-server
```

使用  package.json中定义启动脚本  可以直接npm start启动项目

```json
  "scripts": {
    "start": "http-server dist"
  },
```

动态打包文件： 每次修改后帮我们重新打包

```js
module.exports = {
 	...
    devServer: {
        devMiddleware: {
            writeToDisk: true
        }
    }
}
```

##### 离线下访问

安装

```
npm install workbox-webpack-plugin
```

创建service work

```js

const WorkboxPlugin = require('workbox-webpack-plugin')

module.exports = {
	...
    plugins: [
        ...
        new WorkboxPlugin.GenerateSW({
            clientsClaim: true,
            skipWaiting: true
        })
    ],
    // 这个是为了能让代码存储到硬盘中
    devServer: {
        devMiddleware: {
            writeToDisk: true
        }
    }
}
```

开启service work

```js
if('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/service-worker.js') // 打包会生成该文件
            .then(registration => {
                console.log('SW注册成功', registration)
            })
            .catch(registrationError => {
                console.log('SW注册失败', registrationError)
            })
    })
}
```

之后启动项目npm start之后，就算结束该项目运行依然可以访问。因为已经缓存到了浏览器中。

缓存访问地址 chrome://serviceworker-internals/

#### 预置依赖Shimming

##### 全局引入第三方依赖

```js
const webpack = require('webpack')
module.exports = {
    ...
    plugins: [
        ...
        new webpack.ProvidePlugin({
            _: 'lodash' // 通过 _ 直接使用lodash
        })
    ],
}

// 使用  _.join(['hello', 'shimming'], ' ')
```

##### 细粒度

一些遗留模块依赖的this指向的是window对象，有些时候可能this指向的module.export，为了解决这个问题将this指向window

安装

```bash
 npm install imports-loader 
```

使用

```js
module.exports = {
	...
    module: {
        rules: [
            {
                test: require.resolve('./src/index.js'), // 要关联的文件
                use: 'imports-loader?wrapper=window'
            }
        ]
    }
}
```

##### 全局exports

如果引入了一些第三方包，但是不知道这个包是如何导出的，则可以使用这种全局导出

安装

```bash
npm install exports-loader
```

定义文件

```
const file = 'example test'

const helpers = {
    test:  function() {
        console.log('test something')
    },
    parse: function() {
        console.log('parse something')
    }
}
```

配置全局导出

```js

module.exports = {
    ...
    module: {
        rules: [
            {
                test: require.resolve('./src/globals.js'),
                use: 'exports-loader?type=commonjs&exports=file,multiple|helpers.parse|parse'
            }
        ]
    }
}
```

直接使用

```js
const { file, parse } = require('./globals')

console.log(file)
console.log(parse())
```

### 加载Polyfills

作用：优雅降级

安装

```bash
npm i @babel/polyfill
```

使用

```js
import '@babel/polyfill'
console.log(Array.from([1,2,3], x => x + x))
```

##### 按需加载polyfills

安装

```bash
 npm install babel-loader @babel/core @babel/preset-env core-js@3 -D
```

配置

```js
module.exports = {
	...
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [['@babel/preset-env', {
                            targets: [
                                'last 1 version',
                                '> 1%'
                            ],
                            useBuiltIns: 'usage',
                            corejs: 3
                        }]],
                    }
                }
            }
        ]
    }
}
```

### 创建Library

它只能通过被script标签引用而发挥作用，不能运行在Common、AMD、Node.js环境中，我们希望它能够兼容不同的环境，也就是说，用户应该能够通过以下方式使用打包后的库

Common.js  module  require

AMD module require

script tag，设置type值为umd来实现

配置

```js
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { resolve } = require('path')
const path = require('path')
module.exports = {
    ...
    output: {
        path: path.resolve(__dirname, 'dist'),
        clean: true,
        filename: 'mylib.js',
        library: {
            name: 'mylib', // 这样这个文件就不会被treeShaking
            type: 'umd',  // window  commongjs umd可以让他支持node和window ，单需要加上下面的globalObject
        },
        globalObject: 'globalThis' // 需加上该属性
    },
    
}
```

定义文件 src/index

```js
export const add = (x, y) => {
    return x + y
}
```

使用1，然后通过npx http-server可以在浏览器访问

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    
</body>
</html>
<script src="../dist/mylib.js"></script>
<script>
    console.log(mylib.add(1, 2))
</script>
```

使用2  用node执行该文件

```js
const {add} = require('../dist/mylib')

console.log(add(6, 7))
```

##### 创建一个符合各个环境之间的包

```js

module.exports = {
  	...
    output: {
        ...
        library: {
            name: 'webpackNumbers', // 这样这个文件就不会被treeShaking
            type: 'umd',  // window  commongjs 
        },
        globalObject: 'globalThis'
    },
    // 发布上去之后提示没有lodash文件，待解决
    externals: { // 放到这里面让第三方包其不参与打包，减少打包体积
        lodash: {
            commonjs: 'lodash',
            commonjs2: 'lodash',
            amd: 'lodash',
            root: '_'
        }
    }
}
```

自己定义两个方法

```
import _ from 'lodash'

import numRef from './ref.json'

export function numToWord(num) {
    return _.reduce(numRef, (accum, ref) => {
        return ref.num === num ? ref.word : accum
    }, '')
}


export function wordToNum(word) {
    return _.reduce(numRef, (accum, ref) => {
        return ref.word === word && word.toLowerCase() ? ref.num : accum
    }, -1)
}
```

使用   node引入自己的包然后使用

```
const webpackNumbers = require('../dist/webpack-numbers')

console.log(webpackNumbers.numToWord(3))
```

##### 发布到npm上

把上面自己定义的两个方法（numToWord， wordToNum）发布到npm上  

相关代码在 part-2/08-library/-2-webpack-numbers

首先在npm上注册一个自己的账号（这个是我自己的包管理页面）

https://www.npmjs.com/settings/caozhongjie/packages

```
 npm config get registry
```

这个时候会出来如下一个链接   要保证这个链接是https的，保证是npm的源

https://registry.npmjs.org/

在确定了上面npm正确之后

执行

```bash
npm adduser
```

然后输入自己的npm账号密码和邮箱，执行publish之后就可以发布上去了

```
npm publish
```

要保证自己的包名是唯一的,否则会发布失败 package.json

```json
{
  "name": "webpack-numbers-test-ccczzzjjj", // 包名
  "version": "1.0.0", // 版本
  "main": "dist/webpack-numbers.js", // 指向你打完包之后的文件路径
}
```

安装使用

```bash
npm install webpack-numbers-test-ccczzzjjj
```

```js
import { numToWord } from 'webpack-numbers-test-ccczzzjjj'
console.log(11111, numToWord(3))
```

#### 模块联邦（Module Federation）

可以理解为微前端

目前我们有三个独立的项目  nav  search  home 

实现功能将项目中的组件暴露出来给其他项目使用

nav项目运行在localhost:3003中 （npx webpack serve --port 3003）

home项目运行在localhost: 3001中 （npx webpack serve --port 3001）

search项目运行在localhost: 3002中 （npx webpack serve --port 3002）

在nav项目下有一个文件 src/Header

```js
const Header = () => {
    const header = document.createElement('h1')
    header.textContent = '公共头'
    return header
}

 export default Header
```

 这个时候要通过模块联邦将他暴露出去  nav下webpac.config.js

```js
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { ModuleFederationPlugin } = require('webpack').container

module.exports = {
    entry: './src/index.js',
    mode: 'production',
    plugins: [
        new HtmlWebpackPlugin(),
        new ModuleFederationPlugin({
            name: 'nav', // 定义的名称，之后其他项目通过这个来引入
            filename: 'remoteEntry.js', // 定义的引入的远端项目文件
            remotes: {},
            exposes: { // 暴露给别的组件使用
                './Header': './src/Header.js' // 其它项目使用时通过/Header来使用。 后面是文件路径
            },
            shared: {} // 共享的第三方包 如lodash等
        })
    ]
}
```

比如现在home项目要使用nav暴露出来的组件  home下webpack.config.js

```js
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { ModuleFederationPlugin } = require('webpack').container
module.exports = {
    entry: './src/index.js',
    mode: 'production',
    plugins: [
        new HtmlWebpackPlugin(),
        new ModuleFederationPlugin({
            name: 'home', // 名称
            filename: 'remoteEntry.js', // 远端仓库文件（暴露给其他组件的）
            remotes: {
                //定义一个nav,他的值是上面定义的name和nav项目的运行地址以及filename的值（看上面配置）
                nav: 'nav@http://localhost:3003/remoteEntry.js'
            },
            exposes: { // 暴露给别的组件的东西（没有的话可不写）
                './HomeList': './src/HomeList.js'
            },
            shared: {} // 共享的第三方包
        })
    ]
}
```

使用：home中业务代码，因为这个是异步的并且返回的是一个promise

```js
import('nav/Header').then((Header) => {
    const body = document.createElement('div')
    body.appendChild(Header.default()) // 通过这个default来取这个组件
    document.body.appendChild(body)
})

```

完整代码地址  part-2/09-module-federation下

通过npx webpack serve --port 3001  3002  3003分别让三个项目跑起来就可以看到效果

### 提升构建性能

分为两种1、项目性能 （首屏加载时间，页面响应速度）  2、构建时间体积

三种环境 1、通用环境  2、开发环境 3线上环境

#### 通用优化

##### 1、更新webpack版本 和node.js版本

##### 2、将loader应用于最少数量的必要模块 （如下  只解析src下的js文件）

```js
module.exports = {
	module: {
		rules: [
			{
				test: /\.js$/,
				include: path.resolve(__dirname, 'src'),
				loader: 'babel-loader'
			}
		]
	}
}
```

##### 3、引导（bootstrap)

每个额外的loader/plugin都有其启动时间，尽量少的使用工具

##### 4、解析

- 减少resolve.modules, resolve,extensions,resolve.mainFiles, resolve.descriptionFiles中条目数量，因为他们会增加文件系统调用的次数
- 如果你不使用symlinks(例如 npm link或者yarn link)，可以设置resolve.symlinks:false
- 如果你使用自定义resolve plugin规则，并且没有指定context上下文，可以设置resolve.cacheWithContext:false

##### 5、小即是快

减少编译结果的整体大小，以提高构建性能，尽量保持chunk体积小

- 使用数量更少/体积更小的library
- 在多页面应用中使用SplitChunksPlugin，并开启async模式
- 移除未引用的代码
- 只编译你当前正在开发的那些代码

##### 6、持久化缓存

在webpack配置中使用cache选项，使用package.json中的postinstall清除缓存目录

将cache类型设置为内存或文件系统，memory选项很简单，它告诉webpack在内存中存储缓存，不允许额外配置

```js
module.exports = {
	...
	cache: {
		type: 'memory'
	}
}
```

##### 7、自定义plugin/loader

对他们进行概要分析，以免在此处引入性能问题

##### 8、progress plugin

将`ProgressPlugin`从`webpack`中删除，可以缩短构建时间。

注意： ProgressPlugin可能不会为快速构建提供太多价值，权衡使用

##### 9、dll

代码路径 part2/10-build-performance/01-dll

`DllPlugin` 和 `DllReferencePlugin` 用某种方法实现了拆分 bundles，同时还大幅度提升了构建的速度

使用DllPlugin为更改不频繁的代码生成单独的编译结果，这样可以提高应用程序的编译速度，尽管它增加了构建过程的复杂度

比如要使用jquery,将他解析成单独的chunk

在根目录下新建文件夹 webpack.dll.config.js

```js
const path = require('path')
const webpack = require('webpack')
module.exports = {
    mode: 'production',
    entry: {
        jquery: ['jquery'] // 可以把其他包名字也放进去
    },
    output: {
        filename: '[name].js', // 输出的动态链接库的文件名称，[name] 代表当前动态链接库的名称，
        path: path.resolve(__dirname, 'dll'),
        library: '[name]_[hash]' //library必须和后面dllplugin中的name一致
    },
    plugins: [
        // 接入 DllPlugin
        new webpack.DllPlugin({
            // 动态链接库的全局变量名称，需要和 output.library 中保持一致
            // 该字段的值也就是输出的 manifest.json 文件 中 name 字段的值
            name: '[name]_[hash]',
            // 描述动态链接库的 manifest.json 文件输出时的文件名称
            path: path.resolve(__dirname, 'dll/manifest.json')
        })
    ]
}
```

然后执行打包命令

```
webpack --config ./webpack.dll.config.js
```

`manifest.json`文件里，是用来描述对应的dll文件里保存的模块，里面暴露出刚刚构建的所有模块

修改配置文件 webpack.config.js

安装

```bash
npm install add-asset-html-webpack-plugin
```

配置

```js
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack =require('webpack')
const path = require('path')
const AddAssetHtmlPlugin =require('add-asset-html-webpack-plugin')

module.exports = {
    ...
    plugins: [
        ...
        new webpack.DllReferencePlugin({
            manifest: path.resolve(__dirname, './dll/manifest.json') // 上面生成的文件路径
        }),
        // 加上这个插件才可以在页面中访问
        new AddAssetHtmlPlugin({
            // 指向打包出来的文件名路径
            filepath: path.resolve(__dirname, './dll/jquery.js'), 
            publicPath: './' // 当前路径
        })
    ]
}
```

##### 10、worker池（worker pool）

thread-loader可以将非常消耗资源的loader分流给一个worker pool （和happypack一样）

安装 

```bash
 npm install thread-loader
```

使用: 比如我们要处理babel-loader

```js
module.exports = {
    ....
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: ['@babel/preset-env']
                        }
                    },
                    // 将babel-loader分配给worker pool
                    {
                        loader: 'thread-loader',
                        options: {
                            workers: 2 // 定义CPU数量
                        }
                    }
                ]
            }
        ]
    }
}
```

注意： 不要使用太多的worker，因为Nodejs的runtime和loader都有开销，最小化worker和main process主进程之间的模块传输。进程间通讯(IPC  inter process communication)是非常消耗资源的

#### 开发环境提升构建性能

##### 1、增量编译

使用webpack的watch mode(监听模式)。而不使用其他工具来watch文件和调用webpack，内置的watch mode会记录时间戳并将此信息传递给compilation以使缓存失效。

在某些配置环境中，watch mode会回退到poll mode(轮询模式),监听太多文件会导致CPU大量负载，这些情况下，可以使用watchOptions.poll来增加轮询的间隔时间

##### 2、在内存中编译

下面几个工具通过在内存中（而不是写入磁盘）编译和serve资源来提高性能

- webpack-dev-server
- webpack-hot-middleware
- webpack-dev-middleware

##### 3、stats.toJson加速

webpack4默认使用stats.toJson()输出大量数据，除非在增量步骤中做必要的统计，否则请避免获取stats对象的部分内容

webpack-dev-server在V3.13.3以后的版本，包含一个重要的性能修复，即最小化每个增量构建步骤中，从stats对象获取的数据量

##### 4、devtool

- eval具有最好的性能，但不能帮你转译代码
- cheap-source-map配置可以提高性能，但是map质量会稍差
- 使用eval-source-map配置进行增量编译
- 大多情况下，最佳选择是eval-cheap-module-source-map

##### 5、避免在生产环境才用到的工具

某些utility、plugin和loader都只能用生产环境，比如在开发环境进行压缩是没有意义的

应该排查以下工具

- TerserPlugin
- [fullhash]/[chunkhash]/[contenthash]
- AggressiveSplittingPlugin
- AggressiveMergingPlugin
- ModuleConcatenationPlugin

##### 6、最小化entry chunk

确保在生成entry chunk时，尽量减少其体积以提高性能

```js
module.exports = {
	...
	optimization: {
	  runtimeChunk: true
	}
}
```

##### 7、避免额外的优化步骤

webpack通过执行额外的算法任务，来优化输出结果的体积和加载性能。这些优化适用于小型代码库，但是在大型代码库中却非常消耗性能

```js
module.exports = {
	...
	optimization: {
		removeAvailavleModules: false,
		removeEmptyChunks: false,
		splitChunks: false
	}	
}
```

##### 8、输出结果不携带路径信息

webpack会在输出的bundle中生成路径信息。然而在打包数千个模块的项目中，这会导致垃圾回收性能的压力，在options.output.pathinfo设置中关闭

```js
module.exports = {
	...
	output: {
		pathinfo: false
	}
}
```

##### 9、TypeScript Loader

可以为loader传入transpileOnly选项，以缩短使用ts-loader时的构建时间。使用此选项，会关闭类型检查。如果要再次开启类型检查，请使用ForkTsCheckerWebpackPlugin,使用此插件会将检查过程转移至单独的进程，可以加快Typescript的类型检查和Eslint插入的速度。

```js
module.exports = {
	...
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				use: [
					{
						loader: 'ts-loader',
						options: {
							transpileOnly: true
						}
					}
				]
			}
		]
	}
}
```

#### 生产环境优化

##### 不起用sourceMap

source map相当消耗资源，开发环境模式不要设置source map





















