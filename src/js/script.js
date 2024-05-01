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

// время нахождения на сайте
function updateTimer() {
  let startTime = localStorage.getItem('startTime');
  if (!startTime) {
      startTime = new Date().getTime(); 
      localStorage.setItem('startTime', startTime);
  }

  setInterval(function() {
      let currentTime = new Date().getTime();
      let elapsedTime = currentTime - startTime;
      let hours = Math.floor((elapsedTime / (1000 * 60 * 60)) % 24);
      let minutes = Math.floor((elapsedTime / 1000 / 60) % 60);
      let seconds = Math.floor((elapsedTime / 1000) % 60);
      document.getElementById('timer').innerText = 
          (hours < 10 ? "0" : "") + hours + ":" + 
          (minutes < 10 ? "0" : "") + minutes + ":" + 
          (seconds < 10 ? "0" : "") + seconds;
  }, 1000);
}

updateTimer();

window.addEventListener('beforeunload', function() {
  localStorage.removeItem('startTime');
});
