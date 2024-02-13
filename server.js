const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./Autos.sqlite');
const path = require("path"); 
const express = require("express");
const app = express();
app.use(express.json());

app.use(express.static(path.join(__dirname, 'public')));
app.get('/', (req, res) => { res.sendFile(path.join(__dirname, 'public', 'index.html')); });

db.serialize(() => {
    db.run("CREATE TABLE IF NOT EXISTS Autos (Marke Text  ,Leistung INT)");
    app.post("/autos", (req, res) => {
        const Marke_js = req.body.Marke_FE;
        const Leistung_js = req.body.Leistung_FE;
        console.log("post:",Marke_js,Leistung_js);
        const stmt = db.run("INSERT INTO Autos (Marke,Leistung) VALUES (?,?)", [Marke_js, Leistung_js],(error)=>{
            if (error) {
                res.status(500).send(error.message);
            } 
            else {
                res.status(201).send(JSON.stringify({"Marke":Marke_js,"Leistung":Leistung_js}));
            }
        });
        
    })

    app.get("/autos", (req, res) => {
        auto_js = db.all("SELECT * FROM Autos ", (error, sucess) => {
            if (error) {
                res.status(500).send(error.message);
            } else if (!sucess) {
                res.status(404).send("Kein Einträge gefunden");
            } else {
                res.status(200).json(sucess);
            }
        });
    })

    //randome feld in express :
    app.get("/autos/:id_FE", (req, res) => {
        const id_js = req.params.id_FE;
        auto_js = db.get("SELECT * FROM Autos WHERE rowid =?", [id_js], (error, sucess) => {
            if (error) {
                res.status(500).send(error.message);
            } else if (!sucess) {
                res.status(404).send("Kein Eintrag gefunden");
            } else {
                res.status(200).json(sucess);
            }
        });
    })

    app.put("/autos/:id_FE", (req, res) => {
        const id_js = req.params.id_FE;
        const Marke_js = req.body.Marke_FE
        const Leistung_js = req.body.Leistung_FE
        auto_js = db.run("UPDATE Autos Marke = ?,Leistung = ? WHERE rowid =?", [Marke_js, Leistung_js, id_js], (error, sucess) => {
            if (error) {
                res.status(500).send(error.message);
                //}else if (!sucess){ res.status(404).send("Kein Eintrag gefunden");
            } else {
                res.status(200).send("Eintrag aktualiesiert");
            }
        })

    })
    app.delete("/autos/:id_FE", (req, res) => {
        const id_js = req.params.id_FE;
        const stmt = db.run("DELETE FROM Autos WHERE rowid = ?", [id_js], (error) => {
            if (error) {
                res.status(500).send(error.message);
            }
            else {
                res.status(200).send("Eintrag gelöscht");
            }

        })
    })
})

const Port = process.env.PORT || 5500;
app.listen(Port,()=>{console.log(`${new Date().toLocaleString()}::Server_laeuft`)})