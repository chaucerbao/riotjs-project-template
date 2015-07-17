# RiotJS Starter Kit

A front-end application structure for development with [RiotJS] in a Flux architecture.


## Getting started

Download and install the dependencies

```sh
$ git clone https://github.com/chaucerbao/riotjs-starter-kit.git
$ cd riotjs-starter-kit/
$ npm install
```


## Running tasks

### Development
```sh
$ npm run develop
```
Compiles the source with source maps, watches for changes, and serves the site at [http://localhost:8080/](http://localhost:8080/).

### Production
```sh
$ npm run build
```
Compiles the source and minifies the output for production use.

### Clean
```sh
$ npm run clean
```
Cleans the public directory of all files.

### Test
```sh
$ npm test
```
Runs the test suite against the application.


## Directory structure

```
src/
├─ app/
│  ├─ style/
│  │  ┊
│  │  ├─ _settings.scss
│  │  └─ index.scss
│  ├─ index.js
│  └─ router.js
│
├─ lib/
│  ┊
│  └─ library.js
│
├─ modules/
│  ┊
│  └─ module/
│     ├─ index.tag
│     └─ style.scss
│
├─ pages/
│  ┊
│  └─ page/
│     ├─ index.tag
│     └─ style.scss
│
├─ stores/
│  ┊
│  └─ store.js
│
└─ index.html

test/
├─ app/
│  ┊
│  ├─ index.spec.js
│  └─ router.spec.js
│
├─ lib/
│  ┊
│  └─ library.spec.js
│
├─ modules/
│  ┊
│  └─ module.spec.js
│
├─ pages/
│  ┊
│  └─ page.spec.js
│
└─ stores/
   ┊
   └─ store.spec.js
```

### Usage
`app/` contains site-wide scripts/styles and bootstrapping code, such as the router.

`lib/` contains libraries that can be shared across the project.

`modules/` contains reusable DOM elements, like sidebars or chat boxes.

`pages/` contains the application's pages, like the homepage or an "about us" page.

`stores/` contains Flux stores that respond to events from the dispatcher.


### Tools
Development:

* [RiotJS]
* [RiotControl]
* [Sass]
* [Babel]

Testing:

* [Mocha]
* [Chai]
* [Sinon.JS]

Misc:

* [Karma]
* [Webpack]


[Babel]: https://babeljs.io/
[Chai]: http://chaijs.com/
[Karma]: https://karma-runner.github.io/
[Mocha]: http://mochajs.org/
[RiotControl]: https://github.com/jimsparkman/RiotControl
[RiotJS]: https://muut.com/riotjs/
[Sass]: http://sass-lang.com/
[Sinon.JS]: http://sinonjs.org/
[Webpack]: http://webpack.github.io/
