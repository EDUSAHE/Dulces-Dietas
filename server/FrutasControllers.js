const sqlite3 = require('sqlite3').verbose();

class FrutasControllers {
    listFrutas(Database, callback) {
        Database.all('SELECT * FROM Frutas', (err, Frutas) => {
            err ? callback(err, null) : callback(null, Frutas);
        });
    }
    listOneFruta(Database, IdFruta, callback) {
        Database.get(`SELECT * FROM Frutas WHERE IdFruta = ${IdFruta}`, (err, Fruta) => {
            err ? callback(err, null) : callback(null, Fruta);
        });
    }
    createFruta(Database, data) {
        const columns = Object.keys(data).join(', ');
        const values = Object.values(data).map(value => `'${value}'`).join(', ');
        Database.run(`INSERT INTO Frutas (${columns}) VALUES (${values})`, (err) => {
            err ? console.error(err.message) : console.log('Fruta insertada correctamente');
        });
    }
    deleteFruta(Database, IdFruta) {
        Database.run(`DELETE FROM Frutas WHERE IdFruta = ${IdFruta}`, (err) => {
            err ? console.error(err.message) : console.log('Fruta eliminada correctamente');
        });
    }
    updateFruta(Database, data) {
        let consulta = '';
        let valoresActualizados = [];
        for (const key in data) {
            if (data.hasOwnProperty(key)) {
                consulta += `${key} = ?, `;
                valoresActualizados.push(data[key]);
            }
        }
        consulta = consulta.slice(0, -2);
        Database.run(`UPDATE Frutas SET ${consulta} WHERE IdFruta = ${data.IdFruta}`, valoresActualizados, (err) => {
            err ? console.error(err.message) : console.log('Se han actualizado los datos de la fruta');
        });
    }
}

module.exports = new FrutasControllers();
