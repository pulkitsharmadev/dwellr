const mapElement = document.getElementById('map');
const listing = {
    title: mapElement.dataset.title,
    price: mapElement.dataset.price,
    location: mapElement.dataset.location
};
var map = L.map(mapElement).setView([51.505, -0.09], 13);
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);



function addProperty(location, price, title) {
    fetch(`https://nominatim.openstreetmap.org/search?format=jsonv2&limit=1&q=${location}`)
        .then((res) => res.json())
        .then((data) => {
            if (!data.length) {
                console.log('Location not found:', location);
                return;
            }
            const { lat, lon } = data[0];
            map.setView([lat, lon], 13);
            L.marker([lat, lon])
                .addTo(map)
                .bindPopup(`<b>${title}</b><br>${price}`)
                .openPopup();
        })
        .catch((error) => console.error('Unable to load location:', error));
}
if (mapElement && listing.location) {
    addProperty(listing.location, listing.price, listing.title);
}
