"use strict";
// ===========================================
// varables for nodejs
// ===========================================
var gulp = require("gulp");
var sass = require("gulp-sass");
var sassGlob = require("gulp-sass-glob");
var cssnano = require("gulp-cssnano");
var sassVars = require("gulp-sass-variables");
var pug = require("gulp-pug");
var autoprefixer = require("gulp-autoprefixer");
var del = require("del");
var imagemin = require("gulp-imagemin");
var pngquant = require("imagemin-pngquant");
var plumber = require("gulp-plumber");
var gulpif = require("gulp-if");
var runSequence = require("run-sequence");
var zip = require("gulp-zip");
var watch = require("gulp-watch");
var sourcemaps = require("gulp-sourcemaps");
var browserSync = require("browser-sync");
var express = require("express");
var favicon = require("serve-favicon");
var newer = require("gulp-newer");
var spritesmith = require("gulp.spritesmith");
var app = express();
var listener, port;
var webpack = require("webpack");
var webpackStream = require("webpack-stream");
var webpackDevMiddleware = require("webpack-dev-middleware");
// ===========================================
// flags - minify, browserSync and no watching (bs)
// ===========================================
var flags = {
    minify: false,
    bs: true,
    watch: true
};

gulp.task("isMinify", function() {
    flags.minify = true;
    console.log("===> minify - ", flags.minify);
});

gulp.task("isNoWatch", function() {
    flags.watch = false;
    console.log("===> watching - ", flags.watch);
});
gulp.task("isNoBs", function() {
    flags.bs = false;
    console.log("===> browser-sync - ", flags.bs);
});
// ===========================================
// include PATH SCSS Список путей для поиска файла (имя файла для поиска в style.scss)
// ===========================================
// var sassPaths = [];
// ===========================================
// settings PATH
// ===========================================
var path = {
    dist: {
        html: "dist/",
        js: "dist/js/",
        css: "dist/css/",
        images: "dist/images/",
        i: "dist/i/",
        fonts: "dist/fonts/",
        sprite: "dist/images/sprite"
    },
    src: {
        html: "src/pug/*.pug",
        js: "src/js/components/*.js",
        css: ["src/scss/style.scss"],
        images: "src/images/**/*.*",
        i: "src/i/**/*.*",
        fonts: "src/fonts/**/*.*",
        sprites: "src/sprites-png/*.png"
    },
    watch: {
        // 'Path must be a string' for gulp-watch
        html: "src/pug/**/*.pug",
        js: "src/js/**/*.js",
        css: "src/scss/**/*.scss",
        images: "src/images/**/*.*",
        i: "src/i/**/*.*",
        fonts: "src/fonts/**/*.*",
        sprites: "src/sprites-png/*.png"
    },
    cleanFolder: "./dist"
};
// ===========================================
// tasks CLEAN
// ===========================================
gulp.task("clean-css", function() {
    return del(path.dist.css);
});
gulp.task("clean-html", function() {
    return del(path.dist.html + "*.html");
});
gulp.task("clean-images", function() {
    return del(path.dist.images);
});
gulp.task("clean-i", function() {
    return del(path.dist.i);
});
gulp.task("clean-fonts", function() {
    return del(path.dist.fonts);
});
gulp.task("clean-js", function() {
    return del(path.dist.js);
});
gulp.task("clean-all", function() {
    return del(path.cleanFolder);
});
// ===========================================
// tasks sprites
// ===========================================
gulp.task("sprites", function() {
    var fileNameSprite = "sprite.png";
    var spriteData = gulp.src(path.src.sprites).pipe(
        spritesmith({
            imgName: fileNameSprite,
            cssName: "sprite.scss",
            cssFormat: "scss",
            padding: 10,
            imgPath: "../images/sprite/" + fileNameSprite
        })
    );
    spriteData.img.pipe(gulp.dest(path.dist.sprite));
    spriteData.css.pipe(gulp.dest("./src/scss/components/sprite/"));
    return spriteData;
});
// ===========================================
// tasks SASS/SCSS
// ===========================================
gulp.task("sass", function() {
    return (
        gulp
            .src(path.src.css)
            .pipe(plumber())
            .pipe(gulpif(flags.bs, sourcemaps.init()))
            .pipe(gulpif(flags.minify, sassVars({ $minify: true })))
            .pipe(sassGlob())
            // .pipe(sass({ includePaths: sassPaths }).on("error", sass.logError))
            .pipe(sass().on("error", sass.logError))
            .pipe(
                autoprefixer({
                    // browsers: ['last 2 versions', 'ie >= 10'],
                    browsers: ["last 2 version", "> 1%", "ie >= 10"],
                    cascade: false
                })
            )
            .pipe(gulpif(flags.minify, cssnano()))
            .pipe(gulpif(flags.bs, sourcemaps.write()))
            .pipe(gulp.dest(path.dist.css))
    );
});
// ===========================================
// tasks Pugjs
// ===========================================
gulp.task("pug", function() {
    if (flags.bs) {
        // отключаем кеширования
        app.disable("view cache");
        // указываем какой шаблонизатор использовать
        app.set("view engine", "pug");
        // расположение шаблонов ('src/pug')
        app.set("views", "./");
        // путь до наших стилей, картинок, скриптов и т.д.
        app.use("/css", express.static("dist/css"));
        app.use("/fonts", express.static("src/fonts"));
        app.use("/i", express.static("src/i"));
        app.use("/images", express.static("src/images"));
        app.use("/images/sprite", express.static("dist/images/sprite"));
        app.use("/js", express.static("dist/js"));
        // Tell express to use the webpack-dev-middleware and use the webpack.config.js
        // configuration file as a base.
        var config = require("./dev.webpack.config.js");
        app.use(
            webpackDevMiddleware(webpack(config), {
                publicPath: config.output.publicPath
            })
        );
        app.use(favicon("src/favicon/index.ico"));
        // роутинг на наши страницы
        app.get("/*.*", function(req, res) {
            // регулярка для получения пути до шаблона
            // \ или \. . * ноль или более в конце строки $, g - все совпадения
            var regexp = /\/|\..*$/g;
            var fileName = req.url.replace(regexp, "") || "pages";
            res.render("src/pug/" + fileName, {});
        });
        // редирект на главную страницу
        app.get("/static", function(req, res) {
            res.redirect("/pages.html");
        });

        listener = app.listen(2999);
        port = listener.address().port;
    }

    if ((!flags.bs && flags.watch) || (!flags.bs && !flags.watch)) {
        return gulp
            .src(path.src.html)
            .pipe(plumber())
            .pipe(
                pug({
                    pretty: true,
                    cache: true,
                    locals: { minify: flags.minify }
                })
            )
            .pipe(gulp.dest(path.dist.html));
    }
});

