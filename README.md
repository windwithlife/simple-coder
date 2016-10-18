

### 环境配置
- 1. 安装node，npm版本3以上。
- 2. 设置npm组件库
npm config set registry http://registry.npmjs.org/
```
- 3.全局安装simple-coder

npm install -g simple-coder

4.从零开始生成项目：
simple-coder init project-name
5.进入此项目
cd project-name
6.安装环境NPM 组件
npm install
```

### 项目结构

- frontend 目录下是前端业务代码，其中js，reactjs子目录下是分别用js，reactjs实现的代码.
  其中js/reactjs 目录下有4个子目录：
  1.dev-server 开发测试用
  2.release 打包发布用。
  3.resources自动生成的前端代码
  4.dist 打包后代码位置，在此位置代码可以用dev-server的nodejs服务进行测试展示。
- server目录下为服务端代码（含网站框架）其下有java/nodejs等子目录，分别为各种语言实现的soa 服务器及网站框架。目前仅支持java spring-boot框架。

- modules目录为业务定义位置，内部对各业务实体进行了定义。用simple-coder插件可以根据这里的实体定义，进行自动生成服务器soa接口代码，数据库代码，及前端js代码，reactjs代码。

### 项目试用
  1. 安装环境所需插件：npm install 
  2.进入frontend\js\release\目录
  3.打包：gulp
  4.进入frontend\js\dev-server\目录
  5 运行静态资源服务器 node www.js
  
### 项目使用：
- 首先在项目目录处安装npm 插件：npm install (因为reactjs es6 插件有bug,所有工程所需插件都在此处安装）
-- 全局安装simple-coder： npm install -g simple-coder-cli 
- 在modules 里定义所需的实体类.
- 进行代码自动生成：
  1.自动生成js代码：simple-coder -g js
  2.自动生成reactjs代码simple-coder -g rj
  3.自动生成soa 的java代码 simple-coder -g server-java
  
  本项目本身已根据modules中的缺省几个实体定义，自动生成过一次代码，已有4个模块。
- 打包测试（以js代码为例）：
  1.进入frontend\js\release\目录
  2.打包：
     gulp --host=yourServerIP(你的服务器地址与端口，假设你的服务器不是在本地的5389端口运行）
     gulp run 
     即可进行打开浏览器进行测试，此时任何源码目录中的代码更新，都会被自动编译，并自动刷新浏览器页面。
  4.全量测试：
     进入frontend\js\dev-server\目录
     运行静态资源服务器 node www.js
     注意要运行你的服务端代码，请见“服务端代码运行”
- 服务端代码运行：     
  1.进入java IDE(例入Eclipse/MyEclipse)打开导入（maven) server\java\simpleserver  项目,然后运行soa服务端代码

### 项目发布：
    1.进入frontend\js\release\目录
    2.打包：
       gulp release --host=yourServerIP(你的服务器地址与端口)。
    3.此项目支持DaoCloud的Docker云服务集群的生产线上自动化发布，布署。如果使用此功能。请在Daocloud上对此项目进行自动集成配置。
     
## 样例：
- 在examples目录下有例子程序，有写好的基本框架，可以参考。

### FAQ

