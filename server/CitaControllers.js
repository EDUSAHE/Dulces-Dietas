const sqlite3 = require('sqlite3').verbose();

class CitaControllers{

    //Lista todas las Citas
    listCitas(Database,callback){
        Database.all('SELECT * FROM Cita', (err, Cita) => {
                err ? callback(err, null) : callback(null,Cita)
          });
    }

    //Lista solo una Cita vasandoce en el IdCita
    listOneCita(Database,IdCita,callback){
        Database.get(`SELECT * FROM Cita WHERE IdCita = ${IdCita}`, (err, Cita) => {
            err ? callback(err, null) : callback(null,Cita)
        });
    }

    //Crea una Cita 
    createCita(Database,data){
        const columns = Object.keys(data).join(', ');
        const values = Object.values(data).map(value => `'${value}'`).join(', ');
        Database.run(`INSERT INTO Cita (${columns}) VALUES (${values})`, (err) => {
            err ? console.error(err.message) : console.log('Cita insertada correctamente');
        });
    }

    //Eliminar Cita apartir del idCita
    deleteCita(Database,IdCita){
        Database.run(`DELETE FROM Cita WHERE IdCita = ${IdCita}`, (err) => {
            err ? console.error(err.message) : console.log('Cita eliminada correctamente');
        });
    }

    updateCita(Database,data){
        let consulta = ''
        let valoresActualizados = [];
        for (const key in data) {
            if (data.hasOwnProperty(key)) {
                consulta += `${key} = ?, `;
                valoresActualizados.push(data[key]);
            }
        }
        consulta = consulta.slice(0, -2);
        Database.run(`UPDATE Cita SET ${consulta} WHERE IdCita = ${data.IdCita}`,valoresActualizados,(err)=>{
            err ? console.error(err.message) : console.log(`Se han actualizado los datos de la Cita`)
        })
    }
}


module.exports = new CitaControllers