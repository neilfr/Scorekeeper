//scoretracker.js
var socket = io();
socket.on("myEvent", function(msg) {
  console.log("and the object is:");
  console.log(msg);
  var x = document.getElementById("message");
  x.innerHTML = msg;
});
