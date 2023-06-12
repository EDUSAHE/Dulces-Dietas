const sqlite3 = require('sqlite3').verbose();

class AceitesyGrasasControllers {
    
    listAceitesyGrasas(Database, callback) {
        Database.all('SELECT * FROM AceitesyGrasas', (err, AceitesyGrasas) => {
            err ? callback(err, null) : callback(null, AceitesyGrasas);
        });
    }
    listOneAceiteyGrasa(Database, IdAceiteyGrasa, callback) {
        Database.get(`SELECT * FROM AceitesyGrasas WHERE IdAceiteyGrasa = ${IdAceiteyGrasa}`, (err, AceiteyGrasa) => {
            err ? callback(err, null) : callback(null, AceiteyGrasa);
        });
    }
    createAceiteyGrasa(Database, data) {
        const columns = Object.keys(data).join(', ');
        const values = Object.values(data).map(value => `'${value}'`).join(', ');
        Database.run(`INSERT INTO AceitesyGrasas (${columns}) VALUES (${values})`, (err) => {
            err ? console.error(err.message) : console.log('Aceite y grasa insertados correctamente');
        });
    }
    deleteAceiteyGrasa(Database, IdAceiteyGrasa) {
        Database.run(`DELETE FROM AceitesyGrasas WHERE IdAceiteyGrasa = ${IdAceiteyGrasa}`, (err) => {
            err ? console.error(err.message) : console.log('Aceite y grasa eliminados correctamente');
        });
    }
    updateAceiteyGrasa(Database, data) {
        let consulta = '';
        let valoresActualizados = [];
        for (const key in data) {
            if (data.hasOwnProperty(key)) {
                consulta += `${key} = ?, `;
                valoresActualizados.push(data[key]);
            }
        }
        consulta = consulta.slice(0, -2);
        Database.run(`UPDATE AceitesyGrasas SET ${consulta} WHERE IdAceiteyGrasa = ${data.IdAceiteyGrasa}`, valoresActualizados, (err) => {
            err ? console.error(err.message) : console.log('Se han actualizado los datos del aceite y grasa');
        });
    }
}

module.exports = new AceitesyGrasasControllers();
