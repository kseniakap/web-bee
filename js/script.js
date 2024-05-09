// Подгрузка данных
function loadData(filename) {
  let xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function () {
    if (this.readyState === 4 && this.status === 200) {
      document.getElementById("content").innerHTML = this.responseText;

      // Извлечение и подключение скрипта из разметки
      let scriptTags = document
        .getElementById("content")
        .getElementsByTagName("script");
      let loadedScripts = {};

      for (let i = 0; i < scriptTags.length; i++) {
        let src = scriptTags[i].src;

        if (src && !loadedScripts[src]) {
          let script = document.createElement("script");
          script.src = src;
          loadedScripts[src] = true;
          document.body.appendChild(script);
        } else if (!src) {
          let scriptCode = scriptTags[i].innerHTML;
          let script = document.createElement("script");
          script.innerHTML = scriptCode;
          document.body.appendChild(script);
        }
      }

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

      document.getElementById("timer").innerText =
        (hours < 10 ? "0" : "") +
        hours +
        ":" +
        (minutes < 10 ? "0" : "") +
        minutes +
        ":" +
        (seconds < 10 ? "0" : "") +
        seconds;
    }, 1000);
  }

  updateTimer();
});
