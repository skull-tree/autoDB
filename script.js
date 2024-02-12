const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./Autos.sqlite');
let n 
db.serialize(() => {
    db.run("CREATE TABLE IF NOT EXISTS Autos (Marke Text  ,Leistung INT)");



    const stmt = db.prepare("INSERT INTO Autos VALUES (?,?)");
    for (let i = 0; i < 10; i++) {
        stmt.run("Auto " + i,i);
        n = i

    }
    stmt.finalize();

    db.each("SELECT rowid AS id, Marke FROM Autos", (err, row) => {
        console.log(row.id + ": " + row.Marke);
    });

    db.run("UPDATE Autos SET Leistung = 57 WHERE rowid = 3");
    db.run("DELETE FROM Autos WHERE rowid = "+n);

});



db.close();