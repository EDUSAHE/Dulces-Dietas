const { app, ipcMain, BrowserWindow } = require("electron");
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const pacientesControllers = require("./server/PacientesControllers");
const citaControllers = require("./server/CitaControllers");

let appWin;
// const store = new Store();

//If the record does not exist, it is created with a default value of 0.
// if (!store.get("clicks")) {
//     store.set("clicks", 0);
// }

//This function creates the window and its properties.
createWindow = () => {
    appWin = new BrowserWindow({
        width: 800,
        height: 600,
        title: "DulcesDietasP",
        resizable: true,
        webPreferences: {
            preload: `${app.getAppPath()}/preload.js`
        }
    });
    
    appWin.maximize();
    appWin.loadURL(`file://${__dirname}/dist/index.html`);

    appWin.setMenu(null);

    appWin.webContents.openDevTools();

    appWin.on("closed", () => {
        appWin = null;
    });
}
const dbPath = path.join(__dirname, 'src/database/DulcesDietas.db');
const db = new sqlite3.Database(dbPath, sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
      console.error('Error in DB connection', err);
    } else {
      console.log('DB is connected');
    }
});
app.on("ready", createWindow);

app.on("window-all-closed", () => app.quit());

// Cerrar la conexión de la base de datos al salir de la aplicación
app.on('before-quit', () => {
    db.close();
});



//Crear una cita
const citaData = {
    IdPaciente: 1,
    Estatus: 'Pendiente2',
    Fecha: '2023-06-15',
    Hora: '09:00 AM'
  };
  
  citaControllers.createCita(db, citaData, (err) => {
    if (err) {
      console.error(err.message);
    } else {
      console.log('Cita creada exitosamente');
    }
  });

  //Listar Citas 
  citaControllers.listCitas(db, (err, citas) => {
    if (err) {
      console.error(err.message);
    } else {
      console.log('Lista de todas las citas:');
      console.log(citas);
    }
  });

ipcMain.on("DataBase", (event, message) => {
    if(message==="ListPacientes")
        pacientesControllers.listPacientes(db,(err,res) =>{
            err ? console.log("Error al obtener datos") : event.sender.send("resPacientes", res);
        })
});