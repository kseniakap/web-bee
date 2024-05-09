// отображение карты
function initMap() {
  map = DG.map("map", {
    center: [56.7455, 37.16039],
    zoom: 13,
  });

  DG.marker([56.75319, 37.16734]).addTo(map);

  document.getElementById("map").style.display = "block";
  document.getElementById("preloader").style.display = "none";
}

DG.then(function () {
  initMap();
});
