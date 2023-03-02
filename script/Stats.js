import {eventHighestAssistance, minAssistance, upcomigEventStats, pastEventStats, masCapacidad} from "./Functions.js"

let maxPercent = document.getElementById("table1") 
let minPercent = document.getElementById("table2")
let capaciity = document.getElementById("table3")
let conteinerUpcoming = document.getElementById("tableUpComing")
let conteinerPast = document.getElementById("tablePastEvent")
let dataStats;
let dataStatsGeneral;

fetch("https://amazing-events.onrender.com/api/events")
    .then((res) => res.json())
    .then((data) =>{
        dataStatsGeneral = data
        dataStats = data.events
        eventHighestAssistance(dataStats, maxPercent)
        minAssistance(dataStats, minPercent)
        masCapacidad(dataStats, capaciity)
        upcomigEventStats(dataStats, conteinerUpcoming, dataStatsGeneral)
        pastEventStats(dataStats, conteinerPast, dataStatsGeneral)
    })
