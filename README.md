# Start build project (SBP)
#### Работа со сборщиком коротко:
~~*Установить gulp-cli: npm i -g gulp-cli*~~  не нужно с 2.2 v.
С версии 3.0.0 полностью переделана сборка.
*Установить зависимости: npm i*

```sh
  "scripts": {
    "start": "npx gulp",
    "sbp:dev": "npx gulp dev",
    "sbp:build": "npx gulp build",
    "sbp:zip": "npx gulp zip",
    "sbp:minify": "npx gulp minify",
    "sbp:stylelint": "npx stylelint \"src/scss/**/*.scss\" --syntax scss",
    "sbp:eslint": "npx eslint src/js/components/ src/js/main.js"
  }
```
#### Рекомендация по разработке:
```sh
  npm run sbp:dev или npx gulp dev - быстрая сборка проекта
```
#### Поддержка браузеров:

  [Global coverage: 92.01%](https://browserl.ist/?q=%22last+4+versions%22%2C+%22not+ie+%3C%3D10%22%2C+%22Firefox+ESR%22)

#### Используемые технологии

* Менеджер пакетов и внешних зависимостей - [npm](https://www.npmjs.com)
* Git hooks - [husky](https://github.com/typicode/husky)
* Автоматическая сборка - [Gulp 4](http://gulpjs.com)
* Препроцессор CSS - [Sass](http://sass-lang.com)
* Шаблонизатор HTML - [PostHTML](https://posthtml.org/)
* БЭМ-миксины для шаблонизатора - [posthtml-bem](https://github.com/rajdee/posthtml-bem)
* Run webpack as a stream to conveniently integrate with gulp. - [Webpack-stream](https://github.com/shama/webpack-stream)
* ECMAScript 6+, config - [eslint-config-airbnb-base](https://github.com/airbnb/javascript/tree/master/packages/eslint-config-airbnb-base), [Airbnb's style guide.](https://github.com/airbnb/javascript)
* Спрайты - [gulp.spritesmith](https://github.com/twolfson/gulp.spritesmith)
* svg symbol - [gulp-svg-symbols](https://github.com/Hiswe/gulp-svg-symbols)
* Дополнительная поддержка SVG - [svg4everybody](https://github.com/jonathantneal/svg4everybody)


### Структура проекта

```
SBP/
├── .git/
│   └── ...
├── build/
│   └── ...
├── node_modules/
│   └── ...
├── sbp-config/
│   └── ...
├── src/
│   └── ...
├── .babelrc
├── .editorconfig
├── .eslintrc
├── .gitignore
├── .huskyrc
├── .stylelintrc.json
├── common.webpack.config.js
├── dev.webpack.config.js
├── prod.webpack.config.js
├── gulpfile.babel.js
├── package.json
└── README.md
```

В папке *src* лежат все исходники проекта. Вся разработка ведется в этой папке.

Папки *build* и *node_modules* являются результатами работы npm и сборщика. Файлы и папки из *dist* являются результатом.

Файл *package.json* содержит описание проекта в формате npm и все внешние зависимости, необходимые для работы.

В файле *gulpfile.babel.js* содержатся правила для сборки проекта из исходников *src* в результат *build*.


### Установка и сборка проекта

[Node.js](https://nodejs.org) **[(all releases)](https://nodejs.org/en/download/releases/)**.
```sh 
"engines": {
    "node": ">= 10.19.0",
    "npm": ">= 6.13.4"
  }
```

### Установите внешние зависимости
```sh
$ npm install или npm i
```
### Работа со сборщиком
разработка с наблюдением за файлами
```sh
$ npm start или npx gulp
```
разработка с наблюдением за файлами с BrowserSync
```sh
$ npm run sbp:dev или npx gulp dev
```
сборка для продакшена
```sh
$ npm run sbp:prod или npx gulp build
```
сборка для продакшена с формированием архива
```sh
$ npm run sbp:zip или npx gulp zip
```
<!-- сборка для продакшена с перенесением стилей в тэг style
```sh
$ npm run sbp:minify или npx gulp minify
``` -->

В результате создастся папка *build*, в которой окажутся готовые для дальнейшего использования html-файлы.


### Для спрайтов
**Пример для одиночного спрайта на scss:**
```sh
@include sprite($example-1);
```
где ```$example-1``` имя файла: ```example-1.png``` .

**Пример для ретина спрайта:**
```sh
@include retina-sprite($example-1-group);
```
где ```$example-1-group``` имя группы файлов: ```example-1.png```, ```example-1@2x.png``` .

**Пример для SVG спрайта:**
```sh
.icon.svg-arr-black;
```
где ```.icon``` обшее имя svg спрайтов, а ```arr-black``` это имя файла. 
Для ```:hover``` или ```:active``` в имени файла нужно указать ```~ (тильду)```, ппример: ```facebook~active.svg```

**Пример для symbol SVG спрайта:**
```<svg class="cloud"><use xlink:href="symbol-svg/svg-symbols.svg#cloud-computing"></use></svg>``` где ```#cloud-computing``` имя файла svg

## Общие принципы работы

```
├── src/
│   ├── fonts/
│   ├── i/
│   ├── images/
│   ├── sprites-png/
│   ├── js/
│   ├── pug/
│   └── scss/
```

Все новые файлы должны появляться исключительно в папке *src/*. Отсюда их забирает сборщик и по правилам описанным в *gulpfile.babel.js*.

Все шрифты попадают в папку *src/fonts/* с любой структурой внутри.

Все контентные картинки (временные) попадают в папку *src/i/* с любой структурой внутри. Картинки в этой папке не будут оптимизироваться сборщиком. Сюда следует сладывать все временные картинки, которых потом не будет на сайте.

Все картинки дизайна попадают в папку *src/images/* с любой структурой внутри. Картинки в этой папке будут оптимизироваться сборщиком. Сюда следует складывать все постоянные картинки(логотипы, иконки, фоны и тд).

Все исходники html хранятся и редактируется в папке *src/html/*. Все вложения должны попадать в папку *src/html/blocks/*.

Все исходники scss хранятся и редактируется в папке *src/scss/*. Все вложения должны попадать в папку *src/css/blocks/*.

Весь js попадает в папку *src/js/components/*. Все внешние js-библиотеки необходимо устанавливать через npm и импортировать в соответствующем компоненте.

Все исходники css хранятся и редактируются в папке *src/scss/components/*.

* * *
