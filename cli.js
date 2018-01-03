#!/usr/bin/env node

const util = require('./util');
const fs = require("fs");
const fse = require('fs-extra');

let args = process.argv;
let app_name = args[2];

let arquivosAlterar = [
    'libs/connect-db.js',
    'libs/varGlobal.js',
    'package.json',
    'README.md'
]

fse.copy(__dirname + '/template', './' + app_name, (err) => {
    if (err) {
        throw err;
    } else {
        arquivosAlterar.forEach(arquivo => {
            util.alteraLinhasArquivo('./' + app_name + '/' + arquivo, (lines) => {
                return lines.map((line, i) => {
                    return line.replace(new RegExp('APP_NAME', 'g'), app_name);
                });
            });
        });
    }
});