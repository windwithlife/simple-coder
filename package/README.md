

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

- modules目录为业务定义位置，内部对各业务实体进行了定义。用simple-coder npm 插件可以根据这里的实体定义，进行自动生成服务器soa接口代码，数据库代码，及前端js代码，reactjs代码。
- frontend 目录下是前端业务代码，其中js，reactjs子目录下是分别用js，reactjs实现的代码.
  其中js/reactjs/rn 目录下有4个子目录：
  1.dev-server 开发测试用(整个前端所有频道包含布局的整合测试）
  2.release 打包发布用（含频道测试功能）。
  3.resources自动生成的前端代码
  4.dist 打包后代码位置，在此位置代码可以用dev-server/release的的测试工具进行测试展示。
- server目录下为服务端代码（含网站框架）其下有java/nodejs等子目录，分别为各种语言实现的soa 服务器及网站框架。目前仅支持java spring-boot框架。
- website目录下为动态站点的Web Server。



### 项目演示（以js为例）
- 1. 项目根目录下安装环境所需插件：npm install 
- 2.进入frontend\js\release\目录
  3.打包并进行测试：gulp run
  注：.(如果想替换SOA服务器地址请执行gulp --host=http://xx.xx.xx.xx:yourPort/)
- 提供接口服务请执行如下步聚：
  4.进入\server\java\simpleserver\目录，打开java工程编译并运行（可用命令行运行maven命令，或者用Eclipse打开工程并运行，本地mysql数据库运行状态，并且建有mydb的database.）
  
  
### 项目使用（React JS）：
- 首先在项目目录处安装npm 插件：npm install (因为reactjs es6 插件有bug,所有工程所需插件都在此处安装）
-- 准备插件：
    如果还未安装simple-coder插件，请全局安装simple-coder： npm install -g simple-coder 
- 在modules 里定义所需的实体类.

- 进行代码自动生成：
  1.自动生成js代码：simple-coder -g js
  2.自动生成reactjs代码simple-coder -g rj
  3.自动生成reactjs代码（带有redux支持）simple-coder -g rj-with-redux
  4.自动生成soa 的java代码 simple-coder -g server-java
  
  (本项目本身已根据modules中的缺省几个实体定义，自动生成过一次代码，已有4个模块)。
  
- 打包测试：
  1. React JS打包并运行测试代码reactjs代码：
    进入reactjs目录：frontend/reactjs/release/
    gulp run
    注：.(如果想替换SOA服务器地址请执行gulp --host=http://xx.xx.xx.xx:yourPort/)
    如果想对单频道进行测试：执行node devServer.js即可 
    如果发布到生产环境目录：执行gulp release,然后根据各项目自动化发布环境进行发布，请参考：“打发布包及自动化发布集成”
  
  2. JS打包，测试，生成发布：
     进入js目录：frontend/js/release/
     gulp run
     注：.(如果想替换SOA服务器地址请执行gulp --host=http://xx.xx.xx.xx:yourPort/)
     如果发布到生产环境目录：执行gulp release,然后根据各项目自动化发布环境进行发布，请参考：“打发布包及自动化发布集成”
     
  
  
  
 注：如果测试空白页，或者不熟悉java 的SOA服务器代码，可以在打包时加入参数gulp --host=http://api.zhangyongqiao.com:8080
 使用远端公网上的服务器接口进行测试。 
 
### 自动化发布集成CI：
    1.进入frontend\js\release\目录
    2.打包：
       gulp release --host=yourServerIP(你的服务器地址与端口)。
    3.此项目支持DaoCloud的Docker云服务集群的生产线上自动化发布，布署。如果使用此功能。请在Daocloud上对此项目进行自动集成配置。
     
## 样例：
- 在examples目录下有例子程序，有写好的基本框架，可以参考。


### FAQ
- Q:在编译reactjs 项目时，如果编译报错“Module build failed: Error: Couldn't find preset "es2015" relative to directory ”
A:这是因为babel所用的，es2015这个组件不能正常编译组件所在项目以外目录的源代码，也就是说源代码必须是node_modules的同级目录，或者当前目录的子目录。解决办法：
在工程根目录下，安装项目所需要的NPM组件。（当然包含es2015).

