# vexpress

Criar um app inicial com [express](http://expressjs.com/pt-br/) e alguns outros pacotes ([body-parser](https://github.com/expressjs/body-parser), [bootstrap](https://getbootstrap.com/docs/3.3/), [cookie-parser](https://github.com/expressjs/cookie-parser), [express-myconnection](https://github.com/pwalczyszyn/express-myconnection), [express-session](https://github.com/expressjs/session), [jade/pug](https://github.com/pugjs/pug), [mongoose](http://mongoosejs.com/), [multiparty](https://github.com/pillarjs/multiparty) e [socket.io](https://socket.io/))

## Instalação

```
npm install -g vexpress
```

## Como usar

```
vexpress [seu app node]
```
## Estrutura

```
libs
└── connect-db.js
└── varGlobal.js
mongo
└── controller
	└── usuarios.js
└── models
	└── usuarios.js
public
└── css
	└── bootstrap.min.css
    └── demo.css
    └── master.css
    └── material-kit.css
    └── material-kit.css.map
└── img
└── js
    └── bootstrap-min.js
    └── jquery.min.js
    └── master.js
    └── material-kit.js
    └── material-min.js
routes
└── index.js
util
└── util.js
views
└── head.jade
└── home.jade
└── index.jade
└── navbar.jade
└── notFound.jade
└── testLogado.jade
app.js
package-lock.json
package.json
README.md
```
