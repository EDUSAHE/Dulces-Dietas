const sqlite3 = require('sqlite3').verbose();

class AzucaresControllers {
    listAzucares(Database, callback) {
        Database.all('SELECT * FROM Azucares', (err, Azucares) => {
            err ? callback(err, null) : callback(null, Azucares);
        });
    }
    listOneAzucar(Database, IdAzucar, callback) {
        Database.get(`SELECT * FROM Azucares WHERE IdAzucar = ${IdAzucar}`, (err, Azucar) => {
            err ? callback(err, null) : callback(null, Azucar);
        });
    }
    createAzucar(Database, data) {
        const columns = Object.keys(data).join(', ');
        const values = Object.values(data).map(value => `'${value}'`).join(', ');
        Database.run(`INSERT INTO Azucares (${columns}) VALUES (${values})`, (err) => {
            err ? console.error(err.message) : console.log('Azúcar insertado correctamente');
        });
    }
    deleteAzucar(Database, IdAzucar) {
        Database.run(`DELETE FROM Azucares WHERE IdAzucar = ${IdAzucar}`, (err) => {
            err ? console.error(err.message) : console.log('Azúcar eliminado correctamente');
        });
    }
    updateAzucar(Database, data) {
        let consulta = '';
        let valoresActualizados = [];
        for (const key in data) {
            if (data.hasOwnProperty(key)) {
                consulta += `${key} = ?, `;
                valoresActualizados.push(data[key]);
            }
        }
        consulta = consulta.slice(0, -2);
        Database.run(`UPDATE Azucares SET ${consulta} WHERE IdAzucar = ${data.IdAzucar}`, valoresActualizados, (err) => {
            err ? console.error(err.message) : console.log('Se han actualizado los datos del azúcar');
        });
    }
}

module.exports = new AzucaresControllers();
