const sqlite3 = require('sqlite3').verbose();

class HistorialClinicoController {
    // Lista todos los registros de HistorialClinico
    listHistorialClinico(database, callback) {
        database.all('SELECT * FROM HistorialClinico', (err, historialClinico) => {
        if (err) {
            callback(err, null);
        } else {
            callback(null, historialClinico);
        }
        });
    }

    // Lista un registro de HistorialClinico basándose en el IdHistorialClinico
    listOneHistorialClinico(database, idHistorialClinico, callback) {
        database.get(`SELECT * FROM HistorialClinico WHERE IdHistorialClinico = ${idHistorialClinico}`, (err, historialClinico) => {
        if (err) {
            callback(err, null);
        } else {
            callback(null, historialClinico);
        }
        });
    }

    // Crea un registro de HistorialClinico
    createHistorialClinico(database, data, callback) {
        const columns = Object.keys(data).join(', ');
        const values = Object.values(data).map(value => `'${value}'`).join(', ');
        database.run(`INSERT INTO HistorialClinico (${columns}) VALUES (${values})`, (err) => {
        if (err) {
            callback(err);
        } else {
            callback(null);
        }
        });
    }

    // Elimina un registro de HistorialClinico con  el IdHistorialClinico
    deleteHistorialClinico(database, idHistorialClinico, callback) {
        database.run(`DELETE FROM HistorialClinico WHERE IdHistorialClinico = ${idHistorialClinico}`, (err) => {
        if (err) {
            callback(err);
        } else {
            callback(null);
        }
        });
    }

    // Actualiza un registro de HistorialClinico
    updateHistorialClinico(database, data, callback) {
        let consulta = '';
        let valoresActualizados = [];
        for (const key in data) {
        if (data.hasOwnProperty(key)) {
            consulta += `${key} = ?, `;
            valoresActualizados.push(data[key]);
        }
        }
        consulta = consulta.slice(0, -2);
        const query = `UPDATE HistorialClinico SET ${consulta} WHERE IdHistorialClinico = ${data.IdHistorialClinico}`;
        database.run(query, valoresActualizados, (err) => {
        if (err) {
            callback(err);
        } else {
            callback(null);
        }
        });
    }
}

module.exports = new HistorialClinicoController();
