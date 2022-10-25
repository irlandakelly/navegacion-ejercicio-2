var map = L.map('map').setView([51.505, -0.09], 13);

var capaBase = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap'
}).addTo(map);

var marker = L.marker([24.80011621443616, -107.34849863813737]).addTo(map);

var circle = L.circle([24.80666469647626, -107.3953685997845], {
    color: 'red',
    fillColor: '#f03',
    fillOpacity: 0.5,
    radius: 500
}).addTo(map);

var polygon = L.polygon([
    [24.81329120891455, -107.43383549288852],
    [24.814016111596796, -107.43215810179703],
    [24.808913011763384, -107.42946888056568],
    [24.80864956392223, -107.43162348769562]
]).addTo(map);

marker.bindPopup("<b>Hola profe!</b><br>Aquí tiene su casa.").openPopup();
circle.bindPopup("Primer cuadro de Culiacán.");
polygon.bindPopup("Aquí está la poderosísima <b>UAdeO<b>.");

//IMPORTANDO LOS PUNTOS EN EL MAPA

var escue = new L.icon ({
    iconUrl: "school.png",
    iconSize: [20, 20],
});

function InsEduCuli (feature, layer) {
    layer.bindPopup("<h4>"+ feature.properties.nom_estab+"</h4>");
    layer.setIcon(escue);
};

var escuela = L.geoJson(intEdu, {
    onEachFeature: InsEduCuli
}).addTo(map);

function getColor(d) {
    return d == 'Sinaloa' ? '#e5e5e5':'#e5e5e5'; 
}

function estilo(feature) {
    return {
        fillColor: getColor(feature.properties.NOM_ENT),
        weigth: 1,
        opacity: 1,
        color: 'black',
        dashArray: 0,
        fillOpacity: 0.5
    };
}

function popup(feature, layer) {
    if (feature.properties && feature.properties.NOM_ENT) {
        layer.bindPopup(feature.properties.NOM_ENT);
    }
}

var geojson = L.geoJson(estado, {
    style: estilo,
    onEachFeature: popup
}).addTo(map);
var mapaBase = {
    "Mapa Base OSM":capaBase
};

var capasAdicionales = {
    "Escuelas":escuela,
    "Sinaloa":geojson
};

L.control.layers(mapaBase, capasAdicionales).addTo(map);

// Esri

const apiKey = "AAPK09c49d70c2e447c8b154b0ec20a4b596tBZqsSQ-Io_HJRNcfj5DaRGK2o5a9ziYlu-qflkX1UoEEdwE5DGwPpQWsrjv3ouD";
const basemapEnum = "ArcGIS:Streets";

L.esri.Vector.vectorBasemapLayer(basemapEnum, {
  apiKey: apiKey
}).addTo(map);