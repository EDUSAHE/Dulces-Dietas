const sqlite3 = require('sqlite3').verbose();

class PacientesControllers {
    listPacientes(Database,callback){
        Database.all('SELECT * FROM Pacientes', (err, Pacientes) => {
                err ? callback(err, null) : callback(null,Pacientes)
          });
    }
    listOnePaciente(Database,IdPaciente,callback){
        Database.get(`SELECT * FROM Pacientes WHERE IdPaciente = ${IdPaciente}`, (err, Paciente) => {
            err ? callback(err, null) : callback(null,Paciente)
        });
    }
    createPaciente(Database,data){
        const columns = Object.keys(data).join(', ');
        const values = Object.values(data).map(value => `'${value}'`).join(', ');
        Database.run(`INSERT INTO Pacientes (${columns}) VALUES (${values})`, (err) => {
            err ? console.error(err.message) : console.log('Paciente insertado correctamente');
        });
    }
    deletePaciente(Database,IdPaciente){
        Database.run(`DELETE FROM Pacientes WHERE IdPaciente = ${IdPaciente}`, (err) => {
            err ? console.error(err.message) : console.log('Paciente eliminado correctamente');
        });
    }
    updatePaciente(Database,data){
        let consulta = ''
        let valoresActualizados = [];
        for (const key in data) {
            if (data.hasOwnProperty(key)) {
                consulta += `${key} = ?, `;
                valoresActualizados.push(data[key]);
            }
        }
        consulta = consulta.slice(0, -2);
        Database.run(`UPDATE Pacientes SET ${consulta} WHERE IdPaciente = ${data.IdPaciente}`,valoresActualizados,(err)=>{
            err ? console.error(err.message) : console.log(`Se han actualizado los datos del Paciente`)
        })
    }
}

module.exports = new PacientesControllers()