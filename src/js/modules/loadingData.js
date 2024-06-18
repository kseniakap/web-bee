// const loadingData = (filename) => {
//   let xhr = new XMLHttpRequest();
//   xhr.onreadystatechange = function () {
//     if (this.readyState === 4 && this.status === 200) {
//       document.getElementById("content").innerHTML = this.responseText;
//       history.pushState(
//         { filename: filename },
//         "Page " + filename,
//         "?file=" + filename
//       );

//       document.querySelectorAll(".links a").forEach((link) => {
//         link.classList.remove("active");
//       });

//       document.getElementById("link" + filename[1]).classList.add("active");
//       init();
      
//     }
//   };
//   xhr.open("GET", filename, true);
//   xhr.send();
// };
// //
// window.onpopstate = function (event) {
//   if (event.state) {
//     loadData(event.state.filename);
//   }
// };



// export default loadingData;
