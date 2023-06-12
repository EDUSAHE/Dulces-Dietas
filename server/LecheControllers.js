const sqlite3 = require('sqlite3').verbose();

class LecheControllers {
    listLeche(Database, callback) {
        Database.all('SELECT * FROM Leche', (err, Leche) => {
            err ? callback(err, null) : callback(null, Leche);
        });
    }
    listOneLeche(Database, IdLeche, callback) {
        Database.get(`SELECT * FROM Leche WHERE IdLeche = ${IdLeche}`, (err, Leche) => {
            err ? callback(err, null) : callback(null, Leche);
        });
    }
    createLeche(Database, data) {
        const columns = Object.keys(data).join(', ');
        const values = Object.values(data).map(value => `'${value}'`).join(', ');
        Database.run(`INSERT INTO Leche (${columns}) VALUES (${values})`, (err) => {
            err ? console.error(err.message) : console.log('Leche insertada correctamente');
        });
    }
    deleteLeche(Database, IdLeche) {
        Database.run(`DELETE FROM Leche WHERE IdLeche = ${IdLeche}`, (err) => {
            err ? console.error(err.message) : console.log('Leche eliminada correctamente');
        });
    }
    updateLeche(Database, data) {
        let consulta = '';
        let valoresActualizados = [];
        for (const key in data) {
            if (data.hasOwnProperty(key)) {
                consulta += `${key} = ?, `;
                valoresActualizados.push(data[key]);
            }
        }
        consulta = consulta.slice(0, -2);
        Database.run(`UPDATE Leche SET ${consulta} WHERE IdLeche = ${data.IdLeche}`, valoresActualizados, (err) => {
            err ? console.error(err.message) : console.log('Se han actualizado los datos de la leche');
        });
    }
}

module.exports = new LecheControllers();
