const sqlite3 = require('sqlite3').verbose();

class CerealesControllers {
    listCereales(Database, callback) {
        Database.all('SELECT * FROM Cereales', (err, Cereales) => {
            err ? callback(err, null) : callback(null, Cereales);
        });
    }
    listOneCereal(Database, IdCereal, callback) {
        Database.get(`SELECT * FROM Cereales WHERE IdCereal = ${IdCereal}`, (err, Cereal) => {
            err ? callback(err, null) : callback(null, Cereal);
        });
    }
    createCereal(Database, data) {
        const columns = Object.keys(data).join(', ');
        const values = Object.values(data).map(value => `'${value}'`).join(', ');
        Database.run(`INSERT INTO Cereales (${columns}) VALUES (${values})`, (err) => {
            err ? console.error(err.message) : console.log('Cereal insertado correctamente');
        });
    }
    deleteCereal(Database, IdCereal) {
        Database.run(`DELETE FROM Cereales WHERE IdCereal = ${IdCereal}`, (err) => {
            err ? console.error(err.message) : console.log('Cereal eliminado correctamente');
        });
    }
    updateCereal(Database, data) {
        let consulta = '';
        let valoresActualizados = [];
        for (const key in data) {
            if (data.hasOwnProperty(key)) {
                consulta += `${key} = ?, `;
                valoresActualizados.push(data[key]);
            }
        }
        consulta = consulta.slice(0, -2);
        Database.run(`UPDATE Cereales SET ${consulta} WHERE IdCereal = ${data.IdCereal}`, valoresActualizados, (err) => {
            err ? console.error(err.message) : console.log('Se han actualizado los datos del cereal');
        });
    }
}

module.exports = new CerealesControllers();
