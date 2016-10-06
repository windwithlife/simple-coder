var excludedir = ['component'], // 排除的文件夹
    dirmockup  = 'mockup', // HTML开发目录
    dirbuild   = 'build', // HTML预览目录
    diraspnet  = 'source', // ASP.NET 代码目录
    dirDist    ='../../../../src/main/resources/static/dist/',
    dirSource    ='../resources/',
      dirroot    = './';
var os         = require('os');
var path       = require('path');
var xtools     = require('./xtools');
var gulp       = require('gulp'),
   // shell      = require('gulp-shell'),
    ///less       = require('gulp-less'),
    clean      = require('gulp-clean');
   // connect    = require('gulp-connect'),
    //concat     = require('gulp-concat'),
    //sourcemaps = require('gulp-sourcemaps'),
    //minifyCSS  = require('gulp-minify-css'),
   // uncss      = require('gulp-uncss'),
    //watch      = require('gulp-watch'),
    //uglify     = require('gulp-uglify');
    //jshint     = require('gulp-jshint')


//var buildprj  = argv.dir,
//    runport   = argv.port,
 //   minjsfile = argv.min;

var taskProject = {

    setLess: function(project, dest) {

        if (project.length > 0) {
            project.forEach(function (folder) {

                return gulp.src('./' + dirmockup + '/' + folder + '/less/*.less')
                    .pipe(less({
                        paths: [ path.join(__dirname, 'less', 'includes') ]
                    }))

                    .pipe(gulp.dest(dest + folder));
            });
        }
    },

    setConcatCss: function(project, dest){
        if (project.length > 0) {
            project.forEach(function (folder) {
                return gulp.src(['./' + dirbuild + '/' + folder + '/*.css', './' + dirmockup + '/' + folder + '/addClass/add-class.css'])
                    .pipe(concat('index.css'))
                    .pipe(minifyCSS({keepSpecialComments:0}))
                    .pipe(gulp.dest(dest + folder));
            });
        }
    },


    /*
     * JS 压缩
     * @params
     *     dir: js压缩后移动到的目录
     */
    minjs: function(dir) {

        gulp.src('./'+ diraspnet + '/**/*.js')
            .pipe(uglify())
            .pipe(gulp.dest(dir));

    },

    move: function(params) {

        gulp.src([
            './' + params.from + '/**/*.png',
            './' + params.from + '/**/*.jpg',
            './' + params.from + '/**/*.gif',
            './' + params.from + '/**/*.ttf'
        ])
            .pipe(gulp.dest(params.to));

    },

    html: function() {

        gulp.src([
            './' + dirmockup + '/**/*.html',
            './' + dirmockup + '/**/stylesheets/*.*'
        ])
            .pipe(gulp.dest('./' + dirbuild + '/'));
    },


    js: function() {//doc自用js
        gulp.src([
            './' + dirmockup + '/**/*.js'
        ])
            .pipe(gulp.dest('./' + dirbuild + '/'));
    },

    dist: function () {//框架文件
        gulp.src([
            './' + dirlib + '/**/dist/**/*.*',
            './' + dirlib + '/**/src/**/*.*'
        ])
            .pipe(gulp.dest('./' + dirbuild + '/'));
    },
    moveToDist: function () {//框架文件
        gulp.src(
            dirSource,{base:"../resources/"}

        )
            .pipe(gulp.dest(dirDist));
    },
    _watch: function() {

        var self = this;

        watch('./' + dirmockup + '/**/*', function() {
            self.build();
        });

    },

    connect: function() {

        var version = os.platform(),
            port = runport ? runport : '5555',
            url = '';

        connect.server({
            root: dirroot,
            port: port,
            livereload: true
        });

        switch (version) {
            case 'win32':
                url = 'start http://localhost:' + port;
                break;
            case 'darwin':
                url = 'open http://localhost:' + port;
                break;
        }

        //gulp.src('')
        //.pipe(shell(url));

    },

    build: function() {
        var self = this;

        self.move({
            from: dirmockup,
            to: './' + dirbuild + '/'
        });

        self.html();
        self.js();
        self.dist();

        readfolder.folder({
            from: dirmockup,
            to: './' + dirbuild + '/',
            exclude: excludedir,
            // callback: function() {
            //     self.setLess()

            // }
            callback: self.setLess
        });
    },

    concatCss: function() {
        var self = this;

        self.move({
            from: dirmockup,
            to: './' + dirbuild + '/'
        });

        readfolder.folder({
            from: dirmockup,
            to: './' + dirbuild + '/',
            exclude: excludedir,
            callback: self.setConcatCss
        });

    },


    tfs: function() {
        var self = this;

        var tfsdir = dirtfs.dir().toString() + 'WebResource/' + dirbuild + '/';

        if (buildprj) {

            self.move({
                from: dirmockup + '/' + buildprj,
                to: tfsdir + buildprj
            });

            gulp.src('./' + dirmockup + '/' + buildprj + '/*.less')
                //.pipe(sourcemaps.init())
                .pipe(less())
                //.pipe(sourcemaps.write())
                //.pipe(minifyCSS())
                .pipe(gulp.dest(tfsdir + buildprj));


            if (excludedir.length > 0) {
                excludedir.forEach(function (folder) {
                    self.move({
                        from: dirmockup + '/' + folder,
                        to: tfsdir + folder
                    })
                });
            }

        } else {

            self.move({
                from: dirmockup,
                to: tfsdir
            });

            readfolder.folder({
                from: dirmockup,
                to: tfsdir,
                exclude: excludedir,
                callback: self.setLess
            });

        }
    },

    watch_tfs: function() {
        var self = this;

        watch([
            './' + dirmockup + '/**/*',
            './' + diraspnet + '/**/*'
        ], function() {
            self.build();
            self.tfs();
            self.aspnet();
        });

    },

    _print: function() {
        console.log('\033[0;31m\n文件已经迁移到TFS环境中');
        // console.log('当前迁移的TFS路径为：' + tfsdir);
        console.log('当前迁移的TFS路径为：' + dirtfs.dir().toString());
        console.log('如果TFS路径不正确，请自行在lib目录中增加 .tfsdir 文件，文件的内容为TFS路径\033[0m\n');
    }
};


gulp.task('clean', function() {

    return gulp.src('./' + dirbuild, {
        read: false
    })
        .pipe(clean());

});

gulp.task('default', ['clean'], function() {

    gulp.start(function() {
        //taskProject.moveToDist();
        xtools.copyDirEx(dirSource,dirDist);
    });

});


/*
 * 模板开发预览
 * gulp run
 * gulp run --port {自定义运行端口，默认1234}
 */


gulp.task('run', ['clean'] ,function() {

    gulp.start(function() {
        taskProject.build();
        taskProject._watch();
        taskProject.connect();
    });
});

gulp.task('concatcss', function() {

    gulp.start(function() {
        taskProject.concatCss();
        taskProject._watch();
        taskProject.connect();
    });
});

