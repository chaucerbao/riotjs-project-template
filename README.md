# RiotJS Starter Kit

A front-end application structure for development with RiotJS in a Flux architecture.


## Getting started

Download and install the dependencies

```sh
git clone https://github.com/chaucerbao/riotjs-starter-kit.git
cd riotjs-starter-kit/
npm install
```


## Task runner targets

`npm run develop` compiles the source with source maps, watches for changes, and serves the site at `http://localhost:8080/`.

`npm run build` compiles the source and minifies the output for production use.

`npm run clean` cleans the public directory of all files.


## Directory Structure

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
```

`app/` contains site-wide scripts/styles and bootstrapping code, such as the router.

`modules/` contains reusable DOM elements, like sidebars or chat boxes.

`pages/` contains the application's pages, like the homepage or an "about us" page.

`stores/` contains Flux stores that respond to events from the dispatcher.
