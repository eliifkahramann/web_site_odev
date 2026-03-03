// Leaflet map + travel markers
const map = L.map('map', {scrollWheelZoom: true}).setView([39.5, -98.5], 3);

// Base layers
const osm = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

const esriSat = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
  maxZoom: 19,
  attribution: 'Tiles &copy; Esri'
});

L.control.layers(
  {"OpenStreetMap": osm, "Esri Satellite": esriSat},
  null,
  {collapsed:true}
).addTo(map);

// Places (approx coordinates)
const places = [
  {name:"Batum, Gürcistan",   lat:41.6168, lng:41.6367, note:"Karadeniz kıyısında, güzel sahil ve şehir yürüyüşleri."},
  {name:"Utah, ABD",          lat:39.3210, lng:-111.0937, note:"Work & Travel döneminde ABD'de bulunduğum eyalet."},
  {name:"Las Vegas, ABD",     lat:36.1699, lng:-115.1398, note:"Nevada – şehir ışıkları ve mimari."},
  {name:"Los Angeles, ABD",   lat:34.0522, lng:-118.2437, note:"California – sahil, şehir ve film kültürü."}
];

const fg = L.featureGroup().addTo(map);

places.forEach(p=>{
  const m = L.marker([p.lat, p.lng]).addTo(fg);
  m.bindPopup(`<b>${p.name}</b><br/>${p.note}`);
});

// Fit bounds
map.fitBounds(fg.getBounds().pad(0.35));