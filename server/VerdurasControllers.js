const sqlite3 = require('sqlite3').verbose();

class VerdurasControllers {
    listVerduras(Database, callback) {
        Database.all('SELECT * FROM Verduras', (err, Verduras) => {
            err ? callback(err, null) : callback(null, Verduras);
        });
    }
    listOneVerdura(Database, IdVerdura, callback) {
        Database.get(`SELECT * FROM Verduras WHERE IdVerdura = ${IdVerdura}`, (err, Verdura) => {
            err ? callback(err, null) : callback(null, Verdura);
        });
    }
    createVerdura(Database, data) {
        const columns = Object.keys(data).join(', ');
        const values = Object.values(data).map(value => `'${value}'`).join(', ');
        Database.run(`INSERT INTO Verduras (${columns}) VALUES (${values})`, (err) => {
            err ? console.error(err.message) : console.log('Verdura insertada correctamente');
        });
    }
    deleteVerdura(Database, IdVerdura) {
        Database.run(`DELETE FROM Verduras WHERE IdVerdura = ${IdVerdura}`, (err) => {
            err ? console.error(err.message) : console.log('Verdura eliminada correctamente');
        });
    }
    updateVerdura(Database, data) {
        let consulta = '';
        let valoresActualizados = [];
        for (const key in data) {
            if (data.hasOwnProperty(key)) {
                consulta += `${key} = ?, `;
                valoresActualizados.push(data[key]);
            }
        }
        consulta = consulta.slice(0, -2);
        Database.run(`UPDATE Verduras SET ${consulta} WHERE IdVerdura = ${data.IdVerdura}`, valoresActualizados, (err) => {
            err ? console.error(err.message) : console.log('Se han actualizado los datos de la verdura');
        });
    }
}

module.exports = new VerdurasControllers();
