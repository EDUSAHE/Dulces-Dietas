const sqlite3 = require('sqlite3').verbose();

class BebidasAlcoholicasControllers {
    listBebidasAlcoholicas(Database, callback) {
        Database.all('SELECT * FROM BebidasAlcoholicas', (err, BebidasAlcoholicas) => {
            err ? callback(err, null) : callback(null, BebidasAlcoholicas);
        });
    }
    listOneBebidaAlcoholica(Database, IdBebidaAlcoholica, callback) {
        Database.get(`SELECT * FROM BebidasAlcoholicas WHERE IdBebidaAlcoholica = ${IdBebidaAlcoholica}`, (err, BebidaAlcoholica) => {
            err ? callback(err, null) : callback(null, BebidaAlcoholica);
        });
    }
    createBebidaAlcoholica(Database, data) {
        const columns = Object.keys(data).join(', ');
        const values = Object.values(data).map(value => `'${value}'`).join(', ');
        Database.run(`INSERT INTO BebidasAlcoholicas (${columns}) VALUES (${values})`, (err) => {
            err ? console.error(err.message) : console.log('Bebida alcohólica insertada correctamente');
        });
    }
    deleteBebidaAlcoholica(Database, IdBebidaAlcoholica) {
        Database.run(`DELETE FROM BebidasAlcoholicas WHERE IdBebidaAlcoholica = ${IdBebidaAlcoholica}`, (err) => {
            err ? console.error(err.message) : console.log('Bebida alcohólica eliminada correctamente');
        });
    }
    updateBebidaAlcoholica(Database, data) {
        let consulta = '';
        let valoresActualizados = [];
        for (const key in data) {
            if (data.hasOwnProperty(key)) {
                consulta += `${key} = ?, `;
                valoresActualizados.push(data[key]);
            }
        }
        consulta = consulta.slice(0, -2);
        Database.run(`UPDATE BebidasAlcoholicas SET ${consulta} WHERE IdBebidaAlcoholica = ${data.IdBebidaAlcoholica}`, valoresActualizados, (err) => {
            err ? console.error(err.message) : console.log('Se han actualizado los datos de la bebida alcohólica');
        });
    }
}

module.exports = new BebidasAlcoholicasControllers();
