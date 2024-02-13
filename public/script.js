

async function getAutos(){
    try {
        const response = await fetch("/autos");
        const data = await response.json();
        return data;
    } catch (error) {
        console.log ("Fehler beim Abrufen der Autos ",error);
        throw error;
        
    }
}

window.addEventListener("load",async function(){
    const autos = await getAutos();
    const output = document.getElementById("output");
    console.log("EventLoad",autos);
                                    // fad errow function
    output.innerHTML= autos.map((auto,index)=>{return `<div id="${index+1}">Marke:${auto.Marke}, Leistung:${auto.Leistung}</div>`}).join('')
//Todo Aktuell kann nur einmal die ID gelöscht werden. Primery ID in DB erweitern um darauf zugreifen zukönnen.
    output.addEventListener("click",async function(event){
        console.log(event.target.id);
        try {
            const response = await fetch ("/autos/"+event.target.id,{
                method: "delete"
            })

            const data = await response.text();
            console.log(data);
        } catch (error) {
            console.log(error);
            
        }
        location.reload();

    })

    const form = document.getElementById("autoForm");

    form.addEventListener("submit",async function(event){        
        event.preventDefault();
        const Marke = document.getElementById("Marke_FE").value;
        const Leistung = document.getElementById("Leistung_FE").value;
        console.log("script",Marke,Leistung);
        try {
            const response = await fetch ("/autos",{
                method: "post",
                headers:{'Content-Type':'application/json',

            },body:JSON.stringify({"Marke_FE":Marke,"Leistung_FE":Leistung})
            

            })
            console.log("Stringy",JSON.stringify({"Marke_FE":Marke,"Leistung_FE":Leistung}));

            const data = await response.json();
            console.log(data);
        } catch (error) {
            console.log(error);
            
        }
        location.reload();
    })


})
