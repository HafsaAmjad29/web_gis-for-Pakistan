// 1. Initialize Map centered on Pakistan
var map = L.map('map').setView([30.3753, 69.3451], 6);

// 2. Define Basemaps
var osm = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

var satellite = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
    attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS'
});

// Layer Groups for Overlays
var citiesLayerGroup = L.layerGroup().addTo(map);
var weatherLayerGroup = L.layerGroup().addTo(map);

// 3. Process First GIS Layer: Cities (Using loaded JS variable citiesData)
var citiesLayer = L.geoJSON(citiesData, {
    pointToLayer: function(feature, latlng) {
        return L.circleMarker(latlng, {
            radius: 7,
            fillColor: "#e74c3c",
            color: "#ffffff",
            weight: 1.5,
            opacity: 1,
            fillOpacity: 0.85
        });
    },
    onEachFeature: function(feature, layer) {
        var props = feature.properties;
        layer.bindPopup(
            "<div class='popup-title'>City Details</div>" +
            "<b>Name:</b> " + props.name + "<br>" +
            "<b>Province:</b> " + props.province + "<br>" +
            "<b>Type:</b> " + props.type
        );
    }
}).addTo(citiesLayerGroup);

// 4. Process Second GIS Layer: Weather Stations (Using loaded JS variable weatherData)
var weatherLayer = L.geoJSON(weatherData, {
    pointToLayer: function(feature, latlng) {
        return L.circleMarker(latlng, {
            radius: 7,
            fillColor: "#2980b9",
            color: "#ffffff",
            weight: 1.5,
            opacity: 1,
            fillOpacity: 0.85
        });
    },
    onEachFeature: function(feature, layer) {
        var props = feature.properties;
        layer.bindPopup(
            "<div class='popup-title'>Weather Station</div>" +
            "<b>Station Name:</b> " + props.station + "<br>" +
            "<b>Temperature:</b> " + props.temperature + " °C<br>" +
            "<b>Rainfall:</b> " + props.rainfall + " mm"
        );
    }
}).addTo(weatherLayerGroup);

// 5. Setup Layer Control Container
var baseMaps = {
    "OpenStreetMap": osm,
    "Satellite Imagery": satellite
};

var overlayMaps = {
    "Major Cities": citiesLayerGroup,
    "Weather Stations": weatherLayerGroup
};

L.control.layers(baseMaps, overlayMaps, { collapsed: false }).addTo(map);

// 6. Add Professional Map Scale Bar
L.control.scale({
    metric: true,
    imperial: false,
    position: 'bottomleft'
}).addTo(map);