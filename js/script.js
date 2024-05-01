// подгрузка данных
function loadData(filename) {
  let xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function() {
  if (this.readyState === 4 && this.status === 200) {
      document.getElementById("content").innerHTML = this.responseText;
      history.pushState({filename: filename}, "Page " + filename, "?file=" + filename);
      
      document.querySelectorAll(".links a").forEach(link => {
          link.classList.remove("active");
      });
      
      document.getElementById("link" + filename[1]).classList.add("active");
    }
  };
  xhr.open("GET", filename, true);
  xhr.send();
}

window.onpopstate = function(event) {
    if (event.state) {
    loadData(event.state.filename);
    }
};

loadData('01.html');



function initMap() {
    map = DG.map('map', {
        center: [56.74550, 37.16039],
        zoom: 13
    });

    DG.marker([56.75319, 37.16734]).addTo(map);

    document.getElementById("map").style.display = "block";
    document.getElementById("preloader").style.display = "none";
}

DG.then(function () {
  initMap();
});