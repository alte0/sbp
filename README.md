# Start build project (SBP)
#### Работа со сборщиком коротко:
```sh
  "scripts": {
    "start": "gulp",
    "dev": "gulp dev",
    "build": "gulp build",
    "zip": "gulp zip",
    "minify": "gulp minify"
  }
```
#### Рекомендация по разработке:
```sh
  npm start или gulp dev - быстрая сборка проекта
```
## Используемые технологии

* Менеджер пакетов и внешних зависимостей - [npm](https://www.npmjs.com)
* Автоматическая сборка - [Gulp](http://gulpjs.com)
* Препроцессор CSS - [Sass](http://sass-lang.com)
* Шаблонизатор HTML - [Pug(ex-Jade)](https://pugjs.org/)
* БЭМ-миксины для шаблонизатора Pug(ex-Jade) - [Bemto](https://github.com/kizu/bemto)
* Run webpack as a stream to conveniently integrate with gulp. - [Webpack-stream](https://github.com/shama/webpack-stream)
* Динамика - [JQuery](http://jquery.com)
* Slick - the last carousel you'll ever need - [slick](https://github.com/kenwheeler/slick)
* Дополнительная поддержка SVG - [svg4everybody](https://github.com/jonathantneal/svg4everybody)
* Спрайты - [gulp.spritesmith](https://github.com/twolfson/gulp.spritesmith)

## Структура проекта

```
SBP/
├── .git/
│   └── ...
├── dist/
│   └── ...
├── node_modules/
│   └── ...
├── src/
│   └── ...
├── .editorconfig
├── .gitignore
├── gulpfile.js
├── package.json
└── README.md
```

В папке *src* лежат все исходники проекта. Вся разработка ведется в этой папке.

Папки *dist* и *node_modules* являются результатами работы npm и сборщика. Файлы и папки из *dist* являются результатом.

Файл *package.json* содержит описание проекта в формате npm и все внешние зависимости, необходимые для работы.

В файле *gulpfile.js* содержатся правила для сборки проекта из исходников *src* в результат *dist*.


## Установка и сборка проекта

[Node.js](https://nodejs.org) **[(all releases)](https://nodejs.org/en/download/releases/)**.
```sh 
Рекомендуемая версия Node.js 8.x
```

#### Установите внешние зависимости
```sh
$ npm install или npm i
```
#### Работа со сборщиком
разработка с наблюдением за файлами
```sh
$ npm start или gulp
```
разработка с наблюдением за файлами с BrowserSync & Express
```sh
$ npm run dev или gulp dev
```
сборка для продакшена
```sh
$ npm run build или gulp build
```
сборка для продакшена с формированием архива
```sh
$ npm run zip или gulp zip
```
сборка для продакшена с перенесением стилей в тэг style
```sh
$ npm run minify или gulp minify
```

В результате создастся папка *dist*, в которой окажутся готовые для дальнейшего использования html-файлы.


## Для спрайтов
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
extend .icon.svg-arr-black;
```
где ```.icon``` обшее имя svg спрайтов, а ```arr-black``` это имя файла. 
Для ```:hover``` или ```:active``` в имени файла нужно указать ```~ (тильду)```, ппример: ```facebook~active.svg```

**Пример для symbol SVG спрайта:**
```<svg class="cloud"><use xlink:href="svg/symbols.svg#cloud-computing"></use></svg>``` где ```#cloud-computing``` имя файла svg

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

Все новые файлы должны появляться исключительно в папке *src/*. Отсюда их забирает сборщик и по правилам описанным в *gulpfile.js* формируется содержимое папки *dist/*.

Все шрифты попадают в папку *src/fonts/* с любой структурой внутри.

Все контентные картинки (временные) попадают в папку *src/i/* с любой структурой внутри. Картинки в этой папке не будут оптимизироваться сборщиком. Сюда следует сладывать все временные картинки, которых потом не будет на сайте.

Все картинки дизайна попадают в папку *src/images/* с любой структурой внутри. Картинки в этой папке будут оптимизироваться сборщиком. Сюда следует складывать все постоянные картинки(логотипы, иконки, фоны и тд).

Все исходники html хранятся и редактируется в папке *src/pug/*. Все вложения должны попадать в папку *src/pug/components/*.

Весь js попадает в папку *src/js/components/*. Все внешние js-библиотеки необходимо устанавливать через npm и импортировать в соответствующем компоненте.

Все исходники css хранятся и редактируются в папке *src/scss/components/*.

* * *
