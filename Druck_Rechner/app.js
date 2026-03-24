var distUnit = "";
var isaTemp;
var isaDiff;
var pressAlt;
var densAlt;
var temp;
var qnh;
var fieldelev;

function getValues() {
  temp = parseInt(document.getElementById("temp").value);
  qnh = parseInt(document.getElementById("qnh").value);
  fieldelev = parseInt(document.getElementById("fe").value);
  console.log(temp, qnh, fieldelev);
}

function berechneDruckhoehe() {
  //Druckhöhe = Platzhöhe ft/m + (1013 hPa - QNH) x 27ft(8m)/hpa
  if (distUnit == "ft") {
    pressAlt = fieldelev + (1013 - qnh) * 27;
  } else {
    pressAlt = fieldelev + (1013 - qnh) * 8;
  }
  console.log(pressAlt);
  document.getElementById("outPressAlt").innerText =
    pressAlt.toFixed(0) + " " + distUnit;
}

function berechneISA_Temp() {
  if (distUnit == "ft") {
    //Formel für Fuß: 2°C Abnahme pro 1000ft
    isaTemp = 15 - (pressAlt / 1000) * 2;
  } else {
    // // Formel für Meter: 0.65°C Abnahme pro 100m
    isaTemp = 15 - (pressAlt / 100) * 0.65;
  }

  // ISA-Differenzwert für Berechnung
  isaDiff = temp - isaTemp;
}

function berechneDichtehoehe() {
  berechneISA_Temp();
  if (distUnit == "ft") {
    //Dichtehöhe ft
    densAlt = pressAlt + isaDiff * 120;
    console.log(densAlt);
  } else {
    //Dichtehöhe m
    densAlt = pressAlt + isaDiff * 36.6;
    console.log(densAlt);
  }
  document.getElementById("outDensAlt").innerText =
    densAlt.toFixed(0) + " " + distUnit;
}

function onClickList() {
  distUnit = document.getElementById("einheit").value;
  if (distUnit == "ft") {
    document.getElementById("aktEinh").innerText = "ft";
  } else {
    document.getElementById("aktEinh").innerText = "m";
  }
}

function onClickBtn() {
  getValues();
  berechneDruckhoehe();
  berechneDichtehoehe();
}

onClickList();
document.getElementById("einheit").addEventListener("change", onClickList);
