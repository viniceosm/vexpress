const express = require('express');
let router = express.Router();

const sessions = require('express-session');
const cookieParser = require('cookie-parser');
const KEY = 'chaaaaaaaaaaaave';
const SECRET = 'seeeeeeeeeeeegredoo';
const cookie = cookieParser(SECRET);
let store = new sessions.MemoryStore();
const varGlobal = require('./../libs/varGlobal');
let funcoes = require('./../util/util');

let sessionMiddleware = sessions({
	secret: SECRET,
	name: KEY,
	resave: true,
	saveUninitialized: true,
	store: store
});

router.use(cookie);
router.use(sessionMiddleware);

const cUsuarios = require('./../mongo/controller/usuarios');
const cPosts = require('./../mongo/controller/posts');

router.get('/', (req, res) => {
	let session = req.session;
	if (!session.exist) {
		res.redirect('/login');
	} else {
		cUsuarios.pesquisarPorId(session._id, (usuario) => {
			res.render('home', {
				title: varGlobal.tituloPagina,
				usuario
			});
		});
	}
});

router.get('/login', (req, res) => {
	res.render('index', { title: varGlobal.tituloPagina});
});

router.get('/cadastro', (req, res) => {
	res.render('cadastro', { title: varGlobal.tituloPagina });
});

router.post('/logar', (req, res) => {
	let campos = req.body;
	cUsuarios.logar({nome:campos.nome, senha:campos.senha}, (valido, usuario) => {
		if (valido) {
			let session = req.session;
			session.exist = true;
			session._id = usuario._id;
			res.redirect('/logando');
		} else {
			res.redirect('/');
		}
	});
});

router.get('/logando', (req, res) => {
	let session = req.session;
	if (session.exist) {
		res.redirect('/');
	} else {
		res.redirect('/login');
	}
});

router.get('/sair', (req, res) => {
	req.session.destroy(() => res.redirect('/login'));
});

router.post('/cadastrar', (req, res) => {
	let campos = req.body;
	cUsuarios.criar({nome:campos.nome, senha:campos.senha}, () => {
		res.redirect('/');
	});
});

module.exports = {
	router,
	sessionMiddleware
};
