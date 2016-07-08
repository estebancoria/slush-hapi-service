# slush-hapi-service
Slush generator for creating the foundation of a HapiJS service/webapp. With the original GEUT style.

___

## Install

```bash 
$ npm i -g slush-hapí-service
```

## Usage

Create your project folder:
```bash 
mkdir my_hapi_service && cd my_hapi_service
```

And then, run the slush generator inside your project folder:
```bash 
slush hapi-service
```

That's all. The generator will ask some questions, like if you are using a prefix for your projects (scopes are better, but you know).

## What's inside?

The generated project contains:

- ```.eslintrc.js``` --> contains the hapi styleguide eslint rules
- Dependencies: 
  - ```vision``` --> Template rendering support (plugin)
  - ```blipp``` --> Shows plugin routes in console
  - ```handlebars``` --> A simple template engine
  - ```boom``` --> HTTP error codes
  - ```confidence``` --> Project configuration management

### Project Structure

```bash

├── config
│   ├── demo_config
│   ├── general.js
│   ├── hapi_config
│   └── index.js
├── index.js
├── methods
│   └── index.js
├── plugins
│   └── index.js
├── routes
│   ├── demo
│   └── index.js
├── test
│   └── index.js
└── views

```

___

:D
