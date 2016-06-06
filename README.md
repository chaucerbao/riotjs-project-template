# RiotJS Project Template
A project template for building a web application with RiotJS

**Features**
* Small footprint. RiotJS is the only required dependency.
* Low overhead. "Framework" is simple to understand.
* Efficient routing. Load pages on demand rather than all at once.
* Ensure code quality. Lint and test upon save during development.

## Getting Started
Install the dependencies
```
$ npm install
```

## Development

### Preview
Compile the source code and wait for changes, view the site at [http://localhost:8080/](http://localhost:8080/)
```
$ npm start
```

### Testing
Run the test suite against the source code
```
$ npm test
```

Run the test suite against the source code and wait for changes
```
$ npm run test:watch
```

### Production
Compile the source code, then minify and compress the result
```
$ npm run build
```

### Clean
Remove the */public/* directory containing the compiled code
```
$ npm run clean
```

### Directory structure
`/application/` contains the entry tag for the application

`/modules/` contains reusable tags for constructing a page, like a footer

`/pages/` contains tags which are pages the router can load, like the homepage

`/store/` contains the application's state and available actions
