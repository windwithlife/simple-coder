

### 环境配置
1. 安装node，npm版本3以上。
2. 把npm指向公司地址，命令行
2.1
npm config set registry http://npm.dev.sh.ctripcorp.com:8001/
2.2这个是组件原始上传npm库
npm config set registry http://registry.npmjs.org/

3.在根目录运行
npm install


### 项目结构
- frontend 目录下是前端业务代码，其中js，reactjs子目录下是分别用js，reactjs实现的代码.
  其中js/reactjs 目录下有4个子目录：
  1.dev-server 开发测试用
  2.release 打包发布用。
  3.resources自动生成的前端代码
  4.dist 打包后代码位置，在此位置代码可以用dev-server的nodejs服务进行测试展示。
- server目录下为服务端代码（含网站框架）其下有java/nodejs等子目录，分别为各种语言实现的soa 服务器及网站框架。目前仅支持java spring-boot框架。

- modules目录为业务定义位置，内部对各业务实体进行了定义。用simple-coder npm 插件可以根据这里的实体定义，进行自动生成服务器soa接口代码，数据库代码，及前端js代码，reactjs代码。

### 项目使用：
- 首先在项目目录处安装npm 插件：npm install (因为reactjs es6 插件有bug,所有工程所需插件都在此处安装）
- 全局安装simple-coder： npm install -g simple-coder-cli 
- 在modules 里定义所需的实体类.
- 进行代码自动生成：
  1.自动生成js代码：simple-coder -g js
  2.自动生成reactjs代码simple-coder -g rj
  3.自动生成soa 的java代码 simple-coder -g server-java
  
  本项目本身已根据modules中的缺省几个实体定义，自动生成过一次代码，已有4个模块。
- 打包测试（以js代码为例）：
  1.生成前端js代码及对应后端服务器代码 
    $:simple-coder -g js
    $:simple-coder -g server-java
    
  2.进入frontend\js\release\目录
  3.打包：gulp
  4.进入frontend\js\dev-server\目录
  5 运行静态资源服务器 node www.js
  6.进入java IDE(例入Eclipse/MyEclipse)打开导入（maven) server\java\simpleserver  项目,然后运行soa服务端代码
  7.浏览器中打开 http://localhost:5389/admin/product/ 即可测试。
  
 注：如果测试空白页，或者不熟悉java 的SOA服务器代码，可以在打包时加入参数gulp --host=http://api.zhangyongqiao.com:8080
 使用远端公网上的服务器接口进行测试。 
 
### 项目打包
- 
## 样例：


### FAQ
- Q:在编译reactjs 项目时，如果编译报错“Module build failed: Error: Couldn't find preset "es2015" relative to directory ”
A:这是因为babel所用的，es2015这个组件不能正常编译组件所在项目以外目录的源代码，也就是说源代码必须是node_modules的同级目录，或者当前目录的子目录。解决办法：
在工程根目录下，安装项目所需要的NPM组件。（当然包含es2015).


