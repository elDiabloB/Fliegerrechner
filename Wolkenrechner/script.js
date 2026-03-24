

var unit;
var temp;
var taup;
var elev;
var cloudHight;
var fielDiff;

function getValues(){
    temp = parseInt(document.getElementById("temp").value);
    taup = parseInt(document.getElementById("taup").value);
    elev = parseInt(document.getElementById("elev").value);
}

function onClickBtn(){
    getValues();
    berechneHoehe();
    berchneDifferenz();
}

function onClickLst(){
    unit = document.getElementById("einheit").value;
    if(unit == "ft"){
        document.getElementById("aktEinh").innerText = "ft";
    }else{document.getElementById("aktEinh").innerText = "m";}
}

function berechneHoehe(){
    var spread = temp - taup;
    console.log(spread);
    if(unit == "ft"){
        cloudHight = (spread * 400) + elev;
    }else{cloudHight = (spread * 122) + elev}

    document.getElementById("cloud").innerText = cloudHight+" "+unit
}

function berchneDifferenz(){
    fielDiff = cloudHight - elev;
    document.getElementById("field").innerText = fielDiff +" " + unit;

    const w = document.getElementById("warning");

    const limitOK      = unit == "ft" ? 3000 : 900;
    const limitCaution = unit == "ft" ? 1500 : 450;

    if (fielDiff >= limitOK) {
    w.className = "ok";
    w.textContent = "✓ Wolkenuntergrenze ausreichend";
    } else if (fielDiff >= limitCaution) {
    w.className = "caution";
    w.textContent = "△ Wolkenuntergrenze eingeschränkt";
    } else {
    w.className = "limit";
    w.textContent = "⚠ Wolkenuntergrenze kritisch!";
    }
}



onClickLst();

document.getElementById("einheit").addEventListener("change",onClickLst)