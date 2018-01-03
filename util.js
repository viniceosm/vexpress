const fs = require("fs");
const f = {
    alteraLinhasArquivo: (nomeArquivo, retornoModifica) => {
        return new Promise((resolve, reject) => {
            let linesSave, stream = fs.createReadStream(nomeArquivo);
            stream.on('data', (lines) => {
                linesSave = retornoModifica(lines.toString().split('\n'));
            });
            stream.on('end', () => {
                fs.writeFile(nomeArquivo, linesSave.join('\n'), () => resolve());
            });
        });
    }
}

module.exports = f;