#!/usr/bin/env node

const util = require('./util');
const fs = require("fs");
const fse = require('fs-extra');
const path = require('path');
const { exec } = require('child_process');

let args = process.argv;
let app_name = args[2];

let arquivosAlterar = [
    'libs/connect-db.js',
    'libs/varGlobal.js',
    'package.json',
    'README.md'
]

const copiaArquivos = () => {
    return new Promise((resolve, reject) => {
        fse.copy(path.join(__dirname, 'template'), path.join('./', app_name), (err) => {
            if (err) {
                throw err;
            } else {
                arquivosAlterar.forEach(arquivo => {
                    util.alteraLinhasArquivo(path.join('./', app_name, arquivo), (lines) => {
                        return lines.map((line, i) => {
                            return line.replace(new RegExp('APP_NAME', 'g'), app_name);
                        });
                    })
                        .then(resolve());
                });
            }
        });
    });
};

copiaArquivos().then(() => {
    console.log('Diretório criado.');
    console.log('Adicionando pacotes...');
    exec(`cd ${app_name}; npm i; cd ..`, (err, stdout, stderr) => {
        if (err) {
            console.error(`exec error: ${err}`);
            return;
        }

        console.log(`${stdout}`);
        console.log(`${stderr}`);

        console.log('Pacotes adicionados.');
    });
});