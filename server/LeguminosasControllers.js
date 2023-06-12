const sqlite3 = require('sqlite3').verbose();

class LeguminosasControllers {
    listLeguminosas(Database, callback) {
        Database.all('SELECT * FROM Leguminosas', (err, Leguminosas) => {
            err ? callback(err, null) : callback(null, Leguminosas);
        });
    }
    listOneLeguminosa(Database, IdLeguminosa, callback) {
        Database.get(`SELECT * FROM Leguminosas WHERE IdLeguminosa = ${IdLeguminosa}`, (err, Leguminosa) => {
            err ? callback(err, null) : callback(null, Leguminosa);
        });
    }
    createLeguminosa(Database, data) {
        const columns = Object.keys(data).join(', ');
        const values = Object.values(data).map(value => `'${value}'`).join(', ');
        Database.run(`INSERT INTO Leguminosas (${columns}) VALUES (${values})`, (err) => {
            err ? console.error(err.message) : console.log('Leguminosa insertada correctamente');
        });
    }
    deleteLeguminosa(Database, IdLeguminosa) {
        Database.run(`DELETE FROM Leguminosas WHERE IdLeguminosa = ${IdLeguminosa}`, (err) => {
            err ? console.error(err.message) : console.log('Leguminosa eliminada correctamente');
        });
    }
    updateLeguminosa(Database, data) {
        let consulta = '';
        let valoresActualizados = [];
        for (const key in data) {
            if (data.hasOwnProperty(key)) {
                consulta += `${key} = ?, `;
                valoresActualizados.push(data[key]);
            }
        }
        consulta = consulta.slice(0, -2);
        Database.run(`UPDATE Leguminosas SET ${consulta} WHERE IdLeguminosa = ${data.IdLeguminosa}`, valoresActualizados, (err) => {
            err ? console.error(err.message) : console.log('Se han actualizado los datos de la leguminosa');
        });
    }
}

module.exports = new LeguminosasControllers();
