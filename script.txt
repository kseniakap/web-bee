//все скрипты до разделения на разные файлы

// подгрузка данных
function loadData(filename) {
  let xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function () {
    if (this.readyState === 4 && this.status === 200) {
      document.getElementById("content").innerHTML = this.responseText;
      history.pushState(
        { filename: filename },
        "Page " + filename,
        "?file=" + filename
      );

      document.querySelectorAll(".links a").forEach((link) => {
        link.classList.remove("active");
      });

      document.getElementById("link" + filename[1]).classList.add("active");
      // Вызов функции init после загрузки данных
      init();
    }
  };
  xhr.open("GET", filename, true);
  xhr.send();
}

window.onpopstate = function (event) {
  if (event.state) {
    loadData(event.state.filename);
  }
};

loadData("01.html");

window.addEventListener("beforeunload", function () {
  localStorage.removeItem("startTime");
});

document.addEventListener("DOMContentLoaded", function () {
  // время нахождения на сайте
  function updateTimer() {
    let startTime = localStorage.getItem("startTime");
    if (!startTime) {
      startTime = new Date().getTime();
      localStorage.setItem("startTime", startTime);
    }

    setInterval(function () {
      let currentTime = new Date().getTime(),
        elapsedTime = currentTime - startTime,
        hours = Math.floor((elapsedTime / (1000 * 60 * 60)) % 24),
        minutes = Math.floor((elapsedTime / 1000 / 60) % 60),
        seconds = Math.floor((elapsedTime / 1000) % 60);

      if (document.getElementById("timer")) {
        document.getElementById("timer").innerText =
          (hours < 10 ? "0" : "") +
          hours +
          ":" +
          (minutes < 10 ? "0" : "") +
          minutes +
          ":" +
          (seconds < 10 ? "0" : "") +
          seconds;
      }
    }, 1000);
  }

  updateTimer();
});

// отображение карты
const mapElement = document.getElementById("map");
if (mapElement) {
  ymaps.ready(init);
}

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