// ===========================================
// tasks IMAGES
// ===========================================
gulp.task("images", function() {
    return gulp
        .src(path.src.images)
        .pipe(plumber())
        .pipe(gulpif(flags.bs, newer(path.dist.images)))
        .pipe(
            imagemin({
                progressive: true,
                svgoPlugins: [{ removeViewBox: false }],
                use: [pngquant()],
                interlaced: true
            })
        )
        .pipe(gulp.dest(path.dist.images))
        .pipe(gulpif(flags.watch, browserSync.stream()));
});
// ===========================================
// task temp images
// ===========================================
gulp.task("i", function() {
    return gulp
        .src(path.src.i)
        .pipe(plumber())
        .pipe(gulpif(flags.bs, newer(path.dist.i)))
        .pipe(gulp.dest(path.dist.i))
        .pipe(gulpif(flags.watch, browserSync.stream()));
});
// ===========================================
// task FONT
// ===========================================
gulp.task("fonts", function() {
    return gulp.src([path.src.fonts]).pipe(gulp.dest(path.dist.fonts));
});
// ===========================================
// webpackStream for production
// ===========================================
gulp.task("js:prod", function() {
    var webpackConfigProd = require("./prod.webpack.config.js");
    return gulp
        .src("./src/js/main.js")
        .pipe(webpackStream(webpackConfigProd, webpack))
        .pipe(gulp.dest(path.dist.js));
});
// webpackStream for development
// js:dev не нужен он запускается в ExpressJs
// ===========================================
// BrowserSync and settings
// ===========================================
var initBrowserSync = function() {
    return browserSync.init({
        // Customize the Browsersync console logging prefix
        logPrefix: "BrowserSync",
        // Sync viewports to TOP position
        scrollProportionally: true,
        //Открывать страницу в браузере по умолчанию
        open: true,
        // true включать изменения, false перезагрузка страницы
        injectChanges: false,
        //watch files ["app/css/style.css", "app/js/*.js"]
        files: [
            "./dist",
            "./src/pug/**/*",
            "./src/js/**/*",
            "./src/fonts",
            "./src/i",
            "./src/images"
        ],
        // Wait for 1 seconds before any browsers should try to inject/reload a file.
        // reloadDelay: 1000,
        // proxy на локальный сервер Express
        proxy: "http://localhost:" + port,
        startPath: "/static/",
        notify: false,
        tunnel: false,
        host: "localhost",
        port: port
    });
};

gulp.task("browser-sync", function() {
    if (flags.bs) {
        initBrowserSync();
    } else {
        console.log("===> Browser-Sync - OFF!");
    }
});
// ===========================================
// tasks ZIP Archive
// ===========================================
gulp.task("zipArchive", function() {
    return gulp
        .src("dist/**/*.*")
        .pipe(zip("archive.zip"))
        .pipe(gulp.dest("dist"));
});
// ===========================================
// tasks Watch
// ===========================================
gulp.task("watch", function() {
    if (flags.watch) {
        watch([path.watch.css], function() {
            gulp.start("sass");
        });
        // watch([path.watch.images], function(){
        //   gulp.start('images');
        // });
        // watch([path.watch.i], function(){
        //   gulp.start('i');
        // });
        // watch([path.watch.fonts], function(){
        //   gulp.start('fonts');
        // });
        // watch([path.watch.js], function(){
        //   // gulp.start('js-App');
        //   gulp.start('js:dev');
        // });
        watch([path.watch.sprites], function() {
            gulp.start("sprites");
        });
    } else {
        console.log("===> WATCHING - OFF!");
    }

    if (!flags.bs && flags.watch) {
        watch([path.watch.html], function() {
            gulp.start("pug");
        });
        watch([path.watch.js], function() {
            gulp.start("js:prod");
        });
    }
});
// ===========================================
// tasks
// ===========================================
// * runSequence
// * 'name-task' последовательно
// * [] параллейно
gulp.task("default", function() {
    runSequence(
        "clean-all",
        "isNoBs",
        ["sass", "images", "i", "sprites", "fonts", "js:prod"],
        "pug",
        "watch"
    );
});

// js:dev не нужен он запускается в ExpressJs
gulp.task("dev", function() {
    runSequence("clean-all", [
        "sass",
        "sprites",
        "pug",
        "watch",
        "browser-sync"
    ]);
});

gulp.task("minify", function() {
    runSequence("isMinify", "isNoBs", "isNoWatch", "default");
});

gulp.task("build", function() {
    runSequence("isNoBs", "isNoWatch", "default");
});

gulp.task("zip", function() {
    runSequence(
        "clean-all",
        "isNoBs",
        "isNoWatch",
        ["sass", "images", "i", "sprites", "fonts", "js:prod"],
        "pug",
        "zipArchive"
    );
});
