/**
 * Created by zhangyq on 2016/5/25.
 */
var path = require('path');
var webpack = require('webpack');
var node_modules_dir = path.join(__dirname, 'node_modules');
//var commonsPlugin = new webpack.optimize.CommonsChunkPlugin('vendors', 'libs.js');
var config = {

    //插件项
    //plugins: [commonsPlugin],
    plugins:[
        new webpack.DefinePlugin({
            'process.env':{
                'NODE_ENV': JSON.stringify('production')
            }
        })],
    //页面入口文件配置
    entry: {
        app :['./router.js'],

    },
    //入口文件输出配置
    output: {
        path: '../../../../dist/<%=data.moduleName%>/',
        publicPath: "http://10.32.64.15:5389/rn/dist/",//html引用路径
        filename: '[name].js' // 注意我们使用了变量
    },
    externals: {
        'react': 'React',
        'react-dom': 'ReactDOM',
        'react-router':'ReactRouter',
        'amazeui-touch': 'AMUITouch',
        'react-addons-css-transition-group':
            ['React', 'addons', 'CSSTransitionGroup']

    },
    module: {
        //加载器配置
        noParse: [],
        loaders: [
            { test: /\.(png|jpg)$/, loader: 'url-loader?limit=8192'},
            {
                test: /\.jsx?$/,
                // exclude:/node_modules/,
                loader: 'babel',
                query: {
                    presets: ['es2015', 'react', 'stage-1']//先后顺序不能错,否则有些语法转换会报错
                },
                exclude: /node_modules/
            }

        ]
    },
    //其它解决方案配置
    resolve: {
        alias: {},
        extensions: ['', '.js', '.json', '.scss','jsx'],
        alias: {
            AppStore : 'js/stores/AppStores.js',
            ActionType : 'js/actions/ActionType.js',
            AppAction : 'js/actions/AppAction.js'
        }
    }
};



module.exports = config;