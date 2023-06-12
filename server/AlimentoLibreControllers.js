const sqlite3 = require('sqlite3').verbose();

class AlimentoLibreControllers {
    listAlimentoLibre(Database, callback) {
        Database.all('SELECT * FROM AlimentoLibre', (err, AlimentoLibre) => {
            err ? callback(err, null) : callback(null, AlimentoLibre);
        });
    }
    listOneAlimentoLibre(Database, IdAlimentoLibre, callback) {
        Database.get(`SELECT * FROM AlimentoLibre WHERE IdAlimentoLibre = ${IdAlimentoLibre}`, (err, AlimentoLibre) => {
            err ? callback(err, null) : callback(null, AlimentoLibre);
        });
    }
    createAlimentoLibre(Database, data) {
        const columns = Object.keys(data).join(', ');
        const values = Object.values(data).map(value => `'${value}'`).join(', ');
        Database.run(`INSERT INTO AlimentoLibre (${columns}) VALUES (${values})`, (err) => {
            err ? console.error(err.message) : console.log('Alimento libre insertado correctamente');
        });
    }
    deleteAlimentoLibre(Database, IdAlimentoLibre) {
        Database.run(`DELETE FROM AlimentoLibre WHERE IdAlimentoLibre = ${IdAlimentoLibre}`, (err) => {
            err ? console.error(err.message) : console.log('Alimento libre eliminado correctamente');
        });
    }
    updateAlimentoLibre(Database, data) {
        let consulta = '';
        let valoresActualizados = [];
        for (const key in data) {
            if (data.hasOwnProperty(key)) {
                consulta += `${key} = ?, `;
                valoresActualizados.push(data[key]);
            }
        }
        consulta = consulta.slice(0, -2);
        Database.run(`UPDATE AlimentoLibre SET ${consulta} WHERE IdAlimentoLibre = ${data.IdAlimentoLibre}`, valoresActualizados, (err) => {
            err ? console.error(err.message) : console.log('Se han actualizado los datos del alimento libre');
        });
    }
}

module.exports = new AlimentoLibreControllers();
