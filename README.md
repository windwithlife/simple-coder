

### 环境配置
1. 安装node，npm版本3以上。
2. 把npm指向公司地址，命令行
2.1
npm config set registry http://npm.dev.sh.ctripcorp.com:8001/
2.2这个是组件原始上传npm库
npm config set registry http://registry.npmjs.org/
```
3.全局安装simple-react

npm install -g simple-react
```
4.在根目录运行
```
npm install
```


### 项目结构
- android,ios,web下分别时项目运行在安卓、苹果、网页平台下的配置文件。
- src下时业务代码

### 项目打包
- 以下是react native的打包方法，
- [ios打包安装参考](https://segmentfault.com/a/1190000004189538)
- 根文件命令行运行：react-native bundle --entry-file ./index.ios.js --platform ios --bundle-output ./ios/bundle/index.ios.jsbundle --assets-dest ./ios/bundle --dev false

## 样例：
- 在examples目录下有例子程序，有写好的基本框架，可以参考。

### FAQ
- Q:当发现以下几种情况时，应该是babel组件问题：
- 1。出现莫名其妙的，图片无法加载，比如require('../xxx/yyy.png'),报错为Unable resolve module "../xxx/yyy.png"...
- 2. 出现常见组件无法找到。 Unable resolve module "react"
  A: 这是因为设置babel处理js时缺省配置有问题。删掉react-deep-force-update组件中的.babelrc就好了。
