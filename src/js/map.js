// отображение карты
ymaps.ready(init);

function init() {
  const myMap = new ymaps.Map(
    "map",
    {
      center: [56.7455, 37.16039],
      zoom: 13,
    },
    {
      searchControlProvider: "yandex#search",
    }
  );
  const myGeoObject = new ymaps.GeoObject(
    {
      geometry: {
        type: "Point",
        coordinates: [56.75319, 37.16734],
      },
      properties: {
        iconContent: "WebBee",
        hintContent:
          "Современный ИТ-интегратор, эксперт в разработке сложных высоконагруженных информационных систем «под ключ»",
      },
    },
    {
      preset: "islands#blackStretchyIcon",
    }
  );

  myMap.geoObjects.add(myGeoObject);
}

// async function initMap() {
//   await ymaps3.ready;

//   const {YMap, YMapDefaultSchemeLayer} = ymaps3;

//   const map = new YMap(
//       document.getElementById('map'),
//       {
//           location: {
//               center: [37.588144, 55.733842],
//               zoom: 10
//           }
//       }
//   );

//   map.addChild(new YMapDefaultSchemeLayer());
// }

// initMap();

// function initMap() {
//   map = DG.map("map", {
//     center: [56.7455, 37.16039],
//     zoom: 13,
//   });

//   DG.marker([56.75319, 37.16734]).addTo(map);

//   document.getElementById("map").style.display = "block";
//   document.getElementById("preloader").style.display = "none";
// }

// DG.then(function () {
//   initMap();
// });
