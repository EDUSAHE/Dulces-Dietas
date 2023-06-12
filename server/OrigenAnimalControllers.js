const sqlite3 = require('sqlite3').verbose();

class OrigenAnimalControllers {
    listOrigenAnimal(Database, callback) {
        Database.all('SELECT * FROM OrigenAnimal', (err, OrigenAnimal) => {
            err ? callback(err, null) : callback(null, OrigenAnimal);
        });
    }
    listOneOrigenAnimal(Database, IdOrigenAnimal, callback) {
        Database.get(`SELECT * FROM OrigenAnimal WHERE IdOrigenAnimal = ${IdOrigenAnimal}`, (err, OrigenAnimal) => {
            err ? callback(err, null) : callback(null, OrigenAnimal);
        });
    }
    createOrigenAnimal(Database, data) {
        const columns = Object.keys(data).join(', ');
        const values = Object.values(data).map(value => `'${value}'`).join(', ');
        Database.run(`INSERT INTO OrigenAnimal (${columns}) VALUES (${values})`, (err) => {
            err ? console.error(err.message) : console.log('Origen animal insertado correctamente');
        });
    }
    deleteOrigenAnimal(Database, IdOrigenAnimal) {
        Database.run(`DELETE FROM OrigenAnimal WHERE IdOrigenAnimal = ${IdOrigenAnimal}`, (err) => {
            err ? console.error(err.message) : console.log('Origen animal eliminado correctamente');
        });
    }
    updateOrigenAnimal(Database, data) {
        let consulta = '';
        let valoresActualizados = [];
        for (const key in data) {
            if (data.hasOwnProperty(key)) {
                consulta += `${key} = ?, `;
                valoresActualizados.push(data[key]);
            }
        }
        consulta = consulta.slice(0, -2);
        Database.run(`UPDATE OrigenAnimal SET ${consulta} WHERE IdOrigenAnimal = ${data.IdOrigenAnimal}`, valoresActualizados, (err) => {
            err ? console.error(err.message) : console.log('Se han actualizado los datos del origen animal');
        });
    }
}

module.exports = new OrigenAnimalControllers();
