## Create-app

This is a rough template for building an app creator. It loosly follows ["Clean Architecture"](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html) as the key design pattern.

![Clean Architecture](https://blog.cleancoder.com/uncle-bob/images/2012-08-13-the-clean-architecture/CleanArchitecture.jpg)

### App structure

Below is the rough structure of the application:

```
src
├── application
│   ├── templates
│   │   └── react
│   │       ├── App.js
│   │       ├── dist
│   │       │   └── index.html
│   │       ├── index.css
│   │       └── index.js
│   └── use-cases
│       └── createFrontendApp.js
├── domain
│   └── App.js
├── frameworks
│   ├── cli
│   │   ├── exec-create-command.js
│   │   └── index.js
│   ├── config
│   │   ├── bootstrap.js
│   │   └── environment.js
│   ├── exec-async
│   │   └── index.js
│   └── services
│       ├── AppCreateService.js
│       ├── ReactAppCreateService.js
│       ├── TemplateInstaller.js
│       └── webpack-config
│           ├── WebpackConfigManager.js
│           └── config
│               └── webpack.config.js.template
├── index.js
└── interface-adapters
    └── commands
        ├── BaseCommand.js
        ├── CreateFrontEndAppCommand.js
        └── CreateNextJsApp.js
```

### Usage

To create a new app run:

```sh
$ yarn install
$ ./bin/create-app create
```
